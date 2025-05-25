"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Heart,
} from "lucide-react"

interface AnalyticsProps {
  language: "ar" | "en"
}

export default function Analytics({ language }: AnalyticsProps) {
  const translations = {
    ar: {
      analytics: "التحليلات والتقارير",
      overview: "نظرة عامة",
      patients: "المرضى",
      appointments: "المواعيد",
      financial: "مالي",
      performance: "الأداء",
      totalPatients: "إجمالي المرضى",
      newPatients: "مرضى جدد",
      returningPatients: "مرضى عائدون",
      appointmentsToday: "مواعيد اليوم",
      completedAppointments: "مواعيد مكتملة",
      cancelledAppointments: "مواعيد ملغية",
      monthlyRevenue: "الإيرادات الشهرية",
      averageWaitTime: "متوسط وقت الانتظار",
      patientSatisfaction: "رضا المرضى",
      doctorEfficiency: "كفاءة الأطباء",
      predictiveInsights: "رؤى تنبؤية",
      criticalAlerts: "تنبيهات حرجة",
      recommendations: "التوصيات",
      exportReport: "تصدير التقرير",
      lastUpdated: "آخر تحديث",
      minutes: "دقيقة",
      increase: "زيادة",
      decrease: "انخفاض",
    },
    en: {
      analytics: "Analytics & Reports",
      overview: "Overview",
      patients: "Patients",
      appointments: "Appointments",
      financial: "Financial",
      performance: "Performance",
      totalPatients: "Total Patients",
      newPatients: "New Patients",
      returningPatients: "Returning Patients",
      appointmentsToday: "Today's Appointments",
      completedAppointments: "Completed Appointments",
      cancelledAppointments: "Cancelled Appointments",
      monthlyRevenue: "Monthly Revenue",
      averageWaitTime: "Average Wait Time",
      patientSatisfaction: "Patient Satisfaction",
      doctorEfficiency: "Doctor Efficiency",
      predictiveInsights: "Predictive Insights",
      criticalAlerts: "Critical Alerts",
      recommendations: "Recommendations",
      exportReport: "Export Report",
      lastUpdated: "Last Updated",
      minutes: "minutes",
      increase: "increase",
      decrease: "decrease",
    },
  }

  const t = translations[language]

  const overviewStats = [
    {
      title: t.totalPatients,
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: t.appointmentsToday,
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: t.monthlyRevenue,
      value: "₪45,230",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: t.patientSatisfaction,
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: Heart,
      color: "text-red-600",
    },
  ]

  const patientStats = [
    {
      title: t.newPatients,
      value: "156",
      period: "هذا الشهر",
      change: "+23%",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: t.returningPatients,
      value: "1,091",
      period: "هذا الشهر",
      change: "+5%",
      color: "bg-green-100 text-green-800",
    },
  ]

  const appointmentStats = [
    {
      title: t.completedAppointments,
      value: "892",
      percentage: "89.2%",
      color: "bg-green-100 text-green-800",
    },
    {
      title: t.cancelledAppointments,
      value: "108",
      percentage: "10.8%",
      color: "bg-red-100 text-red-800",
    },
  ]

  const performanceMetrics = [
    {
      title: t.averageWaitTime,
      value: "12",
      unit: t.minutes,
      target: "15",
      status: "good",
    },
    {
      title: t.doctorEfficiency,
      value: "94%",
      unit: "",
      target: "90%",
      status: "excellent",
    },
  ]

  const predictiveInsights = [
    {
      type: "warning",
      title: "توقع زيادة في المواعيد",
      description: "متوقع زيادة 25% في المواعيد الأسبوع القادم",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      type: "info",
      title: "نمط مواعيد الطوارئ",
      description: "زيادة في مواعيد الطوارئ يوم الجمعة بنسبة 40%",
      icon: AlertTriangle,
      color: "text-blue-600",
    },
    {
      type: "success",
      title: "تحسن رضا المرضى",
      description: "رضا المرضى في تحسن مستمر خلال الشهرين الماضيين",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  const recommendations = [
    "إضافة طبيب إضافي يوم الجمعة لتقليل أوقات الانتظار",
    "تحسين نظام التذكير لتقليل معدل إلغاء المواعيد",
    "توسيع ساعات العمل في فترة الذروة (10-12 ظهراً)",
    "تطوير برنامج متابعة للمرضى المزمنين",
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.analytics}</h2>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t.exportReport}
          </Button>
          <Badge variant="outline" className="text-xs">
            {t.lastUpdated}: منذ 5 دقائق
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="patients">{t.patients}</TabsTrigger>
          <TabsTrigger value="appointments">{t.appointments}</TabsTrigger>
          <TabsTrigger value="performance">{t.performance}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> من
                    الشهر الماضي
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Predictive Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Activity className="w-5 h-5" />
                <span>{t.predictiveInsights}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictiveInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 border rounded-lg">
                  <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div>
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t.recommendations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patientStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{stat.title}</CardTitle>
                  <CardDescription>{stat.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <Badge className={stat.color}>{stat.change}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointmentStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <Badge className={stat.color}>{stat.percentage}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {metric.value} {metric.unit}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    الهدف: {metric.target} {metric.unit}
                  </p>
                  <Badge
                    className={
                      metric.status === "excellent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {metric.status === "excellent" ? "ممتاز" : "جيد"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
