import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import { validateEnv } from "./env"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

let cachedAuth: JWT | null = null
let cachedDoc: GoogleSpreadsheet | null = null

export async function getAuthToken() {
  if (cachedAuth) return cachedAuth

  validateEnv()

  const jwt = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  })

  await jwt.authorize()
  cachedAuth = jwt
  return jwt
}

export async function getSheet(sheetName: string) {
  if (!cachedDoc) {
    const authToken = await getAuthToken()
    cachedDoc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, authToken)
    await cachedDoc.loadInfo()
  }

  const sheet = cachedDoc.sheetsByTitle[sheetName]
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`)
  }

  return sheet
}

export async function getAllRows(sheetName: string) {
  const sheet = await getSheet(sheetName)
  const rows = await sheet.getRows()
  return rows.map((row) => row.toObject())
}

export async function getRowById(sheetName: string, idField: string, id: string) {
  const sheet = await getSheet(sheetName)
  const rows = await sheet.getRows()
  const row = rows.find((row) => row.get(idField) === id)
  return row ? row.toObject() : null
}

export async function addRow(sheetName: string, data: Record<string, any>) {
  const sheet = await getSheet(sheetName)
  await sheet.addRow(data)
}

export async function updateRow(sheetName: string, idField: string, id: string, data: Record<string, any>) {
  const sheet = await getSheet(sheetName)
  const rows = await sheet.getRows()
  const row = rows.find((row) => row.get(idField) === id)

  if (!row) {
    throw new Error(`Row with ${idField}=${id} not found`)
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key !== idField) {
      row.set(key, value)
    }
  })

  await row.save()
}

