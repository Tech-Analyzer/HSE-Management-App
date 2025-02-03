export type PermitType = "Cold Work Permit" | "Hot Work Permit" | "Confined Work Permit"

export type PermitStatus = "Open" | "Closed"

export interface PTWRecord {
  permitId: string
  dateIssued: string
  typeOfPermit: PermitType
  workLocation: string
  aa: string // Area Authority
  ac: string // Area Custodian
  pa: string // Performing Authority
  ph: string // Permit Holder
  permitDescription: string
  permitValidityDate: "7 Days" | "14 Days"
  permitStatus: PermitStatus
  permitCancelDate?: string
  permitClosureDate?: string
  remarks?: string
}

