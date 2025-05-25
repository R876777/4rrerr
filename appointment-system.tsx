"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Phone, Plus, Search, Filter, CheckCircle, Stethoscope } from "lucide-react"

interface AppointmentSystemProps {
  language: "ar" | "en"
  currentUser: any
}

export default function AppointmentSystem({ language, currentUser }: AppointmentSystemProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  const translations = {
    ar: {
      appointmentManagement: "إدارة المواعيد",
      newAppointment: "موعد جديد",
      todaySchedule: "جدول اليوم",
      upcomingAppointments: "المواعيد القادمة",
      patientName: "اسم المريض",
      phoneNumber: "رقم الهاتف",
      email: "البريد الإلكتروني",
      appointmentDate: "تاريخ الموعد",
      appointmentTime: "وقت الموعد",
      doctor: "الطبيب",
      appointmentType: "نوع الموعد",
      notes: "ملاحظات",
      bookAppointment: "حجز الموعد",
      search: "بحث",
      filter: "تصفية",
      confirmed: "مؤكد",
      pending: "معلق",
      completed: "مكتمل",
      cancelled: "ملغي",
      generalConsultation: "استشارة عامة",
      followUp: "متابعة",
      periodicExam: "فحص دوري",
      emergency: "طارئ",
      aiSuggestion: "اقتراح ذكي: أفضل وقت متاح",
      smartScheduling: "الجدولة الذكية",
      patientHistory: "تاريخ المريض",
      reschedule: "إعادة جدولة",
      cancel: "إلغاء",
      checkIn: "تسجيل وصول",
      noShow: "لم يحضر",
      duration: "المدة",
      reason: "السبب",
      priority: "الأولوية",
      high: "عالية",
      normal: "عادية",
      low: "منخفضة",
    },
    en: {
      appointmentManagement: "Appointment Management",
      newAppointment: "New Appointment",
      todaySchedule: "Today's Schedule",
      upcomingAppointments: "Upcoming Appointments",
      patientName: "Patient Name",
      phoneNumber: "Phone Number",
      email: "Email",
      appointmentDate: "Appointment Date",
      appointmentTime: "Appointment Time",
      doctor: "Doctor",
      appointmentType: "Appointment Type",
      notes: "Notes",
      bookAppointment: "Book Appointment",
      search: "Search",
      filter: "Filter",
      confirmed: "Confirmed",
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
      generalConsultation: "General Consultation",
      followUp: "Follow-up",
      periodicExam: "Periodic Exam",
      emergency: "Emergency",
      aiSuggestion: "AI Suggestion: Best available time",
      smartScheduling: "Smart Scheduling",
      patientHistory: "Patient History",
      reschedule: "Reschedule",
      cancel: "Cancel",
      checkIn: "Check In",
      noShow: "No Show",
      duration: "Duration",
      reason: "Reason",
      priority: "Priority",
      high: "High",
      normal: "Normal",
      low: "Low",
    },
  }

  const t = translations[language]

  const appointments = [
    {
      id: 1,
      patient: "أحمد محمد علي",
      phone: "0599123456",
      time: "09:00",
      duration: "30 دقيقة",
      doctor: "د. سارة أحمد",
      type: t.generalConsultation,
      status: "confirmed",
      priority: "normal",
      reason: "فحص دوري",
      notes: "مريض منتظم، آخر زيارة قبل 3 أشهر",
    },
    {
      id: 2,
      patient: "فاطمة حسن",
      phone: "0598765432",
      time: "09:30",
      duration: "45 دقيقة",
      doctor: "د. محمد خالد",
      type: t.followUp,
      status: "pending",
      priority: "high",
      reason: "متابعة ضغط الدم",
      notes: "يحتاج فحص ضغط الدم وتعديل الدواء",
    },
    {
      id: 3,
      patient: "عمر يوسف",
      phone: "0597654321",
      time: "10:00",
      duration: "30 دقيقة",
      doctor: "د. سارة أحمد",
      type: t.periodicExam,
      status: "confirmed",
      priority: "normal",
      reason: "فحص سنوي",
      notes: "فحص شامل سنوي",
    },
    {
      id: 4,
      patient: "نور الدين",
      phone: "0596543210",
      time: "10:30",
      duration: "60 دقيقة",
      doctor: "د. أحمد محمود",
      type: t.emergency,
      status: "confirmed",
      priority: "high",
      reason: "ألم في الصدر",
      notes: "حالة طارئة - يحتاج فحص فوري",
    },
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ]

  const doctors = [
    "د. سارة أحمد - طب عام",
    "د. محمد خالد - قلب",
    "د. أحمد محمود - عظام",
    "د. ليلى حسن - نساء وولادة"
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const handleCheckIn = (appointmentId: number) => {
    console.log("Check in appointment:", appointmentId)
  }

  const handleReschedule = (appointmentId: number) => {
    console.log("Reschedule appointment:", appointmentId)
  }

  const handleCancel = (appointmentId: number) => {
    console.log("Cancel appointment:", appointmentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.appointmentManagement}</h2>
        <Button className="flex items-center space-x-2 rtl:space-x-reverse">
          <Plus className="w-4 h-4" />
          <span>{t.newAppointment}</span>
        </Button>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule">{t.todaySchedule}</TabsTrigger>
          <TabsTrigger value="new">{t.newAppointment}</TabsTrigger>
          <TabsTrigger value="upcoming">{t.upcomingAppointments}</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          {/* Search and Filter */}
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
            <Button variant="outline" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="w-4 h-4" />
              <span>{t.filter}</span>
            </Button>
          </div>

          {/* Appointments List */}
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground flex items-center space-x-2 rtl:space-x-reverse">
                          <Phone className="w-4 h-4" />
                          <span>{appointment.phone}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Badge className={getStatusColor(appointment.status)}>
                        {t[appointment.status as keyof typeof t] || appointment.status}
                      </Badge>
                      <Badge className={getPriorityColor(appointment.priority)}>
                        {t[appointment.priority as keyof typeof t] || appointment.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.type}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{t.reason}:</p>
                    <p className="text-sm">{appointment.reason}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{t.notes}:</p>
                    <p className="text-sm">{appointment.notes}</p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCheckIn(appointment.id)}
                      className="flex items-center space-x-1 rtl:space-x-reverse"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.checkIn}</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReschedule(appointment.id)}
                    >
                      {t.reschedule}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="space-y-6">
          {/* New Appointment Form */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.patientName}</label>
                    <Input placeholder={t.patientName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.phoneNumber}</label>
                    <Input placeholder={t.phoneNumber} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.email}</label>
                    <Input placeholder={t.email} type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.appointmentType}</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="general">{t.generalConsultation}</option>
                      <option value="followup">{t.followUp}</option>
                      <option value="periodic">{t.periodicExam}</option>
                      <option value="emergency">{t.emergency}</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.appointmentDate}</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.appointmentTime}</label>
                    <select className="w-full p-2 border rounded-md">
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.doctor}</label>
                    <select className="w-full p-2 border rounded-md">
                      {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t.notes}</label>
                    <textarea className="w-full p-2 border rounded-md" rows={3}></textarea>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookAppointment}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="grid gap-4">
            {appointments.slice(0, 2).map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground flex items-center space-x-2 rtl:space-x-reverse">
                          <Phone className="w-4 h-4" />
                          <span>{appointment.phone}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Badge className={getStatusColor(appointment.status)}>
                        {t[appointment.status as keyof typeof t] || appointment.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReschedule(appointment.id)}
                    >
                      {t.reschedule}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      {t.cancel}
                    </Button>
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
