"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  CreditCard,
  FileText,
  TrendingUp,
  Download,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface FinancialManagementProps {
  language: "ar" | "en"
  currentUser: any
}

export default function FinancialManagement({ language, currentUser }: FinancialManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const translations = {
    ar: {
      financialManagement: "الإدارة المالية",
      overview: "نظرة عامة",
      invoices: "الفواتير",
      payments: "المدفوعات",
      insurance: "التأمين",
      reports: "التقارير",
      totalRevenue: "إجمالي الإيرادات",
      monthlyRevenue: "الإيرادات الشهرية",
      pendingPayments: "المدفوعات المعلقة",
      paidInvoices: "الفواتير المدفوعة",
      createInvoice: "إنشاء فاتورة",
      patientName: "اسم المريض",
      invoiceNumber: "رقم الفاتورة",
      amount: "المبلغ",
      status: "الحالة",
      date: "التاريخ",
      paid: "مدفوع",
      pending: "معلق",
      overdue: "متأخر",
      search: "بحث",
      exportReport: "تصدير التقرير",
      paymentMethod: "طريقة الدفع",
      cash: "نقدي",
      card: "بطاقة",
      serviceDescription: "وصف الخدمة",
      consultation: "استشارة",
      treatment: "علاج",
      labTest: "فحص مختبر",
      generateInvoice: "إنشاء الفاتورة",
      currency: "العملة",
      shekel: "شيكل إسرائيلي",
      dollar: "دولار أمريكي",
      euro: "يورو",
      yemeniRial: "ريال يمني", // إضافة الريال اليمني
      jordanianDinar: "دينار أردني",
      egyptianPound: "جنيه مصري",
      saudiRiyal: "ريال سعودي",
      emiratiDirham: "درهم إماراتي",
      qatariRiyal: "ريال قطري",
      kuwaiteeDinar: "دينار كويتي",
      bahrainiDinar: "دينار بحريني",
      omanieRial: "ريال عماني",
      lebanesePound: "ليرة لبنانية",
      syrianPound: "ليرة سورية",
      iraqiDinar: "دينار عراقي",
      libyanDinar: "دينار ليبي",
      tunisianDinar: "دينار تونسي",
      algerianDinar: "دينار جزائري",
      moroccanDirham: "درهم مغربي",
      sudanesePound: "جنيه سوداني",
    },
    en: {
      financialManagement: "Financial Management",
      overview: "Overview",
      invoices: "Invoices",
      payments: "Payments",
      insurance: "Insurance",
      reports: "Reports",
      totalRevenue: "Total Revenue",
      monthlyRevenue: "Monthly Revenue",
      pendingPayments: "Pending Payments",
      paidInvoices: "Paid Invoices",
      createInvoice: "Create Invoice",
      patientName: "Patient Name",
      invoiceNumber: "Invoice Number",
      amount: "Amount",
      status: "Status",
      date: "Date",
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",
      search: "Search",
      exportReport: "Export Report",
      paymentMethod: "Payment Method",
      cash: "Cash",
      card: "Card",
      serviceDescription: "Service Description",
      consultation: "Consultation",
      treatment: "Treatment",
      labTest: "Lab Test",
      generateInvoice: "Generate Invoice",
      currency: "Currency",
      shekel: "Israeli Shekel",
      dollar: "US Dollar",
      euro: "Euro",
      yemeniRial: "Yemeni Rial", // إضافة الريال اليمني
      jordanianDinar: "Jordanian Dinar",
      egyptianPound: "Egyptian Pound",
      saudiRiyal: "Saudi Riyal",
      emiratiDirham: "UAE Dirham",
      qatariRiyal: "Qatari Riyal",
      kuwaiteeDinar: "Kuwaiti Dinar",
      bahrainiDinar: "Bahraini Dinar",
      omanieRial: "Omani Rial",
      lebanesePound: "Lebanese Pound",
      syrianPound: "Syrian Pound",
      iraqiDinar: "Iraqi Dinar",
      libyanDinar: "Libyan Dinar",
      tunisianDinar: "Tunisian Dinar",
      algerianDinar: "Algerian Dinar",
      moroccanDirham: "Moroccan Dirham",
      sudanesePound: "Sudanese Pound",
    },
  }

  const t = translations[language]

  const financialStats = [
    {
      title: t.totalRevenue,
      value: "125,430 ر.ي", // تحديث لاستخدام الريال اليمني
      change: "+18.2%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: t.monthlyRevenue,
      value: "45,230 ر.ي",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: t.pendingPayments,
      value: "8,750 ر.ي",
      change: "-5.1%",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: t.paidInvoices,
      value: "116,680 ر.ي",
      change: "+12.8%",
      icon: CheckCircle,
      color: "text-purple-600",
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      patient: "أحمد محمد علي",
      amount: "350 ر.ي",
      status: "paid",
      date: "2024-01-15",
      service: t.consultation,
      paymentMethod: "card",
    },
    {
      id: "INV-002",
      patient: "فاطمة حسن",
      amount: "500 ر.ي",
      status: "pending",
      date: "2024-01-14",
      service: t.treatment,
      paymentMethod: "insurance",
    },
    {
      id: "INV-003",
      patient: "عمر يوسف",
      amount: "200 ر.ي",
      status: "paid",
      date: "2024-01-13",
      service: t.labTest,
      paymentMethod: "cash",
    },
    {
      id: "INV-004",
      patient: "نور الدين",
      amount: "750 ر.ي",
      status: "overdue",
      date: "2024-01-10",
      service: t.treatment,
      paymentMethod: "card",
    },
  ]

  const recentPayments = [
    {
      patient: "أحمد محمد علي",
      amount: "350 ر.ي",
      method: "بطاقة ائتمان",
      time: "10:30 ص",
      status: "completed",
    },
    {
      patient: "سارة أحمد",
      amount: "200 ر.ي",
      method: "نقدي",
      time: "09:45 ص",
      status: "completed",
    },
    {
      patient: "محمد خالد",
      amount: "450 ر.ي",
      method: "تأمين",
      time: "09:15 ص",
      status: "processing",
    },
  ]

  const currencies = [
    { code: "YER", name: t.yemeniRial, symbol: "ر.ي" },
    { code: "USD", name: t.dollar, symbol: "$" },
    { code: "EUR", name: t.euro, symbol: "€" },
    { code: "ILS", name: t.shekel, symbol: "₪" },
    { code: "JOD", name: t.jordanianDinar, symbol: "د.أ" },
    { code: "EGP", name: t.egyptianPound, symbol: "ج.م" },
    { code: "SAR", name: t.saudiRiyal, symbol: "ر.س" },
    { code: "AED", name: t.emiratiDirham, symbol: "د.إ" },
    { code: "QAR", name: t.qatariRiyal, symbol: "ر.ق" },
    { code: "KWD", name: t.kuwaiteeDinar, symbol: "د.ك" },
    { code: "BHD", name: t.bahrainiDinar, symbol: "د.ب" },
    { code: "OMR", name: t.omanieRial, symbol: "ر.ع" },
    { code: "LBP", name: t.lebanesePound, symbol: "ل.ل" },
    { code: "SYP", name: t.syrianPound, symbol: "ل.س" },
    { code: "IQD", name: t.iraqiDinar, symbol: "د.ع" },
    { code: "LYD", name: t.libyanDinar, symbol: "د.ل" },
    { code: "TND", name: t.tunisianDinar, symbol: "د.ت" },
    { code: "DZD", name: t.algerianDinar, symbol: "د.ج" },
    { code: "MAD", name: t.moroccanDirham, symbol: "د.م" },
    { code: "SDG", name: t.sudanesePound, symbol: "ج.س" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return CheckCircle
      case "pending":
      case "processing":
        return Clock
      case "overdue":
        return AlertCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.financialManagement}</h2>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t.exportReport}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t.createInvoice}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="invoices">{t.invoices}</TabsTrigger>
          <TabsTrigger value="payments">{t.payments}</TabsTrigger>
          <TabsTrigger value="create">{t.createInvoice}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>{" "}
                    من الشهر الماضي
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>المدفوعات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.patient}</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="text-right rtl:text-left">
                        <p className="font-semibold">{payment.amount}</p>
                        <p className="text-sm text-muted-foreground">{payment.time}</p>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status === "completed" ? "مكتمل" : "قيد المعالجة"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          {/* Search */}
          <div className="flex space-x-4 rtl:space-x-reverse">
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
          </div>

          {/* Invoices List */}
          <Card>
            <CardHeader>
              <CardTitle>{t.invoices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => {
                  const StatusIcon = getStatusIcon(invoice.status)
                  return (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <StatusIcon className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{invoice.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.id} • {invoice.service}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="text-right rtl:text-left">
                          <p className="font-semibold">{invoice.amount}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status === "paid" ? t.paid : invoice.status === "pending" ? t.pending : t.overdue}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل المدفوعات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">سجل المدفوعات التفصيلي</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.createInvoice}</CardTitle>
              <CardDescription>إنشاء فاتورة جديدة للمريض</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient">{t.patientName}</Label>
                    <Input id="patient" placeholder="اختر أو أدخل اسم المريض" />
                  </div>

                  <div>
                    <Label htmlFor="service">{t.serviceDescription}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">{t.consultation}</SelectItem>
                        <SelectItem value="treatment">{t.treatment}</SelectItem>
                        <SelectItem value="lab">{t.labTest}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">{t.amount}</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>

                  <div>
                    <Label htmlFor="currency">{t.currency}</Label>
                    <Select defaultValue="YER">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">{t.date}</Label>
                    <Input id="date" type="date" />
                  </div>

                  <div>
                    <Label htmlFor="payment-method">{t.paymentMethod}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">{t.cash}</SelectItem>
                        <SelectItem value="card">{t.card}</SelectItem>
                        <SelectItem value="insurance">تأمين</SelectItem>
                        <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                        <SelectItem value="mobile_payment">دفع محمول</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">ملاحظات</Label>
                    <Input id="notes" placeholder="ملاحظات إضافية..." />
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t.generateInvoice}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
