import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import { NextResponse } from "next/server"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

async function getAuthToken() {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing required environment variables")
    }

    const jwt = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    })
    await jwt.authorize()
    return jwt
  } catch (error) {
    console.error("Auth Error:", error)
    throw error
  }
}

export async function GET() {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing GOOGLE_SHEET_ID environment variable",
        },
        { status: 500 },
      )
    }

    // Test authentication
    const authToken = await getAuthToken()

    // Test spreadsheet access
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, authToken)
    await doc.loadInfo()

    // Get sheet titles
    const sheetTitles = Object.keys(doc.sheetsByTitle)

    return NextResponse.json({
      status: "success",
      message: "Connection successful",
      sheets: sheetTitles,
      spreadsheetTitle: doc.title,
    })
  } catch (error: any) {
    console.error("Connection Test Error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "An error occurred while testing the connection",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

