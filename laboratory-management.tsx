"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  TestTube,
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Upload,
  Microscope,
  Activity,
} from "lucide-react"

interface LaboratoryManagementProps {
  language: "ar" | "en"
  currentUser: any
}

export default function LaboratoryManagement({ language, currentUser }: LaboratoryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddTestOpen, setIsAddTestOpen] = useState(false)

  const translations = {
    ar: {
      laboratoryManagement: "إدارة المختبر",
      testRequests: "طلبات الفحص",
      testResults: "نتائج الفحص",
      testTypes: "أنواع الفحوصات",
      equipment: "المعدات",
      addTest: "طلب فحص جديد",
      search: "بحث",
      status: "الحالة",
      all: "الكل",
      pending: "معلق",
      inProgress: "قيد التنفيذ",
      completed: "مكتمل",
      cancelled: "ملغي",
      patientName: "اسم المريض",
      testType: "نوع الفحص",
      requestDate: "تاريخ الطلب",
      expectedDate: "التاريخ المتوقع",
      priority: "الأولوية",
      high: "عالية",
      normal: "عادية",
      low: "منخفضة",
      urgent: "عاجل",
      routine: "روتيني",
      bloodTest: "فحص الدم",
      urineTest: "فحص البول",
      xray: "أشعة سينية",
      mri: "رنين مغناطيسي",
      ct: "أشعة مقطعية",
      ultrasound: "موجات فوق صوتية",
      ecg: "تخطيط القلب",
      bloodSugar: "سكر الدم",
      cholesterol: "الكوليسترول",
      kidneyFunction: "وظائف الكلى",
      liverFunction: "وظائف الكبد",
      thyroidFunction: "وظائف الغدة الدرقية",
      completeBloodCount: "تعداد الدم الكامل",
      enterResults: "إدخال النتائج",
      viewResults: "عرض النتائج",
      printReport: "طباعة التقرير",
      sendToDoctor: "إرسال للطبيب",
      testNotes: "ملاحظات الفحص",
      normalRange: "المعدل الطبيعي",
      result: "النتيجة",
      unit: "الوحدة",
      referenceRange: "المدى المرجعي",
      abnormal: "غير طبيعي",
      critical: "حرج",
      equipmentStatus: "حالة المعدات",
      maintenance: "صيانة",
      operational: "تشغيلي",
      outOfOrder: "معطل",
      lastMaintenance: "آخر صيانة",
      nextMaintenance: "الصيانة القادمة",
      technician: "الفني",
      doctor: "الطبيب المطلوب",
      sampleType: "نوع العينة",
      blood: "دم",
      urine: "بول",
      stool: "براز",
      saliva: "لعاب",
      tissue: "نسيج",
    },
    en: {
      laboratoryManagement: "Laboratory Management",
      testRequests: "Test Requests",
      testResults: "Test Results",
      testTypes: "Test Types",
      equipment: "Equipment",
      addTest: "New Test Request",
      search: "Search",
      status: "Status",
      all: "All",
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
      patientName: "Patient Name",
      testType: "Test Type",
      requestDate: "Request Date",
      expectedDate: "Expected Date",
      priority: "Priority",
      high: "High",
      normal: "Normal",
      low: "Low",
      urgent: "Urgent",
      routine: "Routine",
      bloodTest: "Blood Test",
      urineTest: "Urine Test",
      xray: "X-Ray",
      mri: "MRI",
      ct: "CT Scan",
      ultrasound: "Ultrasound",
      ecg: "ECG",
      bloodSugar: "Blood Sugar",
      cholesterol: "Cholesterol",
      kidneyFunction: "Kidney Function",
      liverFunction: "Liver Function",
      thyroidFunction: "Thyroid Function",
      completeBloodCount: "Complete Blood Count",
      enterResults: "Enter Results",
      viewResults: "View Results",
      printReport: "Print Report",
      sendToDoctor: "Send to Doctor",
      testNotes: "Test Notes",
      normalRange: "Normal Range",
      result: "Result",
      unit: "Unit",
      referenceRange: "Reference Range",
      abnormal: "Abnormal",
      critical: "Critical",
      equipmentStatus: "Equipment Status",
      maintenance: "Maintenance",
      operational: "Operational",
      outOfOrder: "Out of Order",
      lastMaintenance: "Last Maintenance",
      nextMaintenance: "Next Maintenance",
      technician: "Technician",
      doctor: "Requesting Doctor",
      sampleType: "Sample Type",
      blood: "Blood",
      urine: "Urine",
      stool: "Stool",
      saliva: "Saliva",
      tissue: "Tissue",
    },
  }

  const t = translations[language]

  const testRequests = [
    {
      id: "LAB-001",
      patientName: "أحمد محمد علي",
      testType: "تعداد الدم الكامل",
      requestDate: "2024-01-15",
      expectedDate: "2024-01-16",
      status: "pending",
      priority: "normal",
      doctor: "د. سارة أحمد",
      sampleType: "دم",
      notes: "فحص روتيني",
    },
    {
      id: "LAB-002",
      patientName: "فاطمة حسن",
      testType: "سكر الدم",
      requestDate: "2024-01-15",
      expectedDate: "2024-01-15",
      status: "inProgress",
      priority: "high",
      doctor: "د. محمد خالد",
      sampleType: "دم",
      notes: "مريض سكري - متابعة",
    },
    {
      id: "LAB-003",
      patientName: "عمر يوسف",
      testType: "وظائف الكلى",
      requestDate: "2024-01-14",
      expectedDate: "2024-01-15",
      status: "completed",
      priority: "normal",
      doctor: "د. أحمد محمود",
      sampleType: "دم",
      notes: "فحص دوري",
    },
  ]

  const testResults = [
    {
      id: "LAB-003",
      patientName: "عمر يوسف",
      testType: "وظائف الكلى",
      completedDate: "2024-01-15",
      technician: "أ. محمد علي",
      results: [
        { parameter: "الكرياتينين", value: "1.2", unit: "mg/dL", normalRange: "0.7-1.3", status: "normal" },
        { parameter: "اليوريا", value: "45", unit: "mg/dL", normalRange: "15-45", status: "normal" },
        { parameter: "حمض اليوريك", value: "7.5", unit: "mg/dL", normalRange: "3.5-7.0", status: "abnormal" },
      ],
      overallStatus: "abnormal",
      notes: "ارتفاع طفيف في حمض اليوريك - يُنصح بالمتابعة",
    },
  ]

  const equipment = [
    {
      id: "EQ-001",
      name: "جهاز تحليل الدم الآلي",
      model: "Sysmex XN-1000",
      status: "operational",
      lastMaintenance: "2024-01-01",
      nextMaintenance: "2024-04-01",
      location: "مختبر الدم",
      technician: "أ. محمد علي",
    },
    {
      id: "EQ-002",
      name: "جهاز الكيمياء الحيوية",
      model: "Cobas 6000",
      status: "maintenance",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-01-20",
      location: "مختبر الكيمياء",
      technician: "أ. فاطمة أحمد",
    },
    {
      id: "EQ-003",
      name: "جهاز الأشعة السينية",
      model: "Philips DigitalDiagnost",
      status: "operational",
      lastMaintenance: "2023-12-15",
      nextMaintenance: "2024-03-15",
      location: "قسم الأشعة",
      technician: "أ. عمر حسن",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inProgress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-green-100 text-green-800"
      case "abnormal":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "operational":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "outOfOrder":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock
      case "inProgress":
        return Activity
      case "completed":
        return CheckCircle
      case "cancelled":
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.laboratoryManagement}</h2>
        <Dialog open={isAddTestOpen} onOpenChange={setIsAddTestOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2 rtl:space-x-reverse">
              <Plus className="w-4 h-4" />
              <span>{t.addTest}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t.addTest}</DialogTitle>
              <DialogDescription>طلب فحص مختبري جديد</DialogDescription>
            </DialogHeader>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">{t.patientName}</Label>
                  <Input id="patientName" placeholder="اختر المريض" />
                </div>
                <div>
                  <Label htmlFor="doctor">{t.doctor}</Label>
                  <Input id="doctor" placeholder="الطبيب المطلوب" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testType">{t.testType}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الفحص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbc">{t.completeBloodCount}</SelectItem>
                      <SelectItem value="bloodSugar">{t.bloodSugar}</SelectItem>
                      <SelectItem value="cholesterol">{t.cholesterol}</SelectItem>
                      <SelectItem value="kidneyFunction">{t.kidneyFunction}</SelectItem>
                      <SelectItem value="liverFunction">{t.liverFunction}</SelectItem>
                      <SelectItem value="thyroidFunction">{t.thyroidFunction}</SelectItem>
                      <SelectItem value="urineTest">{t.urineTest}</SelectItem>
                      <SelectItem value="xray">{t.xray}</SelectItem>
                      <SelectItem value="ultrasound">{t.ultrasound}</SelectItem>
                      <SelectItem value="ecg">{t.ecg}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sampleType">{t.sampleType}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع العينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blood">{t.blood}</SelectItem>
                      <SelectItem value="urine">{t.urine}</SelectItem>
                      <SelectItem value="stool">{t.stool}</SelectItem>
                      <SelectItem value="saliva">{t.saliva}</SelectItem>
                      <SelectItem value="tissue">{t.tissue}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">{t.priority}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t.low}</SelectItem>
                      <SelectItem value="normal">{t.normal}</SelectItem>
                      <SelectItem value="high">{t.high}</SelectItem>
                      <SelectItem value="urgent">{t.urgent}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedDate">{t.expectedDate}</Label>
                  <Input id="expectedDate" type="date" />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">{t.testNotes}</Label>
                <Textarea id="notes" placeholder="ملاحظات إضافية..." rows={3} />
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setIsAddTestOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" onClick={() => setIsAddTestOpen(false)}>
                  طلب الفحص
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">{t.testRequests}</TabsTrigger>
          <TabsTrigger value="results">{t.testResults}</TabsTrigger>
          <TabsTrigger value="equipment">{t.equipment}</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="pending">{t.pending}</SelectItem>
                <SelectItem value="inProgress">{t.inProgress}</SelectItem>
                <SelectItem value="completed">{t.completed}</SelectItem>
                <SelectItem value="cancelled">{t.cancelled}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* قائمة طلبات الفحص */}
          <div className="grid gap-4">
            {testRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status)
              return (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TestTube className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{request.patientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.id} • {request.testType}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className={getStatusColor(request.status)}>
                          <StatusIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                          {t[request.status as keyof typeof t] || request.status}
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>
                          {t[request.priority as keyof typeof t] || request.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.requestDate}</p>
                        <p className="text-sm">{request.requestDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.expectedDate}</p>
                        <p className="text-sm">{request.expectedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.doctor}</p>
                        <p className="text-sm">{request.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.sampleType}</p>
                        <p className="text-sm">{request.sampleType}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground">{t.testNotes}</p>
                      <p className="text-sm">{request.notes}</p>
                    </div>

                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                      {request.status === "completed" ? (
                        <>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {t.viewResults}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {t.printReport}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">
                            {t.enterResults}
                          </Button>
                          <Button size="sm" variant="outline">
                            تحديث الحالة
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid gap-4">
            {testResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Microscope className="w-5 h-5" />
                        <span>
                          {result.patientName} - {result.testType}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {result.id} • مكتمل في {result.completedDate} • الفني: {result.technician}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(result.overallStatus)}>
                      {result.overallStatus === "normal"
                        ? "طبيعي"
                        : result.overallStatus === "abnormal"
                          ? t.abnormal
                          : t.critical}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-right rtl:text-left p-2">المعامل</th>
                            <th className="text-right rtl:text-left p-2">{t.result}</th>
                            <th className="text-right rtl:text-left p-2">{t.unit}</th>
                            <th className="text-right rtl:text-left p-2">{t.normalRange}</th>
                            <th className="text-right rtl:text-left p-2">{t.status}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.results.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{item.parameter}</td>
                              <td className="p-2">{item.value}</td>
                              <td className="p-2">{item.unit}</td>
                              <td className="p-2">{item.normalRange}</td>
                              <td className="p-2">
                                <Badge className={getStatusColor(item.status)} variant="outline">
                                  {item.status === "normal" ? "طبيعي" : t.abnormal}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">ملاحظات الفني:</h4>
                      <p className="text-sm">{result.notes}</p>
                    </div>

                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {t.printReport}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {t.sendToDoctor}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="grid gap-4">
            {equipment.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.model} • {item.id}
                        </p>
                      </div>
                    </div>

                    <Badge className={getStatusColor(item.status)}>
                      {item.status === "operational" ? "تشغيلي" : item.status === "maintenance" ? "صيانة" : "معطل"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">الموقع</p>
                      <p className="text-sm">{item.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.technician}</p>
                      <p className="text-sm">{item.technician}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.lastMaintenance}</p>
                      <p className="text-sm">{item.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.nextMaintenance}</p>
                      <p className="text-sm">{item.nextMaintenance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
