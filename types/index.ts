export interface HSEPassport {
  "Passport ID": string
  Name: string
  Company: string
  Position: string
  "SLTP DOJ": string
  "Contact Number": string
  "Photo URL": string
  Type: "individual" | "equipment"
  "Compliance Status": "Fully Compliant" | "Partially Compliant" | "Non-Compliant"
  Points: string
  Tier: string
  Nationality?: string
  "Civil ID"?: string
  "Civil ID Expiry Date"?: string
}

export interface TrainingRecord {
  "Record ID": string
  "Passport ID": string
  "Course Name": string
  "Completion Date": string
  "Expiry Date": string
  Status: "Valid" | "Expiring Soon" | "Expired"
}

export interface PTWRecord {
  "Permit ID": string
  "Permit Type": string
  "Permit Status": "Open" | "Closed" | "Suspended"
  "Issue Date": string
  "Expiry Date": string
  Location: string
  "Work Description": string
  "Assigned Personnel": string[]
  "Assigned Equipment": string[]
}

