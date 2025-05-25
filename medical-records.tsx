"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Download, Upload, User, Calendar, Activity, Pill, FileImage } from "lucide-react"

interface MedicalRecordsProps {
  language: "ar" | "en"
}

export default function MedicalRecords({ language }: MedicalRecordsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const translations = {
    ar: {
      medicalRecords: "السجلات الطبية",
      patientSearch: "البحث عن مريض",
      newRecord: "سجل جديد",
      patientInfo: "معلومات المريض",
      medicalHistory: "التاريخ الطبي",
      prescriptions: "الوصفات الطبية",
      labResults: "نتائج المختبر",
      patientName: "اسم المريض",
      age: "العمر",
      gender: "الجنس",
      bloodType: "فصيلة الدم",
      allergies: "الحساسية",
      chronicDiseases: "الأمراض المزمنة",
      lastVisit: "آخر زيارة",
      diagnosis: "التشخيص",
      treatment: "العلاج",
      notes: "ملاحظات",
      addRecord: "إضافة سجل",
      uploadFile: "رفع ملف",
      downloadReport: "تحميل التقرير",
      aiSummary: "ملخص ذكي",
      male: "ذكر",
      female: "أنثى",
      noAllergies: "لا توجد حساسية معروفة",
      hypertension: "ضغط الدم المرتفع",
      diabetes: "السكري",
    },
    en: {
      medicalRecords: "Medical Records",
      patientSearch: "Patient Search",
      newRecord: "New Record",
      patientInfo: "Patient Information",
      medicalHistory: "Medical History",
      prescriptions: "Prescriptions",
      labResults: "Lab Results",
      patientName: "Patient Name",
      age: "Age",
      gender: "Gender",
      bloodType: "Blood Type",
      allergies: "Allergies",
      chronicDiseases: "Chronic Diseases",
      lastVisit: "Last Visit",
      diagnosis: "Diagnosis",
      treatment: "Treatment",
      notes: "Notes",
      addRecord: "Add Record",
      uploadFile: "Upload File",
      downloadReport: "Download Report",
      aiSummary: "AI Summary",
      male: "Male",
      female: "Female",
      noAllergies: "No known allergies",
      hypertension: "Hypertension",
      diabetes: "Diabetes",
    },
  }

  const t = translations[language]

  const patients = [
    {
      id: 1,
      name: "أحمد محمد علي",
      age: 45,
      gender: "male",
      bloodType: "A+",
      phone: "0599123456",
      lastVisit: "2024-01-15",
      allergies: [t.noAllergies],
      chronicDiseases: [t.hypertension, t.diabetes],
    },
    {
      id: 2,
      name: "فاطمة حسن",
      age: 32,
      gender: "female",
      bloodType: "O-",
      phone: "0598765432",
      lastVisit: "2024-01-10",
      allergies: ["البنسلين"],
      chronicDiseases: [],
    },
    {
      id: 3,
      name: "عمر يوسف",
      age: 28,
      gender: "male",
      bloodType: "B+",
      phone: "0597654321",
      lastVisit: "2024-01-08",
      allergies: [t.noAllergies],
      chronicDiseases: [],
    },
  ]

  const medicalHistory = [
    {
      date: "2024-01-15",
      diagnosis: "ارتفاع ضغط الدم",
      treatment: "دواء ضغط الدم + نظام غذائي",
      doctor: "د. سارة أحمد",
      notes: "المريض يستجيب جيداً للعلاج",
    },
    {
      date: "2023-12-20",
      diagnosis: "فحص دوري",
      treatment: "لا يوجد",
      doctor: "د. محمد خالد",
      notes: "جميع الفحوصات طبيعية",
    },
    {
      date: "2023-11-15",
      diagnosis: "التهاب الحلق",
      treatment: "مضاد حيوي + مسكن",
      doctor: "د. أحمد محمود",
      notes: "شفاء تام خلال أسبوع",
    },
  ]

  const prescriptions = [
    {
      medication: "أملوديبين 5mg",
      dosage: "مرة واحدة يومياً",
      duration: "3 أشهر",
      date: "2024-01-15",
    },
    {
      medication: "ميتفورمين 500mg",
      dosage: "مرتين يومياً",
      duration: "6 أشهر",
      date: "2024-01-15",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.medicalRecords}</h2>
        <Button className="flex items-center space-x-2 rtl:space-x-reverse">
          <Plus className="w-4 h-4" />
          <span>{t.newRecord}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Search */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t.patientSearch}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
              <Input
                placeholder={`${t.patientSearch}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pl-3 rtl:pr-10"
              />
            </div>

            <div className="space-y-2">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedPatient?.id === patient.id ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} سنة • {patient.gender === "male" ? t.male : t.female}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList>
                <TabsTrigger value="info">{t.patientInfo}</TabsTrigger>
                <TabsTrigger value="history">{t.medicalHistory}</TabsTrigger>
                <TabsTrigger value="prescriptions">{t.prescriptions}</TabsTrigger>
                <TabsTrigger value="lab">{t.labResults}</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {t.patientInfo}
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {t.downloadReport}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {t.uploadFile}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>{t.patientName}</Label>
                          <p className="text-lg font-medium">{selectedPatient.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>{t.age}</Label>
                            <p className="font-medium">{selectedPatient.age} سنة</p>
                          </div>
                          <div>
                            <Label>{t.gender}</Label>
                            <p className="font-medium">{selectedPatient.gender === "male" ? t.male : t.female}</p>
                          </div>
                        </div>

                        <div>
                          <Label>{t.bloodType}</Label>
                          <p className="font-medium">{selectedPatient.bloodType}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>{t.lastVisit}</Label>
                          <p className="font-medium flex items-center space-x-2 rtl:space-x-reverse">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedPatient.lastVisit}</span>
                          </p>
                        </div>

                        <div>
                          <Label>{t.allergies}</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedPatient.allergies.map((allergy, index) => (
                              <Badge key={index} variant="outline">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>{t.chronicDiseases}</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedPatient.chronicDiseases.length > 0 ? (
                              selectedPatient.chronicDiseases.map((disease, index) => (
                                <Badge key={index} variant="secondary">
                                  {disease}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline">لا توجد أمراض مزمنة</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 flex items-center space-x-2 rtl:space-x-reverse">
                          <Activity className="w-5 h-5" />
                          <span>{t.aiSummary}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-blue-700">
                          المريض يعاني من ارتفاع ضغط الدم والسكري، ويتابع العلاج بانتظام. آخر الفحوصات تظهر استقرار في
                          الحالة مع ضرورة المتابعة الدورية كل 3 أشهر.
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.medicalHistory}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalHistory.map((record, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{record.diagnosis}</h4>
                              <Badge variant="outline">{record.date}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>الطبيب:</strong> {record.doctor}
                            </p>
                            <p className="text-sm mb-2">
                              <strong>العلاج:</strong> {record.treatment}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>ملاحظات:</strong> {record.notes}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.prescriptions}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prescriptions.map((prescription, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <Pill className="w-8 h-8 text-green-600" />
                                <div>
                                  <h4 className="font-semibold">{prescription.medication}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {prescription.dosage} • {prescription.duration}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline">{prescription.date}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lab">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.labResults}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">لا توجد نتائج مختبر متاحة</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">اختر مريضاً لعرض سجله الطبي</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
