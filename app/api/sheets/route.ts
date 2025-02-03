import { type NextRequest, NextResponse } from "next/server"
import { getAllRows, getRowById, addRow, updateRow } from "@/lib/sheets"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sheetName = searchParams.get("sheet")
    const action = searchParams.get("action")
    const query = searchParams.get("query")

    if (!sheetName) {
      return NextResponse.json({ error: "Sheet name is required" }, { status: 400 })
    }

    switch (action) {
      case "getAll":
        const rows = await getAllRows(sheetName)
        return NextResponse.json(rows)

      case "getById":
        if (!query) {
          return NextResponse.json({ error: "Query is required for getById action" }, { status: 400 })
        }
        const row = await getRowById(sheetName, "Passport ID", query)
        return NextResponse.json(row)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sheet: sheetName, action, data } = body

    if (!sheetName) {
      return NextResponse.json({ error: "Sheet name is required" }, { status: 400 })
    }

    switch (action) {
      case "addRow":
        if (!data) {
          return NextResponse.json({ error: "Data is required for addRow action" }, { status: 400 })
        }
        await addRow(sheetName, data)
        return NextResponse.json({ message: "Row added successfully" })

      case "updateRow":
        if (!data || !data.id) {
          return NextResponse.json({ error: "Data and row ID are required for updateRow action" }, { status: 400 })
        }
        await updateRow(sheetName, "Passport ID", data.id, data)
        return NextResponse.json({ message: "Row updated successfully" })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error.message || "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}

