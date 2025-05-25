import type { ObjectId } from "mongodb"

export interface Invoice {
  _id?: ObjectId
  invoiceId: string // رقم الفاتورة الفريد
  patientId: ObjectId
  patientName: string
  patientPhone: string
  appointmentId?: ObjectId
  items: InvoiceItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  currency: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  paymentMethod?: "cash" | "card" | "bank_transfer" | "insurance" | "mobile_payment"
  paymentDate?: Date
  dueDate: Date
  notes?: string
  terms?: string
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
  paidBy?: ObjectId
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
  type: "consultation" | "procedure" | "medication" | "lab_test" | "other"
  reference?: ObjectId // مرجع للموعد أو الفحص
}

export interface CreateInvoiceInput {
  patientId: ObjectId
  appointmentId?: ObjectId
  items: Omit<InvoiceItem, "total">[]
  tax?: number
  discount?: number
  currency: string
  dueDate: Date
  notes?: string
  terms?: string
}
