import type { ObjectId } from "mongodb"

export interface InventoryItem {
  _id?: ObjectId
  itemId: string // رقم العنصر الفريد
  name: string
  arabicName?: string
  category: string
  type: "medication" | "equipment" | "supply" | "consumable"
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  price: number
  currency: string
  supplier: {
    name: string
    contact: string
    email?: string
    phone?: string
  }
  manufacturer?: string
  expiryDate?: Date
  batchNumber?: string
  location: string
  barcode?: string
  description?: string
  instructions?: string
  sideEffects?: string[] // للأدوية
  contraindications?: string[] // للأدوية
  status: "available" | "low_stock" | "critical" | "out_of_stock" | "expired" | "recalled"
  transactions: StockTransaction[]
  lastUpdated: Date
  createdAt: Date
  createdBy: ObjectId
}

export interface StockTransaction {
  _id?: ObjectId
  type: "in" | "out" | "adjustment" | "expired" | "damaged"
  quantity: number
  reason: string
  reference?: string // رقم الفاتورة أو المرجع
  performedBy: ObjectId
  performedByName: string
  date: Date
  notes?: string
}

export interface CreateInventoryItemInput {
  name: string
  arabicName?: string
  category: string
  type: InventoryItem["type"]
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  price: number
  currency: string
  supplier: {
    name: string
    contact: string
    email?: string
    phone?: string
  }
  manufacturer?: string
  expiryDate?: Date
  batchNumber?: string
  location: string
  barcode?: string
  description?: string
  instructions?: string
  sideEffects?: string[]
  contraindications?: string[]
}
