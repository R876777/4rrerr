"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Pill,
  Stethoscope,
  Syringe,
  Calendar,
} from "lucide-react"

interface InventoryManagementProps {
  language: "ar" | "en"
  currentUser: any
}

export default function InventoryManagement({ language, currentUser }: InventoryManagementProps) {
  const [inventory, setInventory] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const translations = {
    ar: {
      inventoryManagement: "إدارة المخزون",
      overview: "نظرة عامة",
      medicines: "الأدوية",
      equipment: "المعدات",
      supplies: "المستلزمات",
      lowStock: "مخزون منخفض",
      addItem: "إضافة عنصر",
      search: "بحث",
      category: "الفئة",
      status: "الحالة",
      all: "الكل",
      available: "متوفر",
      critical: "حرج",
      outOfStock: "نفد المخزون",
      itemName: "اسم العنصر",
      currentStock: "المخزون الحالي",
      minStock: "الحد الأدنى",
      maxStock: "الحد الأقصى",
      unit: "الوحدة",
      price: "السعر",
      supplier: "المورد",
      expiryDate: "تاريخ الانتهاء",
      location: "الموقع",
      batchNumber: "رقم الدفعة",
      totalItems: "إجمالي العناصر",
      lowStockItems: "عناصر منخفضة المخزون",
      criticalItems: "عناصر حرجة",
      expiredItems: "عناصر منتهية الصلاحية",
      reorderLevel: "مستوى إعادة الطلب",
      lastUpdated: "آخر تحديث",
      addToStock: "إضافة للمخزون",
      removeFromStock: "إزالة من المخزون",
      viewHistory: "عرض التاريخ",
      generateReport: "إنشاء تقرير",
      expiryAlert: "تنبيه انتهاء الصلاحية",
      stockAlert: "تنبيه المخزون",
      orderSuggestion: "اقتراح طلب",
      pieces: "قطعة",
      tablets: "قرص",
      bottles: "زجاجة",
      boxes: "علبة",
      medicines: "أدوية",
      medicalEquipment: "معدات طبية",
      medicalSupplies: "مستلزمات طبية",
      painkillers: "مسكنات",
      antibiotics: "مضادات حيوية",
      heartMedicine: "أدوية القلب",
      diabetesMedicine: "أدوية السكري",
    },
    en: {
      inventoryManagement: "Inventory Management",
      overview: "Overview",
      medicines: "Medicines",
      equipment: "Equipment",
      supplies: "Supplies",
      lowStock: "Low Stock",
      addItem: "Add Item",
      search: "Search",
      category: "Category",
      status: "Status",
      all: "All",
      available: "Available",
      critical: "Critical",
      outOfStock: "Out of Stock",
      itemName: "Item Name",
      currentStock: "Current Stock",
      minStock: "Min Stock",
      maxStock: "Max Stock",
      unit: "Unit",
      price: "Price",
      supplier: "Supplier",
      expiryDate: "Expiry Date",
      location: "Location",
      batchNumber: "Batch Number",
      totalItems: "Total Items",
      lowStockItems: "Low Stock Items",
      criticalItems: "Critical Items",
      expiredItems: "Expired Items",
      reorderLevel: "Reorder Level",
      lastUpdated: "Last Updated",
      addToStock: "Add to Stock",
      removeFromStock: "Remove from Stock",
      viewHistory: "View History",
      generateReport: "Generate Report",
      expiryAlert: "Expiry Alert",
      stockAlert: "Stock Alert",
      orderSuggestion: "Order Suggestion",
      pieces: "Pieces",
      tablets: "Tablets",
      bottles: "Bottles",
      boxes: "Boxes",
      medicines: "Medicines",
      medicalEquipment: "Medical Equipment",
      medicalSupplies: "Medical Supplies",
      painkillers: "Painkillers",
      antibiotics: "Antibiotics",
      heartMedicine: "Heart Medicine",
      diabetesMedicine: "Diabetes Medicine",
    },
  }

  const t = translations[language]

  useEffect(() => {
    fetchInventory()
  }, [selectedCategory, selectedStatus, searchTerm])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (selectedStatus !== "all") params.append("status", selectedStatus)
      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/inventory?${params}`)
      const data = await response.json()

      setInventory(data.inventory)
      setStats(data.stats)
    } catch (error) {
      console.error("Error fetching inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "out_of_stock":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return CheckCircle
      case "low_stock":
        return Clock
      case "critical":
        return AlertTriangle
      case "out_of_stock":
        return TrendingDown
      default:
        return Package
    }
  }

  const getCategoryIcon = (category: string) => {
    if (category.includes("دواء") || category.includes("medicine")) return Pill
    if (category.includes("معدات") || category.includes("equipment")) return Stethoscope
    return Syringe
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.inventoryManagement}</h2>
        <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2 rtl:space-x-reverse">
              <Plus className="w-4 h-4" />
              <span>{t.addItem}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t.addItem}</DialogTitle>
              <DialogDescription>إضافة عنصر جديد إلى المخزون</DialogDescription>
            </DialogHeader>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">{t.itemName}</Label>
                  <Input id="itemName" placeholder="اسم العنصر" />
                </div>
                <div>
                  <Label htmlFor="category">{t.category}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مسكنات">{t.painkillers}</SelectItem>
                      <SelectItem value="مضادات حيوية">{t.antibiotics}</SelectItem>
                      <SelectItem value="أدوية القلب">{t.heartMedicine}</SelectItem>
                      <SelectItem value="أدوية السكري">{t.diabetesMedicine}</SelectItem>
                      <SelectItem value="معدات طبية">{t.medicalEquipment}</SelectItem>
                      <SelectItem value="مستلزمات طبية">{t.medicalSupplies}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currentStock">{t.currentStock}</Label>
                  <Input id="currentStock" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="minStock">{t.minStock}</Label>
                  <Input id="minStock" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="maxStock">{t.maxStock}</Label>
                  <Input id="maxStock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">{t.unit}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الوحدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="قرص">{t.tablets}</SelectItem>
                      <SelectItem value="قطعة">{t.pieces}</SelectItem>
                      <SelectItem value="زجاجة">{t.bottles}</SelectItem>
                      <SelectItem value="علبة">{t.boxes}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">{t.price}</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier">{t.supplier}</Label>
                  <Input id="supplier" placeholder="اسم المورد" />
                </div>
                <div>
                  <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batchNumber">{t.batchNumber}</Label>
                  <Input id="batchNumber" placeholder="رقم الدفعة" />
                </div>
                <div>
                  <Label htmlFor="location">{t.location}</Label>
                  <Input id="location" placeholder="موقع التخزين" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setIsAddItemOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" onClick={() => setIsAddItemOpen(false)}>
                  إضافة العنصر
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات المخزون */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalItems}</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total || 0}</div>
            <p className="text-xs text-muted-foreground">عنصر في المخزون</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.lowStockItems}</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStock || 0}</div>
            <p className="text-xs text-muted-foreground">يحتاج إعادة طلب</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.criticalItems}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.critical || 0}</div>
            <p className="text-xs text-muted-foreground">حالة حرجة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.expiredItems}</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired || 0}</div>
            <p className="text-xs text-muted-foreground">منتهية الصلاحية</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="medicines">{t.medicines}</TabsTrigger>
          <TabsTrigger value="equipment">{t.equipment}</TabsTrigger>
          <TabsTrigger value="lowStock">{t.lowStock}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* البحث والتصفية */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  placeholder={`${t.search}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="مسكنات">{t.painkillers}</SelectItem>
                <SelectItem value="أدوية القلب">{t.heartMedicine}</SelectItem>
                <SelectItem value="معدات طبية">{t.medicalEquipment}</SelectItem>
                <SelectItem value="مستلزمات طبية">{t.medicalSupplies}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="available">{t.available}</SelectItem>
                <SelectItem value="low_stock">مخزون منخفض</SelectItem>
                <SelectItem value="critical">{t.critical}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* قائمة المخزون */}
          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-8">جاري التحميل...</div>
            ) : inventory.length === 0 ? (
              <div className="text-center py-8">لا توجد عناصر في المخزون</div>
            ) : (
              inventory.map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                const CategoryIcon = getCategoryIcon(item.category)

                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge className={getStatusColor(item.status)}>
                            <StatusIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {item.status === "available"
                              ? t.available
                              : item.status === "low_stock"
                                ? "مخزون منخفض"
                                : item.status === "critical"
                                  ? t.critical
                                  : t.outOfStock}
                          </Badge>

                          {isExpiringSoon(item.expiryDate) && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              <Calendar className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              ينتهي قريباً
                            </Badge>
                          )}

                          {isExpired(item.expiryDate) && (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              منتهي الصلاحية
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.currentStock}</p>
                          <p className="text-lg font-semibold">
                            {item.currentStock} {item.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.minStock}</p>
                          <p className="text-lg font-semibold">
                            {item.minStock} {item.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.price}</p>
                          <p className="text-lg font-semibold">{item.price} ريال</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.expiryDate}</p>
                          <p className="text-lg font-semibold">
                            {new Date(item.expiryDate).toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.supplier}</p>
                          <p className="text-sm">{item.supplier}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.location}</p>
                          <p className="text-sm">{item.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t.batchNumber}</p>
                          <p className="text-sm">{item.batchNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline">
                          {t.addToStock}
                        </Button>
                        <Button size="sm" variant="outline">
                          {t.removeFromStock}
                        </Button>
                        <Button size="sm" variant="outline">
                          {t.viewHistory}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="medicines">
          <Card>
            <CardHeader>
              <CardTitle>الأدوية</CardTitle>
              <CardDescription>إدارة مخزون الأدوية</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">قائمة الأدوية المتوفرة في المخزون</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>المعدات الطبية</CardTitle>
              <CardDescription>إدارة المعدات والأجهزة الطبية</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">قائمة المعدات الطبية المتوفرة</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lowStock">
          <Card>
            <CardHeader>
              <CardTitle>المخزون المنخفض</CardTitle>
              <CardDescription>العناصر التي تحتاج إعادة طلب</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory
                  .filter((item) => item.status === "low_stock" || item.status === "critical")
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          المخزون الحالي: {item.currentStock} {item.unit} | الحد الأدنى: {item.minStock} {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === "critical" ? "حرج" : "منخفض"}
                        </Badge>
                        <Button size="sm">طلب الآن</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
