"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Settings, User, Shield, Bell, Database, Save, Download, Upload } from "lucide-react"

interface SystemSettingsProps {
  language: "ar" | "en"
  currentUser: any
}

export default function SystemSettings({ language, currentUser }: SystemSettingsProps) {
  const [settings, setSettings] = useState({
    clinicName: "عيادة الشفاء الطبية",
    clinicAddress: "رام الله، فلسطين",
    clinicPhone: "02-1234567",
    clinicEmail: "info@clinic.com",
    workingHours: "8:00 ص - 8:00 م",
    language: "ar",
    timezone: "Asia/Jerusalem",
    currency: "ILS",
    emailNotifications: true,
    smsNotifications: true,
    systemNotifications: true,
    autoBackup: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
    theme: "light",
  })

  const translations = {
    ar: {
      systemSettings: "إعدادات النظام",
      profile: "الملف الشخصي",
      clinic: "إعدادات العيادة",
      security: "الأمان",
      notifications: "الإشعارات",
      system: "النظام",
      backup: "النسخ الاحتياطي",
      personalInfo: "المعلومات الشخصية",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      specialization: "التخصص",
      bio: "نبذة شخصية",
      changePassword: "تغيير كلمة المرور",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      clinicInfo: "معلومات العيادة",
      clinicName: "اسم العيادة",
      address: "العنوان",
      workingHours: "ساعات العمل",
      website: "الموقع الإلكتروني",
      securitySettings: "إعدادات الأمان",
      twoFactorAuth: "المصادقة الثنائية",
      sessionTimeout: "انتهاء الجلسة (دقيقة)",
      loginHistory: "سجل تسجيل الدخول",
      notificationSettings: "إعدادات الإشعارات",
      emailNotifications: "إشعارات البريد الإلكتروني",
      smsNotifications: "إشعارات الرسائل النصية",
      systemNotifications: "إشعارات النظام",
      systemSettings: "إعدادات النظام",
      language: "اللغة",
      timezone: "المنطقة الزمنية",
      currency: "العملة",
      theme: "المظهر",
      autoBackup: "النسخ الاحتياطي التلقائي",
      backupSettings: "إعدادات النسخ الاحتياطي",
      createBackup: "إنشاء نسخة احتياطية",
      restoreBackup: "استعادة نسخة احتياطية",
      downloadBackup: "تحميل النسخة الاحتياطية",
      uploadBackup: "رفع نسخة احتياطية",
      lastBackup: "آخر نسخة احتياطية",
      save: "حفظ",
      cancel: "إلغاء",
      saved: "تم الحفظ بنجاح",
      light: "فاتح",
      dark: "داكن",
      arabic: "العربية",
      english: "الإنجليزية",
      shekel: "شيكل",
      dollar: "دولار",
      euro: "يورو",
    },
    en: {
      systemSettings: "System Settings",
      profile: "Profile",
      clinic: "Clinic Settings",
      security: "Security",
      notifications: "Notifications",
      system: "System",
      backup: "Backup",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      specialization: "Specialization",
      bio: "Bio",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      clinicInfo: "Clinic Information",
      clinicName: "Clinic Name",
      address: "Address",
      workingHours: "Working Hours",
      website: "Website",
      securitySettings: "Security Settings",
      twoFactorAuth: "Two-Factor Authentication",
      sessionTimeout: "Session Timeout (minutes)",
      loginHistory: "Login History",
      notificationSettings: "Notification Settings",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      systemNotifications: "System Notifications",
      systemSettings: "System Settings",
      language: "Language",
      timezone: "Timezone",
      currency: "Currency",
      theme: "Theme",
      autoBackup: "Auto Backup",
      backupSettings: "Backup Settings",
      createBackup: "Create Backup",
      restoreBackup: "Restore Backup",
      downloadBackup: "Download Backup",
      uploadBackup: "Upload Backup",
      lastBackup: "Last Backup",
      save: "Save",
      cancel: "Cancel",
      saved: "Saved Successfully",
      light: "Light",
      dark: "Dark",
      arabic: "Arabic",
      english: "English",
      shekel: "Shekel",
      dollar: "Dollar",
      euro: "Euro",
    },
  }

  const t = translations[language]

  const handleSave = () => {
    // محاكاة حفظ الإعدادات
    console.log("Settings saved:", settings)
    // يمكن إضافة toast notification هنا
  }

  const handleBackup = () => {
    // محاكاة إنشاء نسخة احتياطية
    console.log("Creating backup...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.systemSettings}</h2>
        <Button onClick={handleSave} className="flex items-center space-x-2 rtl:space-x-reverse">
          <Save className="w-4 h-4" />
          <span>{t.save}</span>
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center space-x-2 rtl:space-x-reverse">
            <User className="w-4 h-4" />
            <span>{t.profile}</span>
          </TabsTrigger>
          <TabsTrigger value="clinic" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Settings className="w-4 h-4" />
            <span>{t.clinic}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Shield className="w-4 h-4" />
            <span>{t.security}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Bell className="w-4 h-4" />
            <span>{t.notifications}</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Database className="w-4 h-4" />
            <span>{t.system}</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Download className="w-4 h-4" />
            <span>{t.backup}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.personalInfo}</CardTitle>
              <CardDescription>تحديث معلوماتك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input id="fullName" value={currentUser?.name || "د. أحمد محمد"} />
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" type="email" value={currentUser?.email || "admin@clinic.com"} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input id="phone" value="0599123456" />
                </div>
                <div>
                  <Label htmlFor="specialization">{t.specialization}</Label>
                  <Input id="specialization" value="طب عام" />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">{t.bio}</Label>
                <Textarea id="bio" placeholder="نبذة مختصرة عنك..." rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.changePassword}</CardTitle>
              <CardDescription>تغيير كلمة المرور الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword">{t.newPassword}</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <Button>تحديث كلمة المرور</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.clinicInfo}</CardTitle>
              <CardDescription>إعدادات العيادة الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="clinicName">{t.clinicName}</Label>
                <Input
                  id="clinicName"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="address">{t.address}</Label>
                <Input
                  id="address"
                  value={settings.clinicAddress}
                  onChange={(e) => setSettings({ ...settings, clinicAddress: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    value={settings.clinicPhone}
                    onChange={(e) => setSettings({ ...settings, clinicPhone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.clinicEmail}
                    onChange={(e) => setSettings({ ...settings, clinicEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="workingHours">{t.workingHours}</Label>
                  <Input
                    id="workingHours"
                    value={settings.workingHours}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="website">{t.website}</Label>
                  <Input id="website" placeholder="https://clinic.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.securitySettings}</CardTitle>
              <CardDescription>إعدادات الأمان والحماية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">{t.twoFactorAuth}</Label>
                  <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية لحماية إضافية</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">{t.sessionTimeout}</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 دقيقة</SelectItem>
                    <SelectItem value="30">30 دقيقة</SelectItem>
                    <SelectItem value="60">60 دقيقة</SelectItem>
                    <SelectItem value="120">120 دقيقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.loginHistory}</CardTitle>
              <CardDescription>سجل تسجيل الدخول الأخير</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2024-01-15 10:30", ip: "192.168.1.100", device: "Chrome - Windows" },
                  { date: "2024-01-14 16:20", ip: "192.168.1.101", device: "Safari - iPhone" },
                  { date: "2024-01-14 09:15", ip: "192.168.1.100", device: "Chrome - Windows" },
                ].map((login, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{login.device}</p>
                      <p className="text-sm text-muted-foreground">{login.ip}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{login.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.notificationSettings}</CardTitle>
              <CardDescription>إدارة إعدادات الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">{t.emailNotifications}</Label>
                  <p className="text-sm text-muted-foreground">استقبال الإشعارات عبر البريد الإلكتروني</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">{t.smsNotifications}</Label>
                  <p className="text-sm text-muted-foreground">استقبال الإشعارات عبر الرسائل النصية</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="systemNotifications">{t.systemNotifications}</Label>
                  <p className="text-sm text-muted-foreground">إشعارات النظام والتحديثات</p>
                </div>
                <Switch
                  id="systemNotifications"
                  checked={settings.systemNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, systemNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.systemSettings}</CardTitle>
              <CardDescription>إعدادات النظام العامة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="language">{t.language}</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings({ ...settings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">{t.arabic}</SelectItem>
                      <SelectItem value="en">{t.english}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">{t.timezone}</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jerusalem">Jerusalem</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="currency">{t.currency}</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings({ ...settings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ILS">{t.shekel} (₪)</SelectItem>
                      <SelectItem value="USD">{t.dollar} ($)</SelectItem>
                      <SelectItem value="EUR">{t.euro} (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme">{t.theme}</Label>
                  <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t.light}</SelectItem>
                      <SelectItem value="dark">{t.dark}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.backupSettings}</CardTitle>
              <CardDescription>إدارة النسخ الاحتياطية للنظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">{t.autoBackup}</Label>
                  <p className="text-sm text-muted-foreground">إنشاء نسخة احتياطية تلقائياً كل يوم</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleBackup} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Download className="w-4 h-4" />
                  <span>{t.createBackup}</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Upload className="w-4 h-4" />
                  <span>{t.uploadBackup}</span>
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{t.lastBackup}</p>
                <p className="text-sm text-muted-foreground">2024-01-15 02:00 ص</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
