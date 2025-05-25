"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Calendar, Phone, Clock, Lightbulb, Heart, AlertCircle } from "lucide-react"

interface AIAssistantProps {
  language: "ar" | "en"
}

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: string
  suggestions?: string[]
}

export default function AIAssistant({ language }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        language === "ar"
          ? "مرحباً! أنا المساعد الطبي الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنني مساعدتك في حجز المواعيد، الإجابة على الاستفسارات الطبية العامة، أو تقديم معلومات حول العيادة."
          : "Hello! I'm your AI medical assistant. How can I help you today? I can assist with appointment booking, general medical inquiries, or clinic information.",
      timestamp: "10:00",
      suggestions:
        language === "ar"
          ? ["حجز موعد", "معلومات طبية", "ساعات العمل", "أرقام الطوارئ"]
          : ["Book appointment", "Medical info", "Working hours", "Emergency numbers"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const translations = {
    ar: {
      aiAssistant: "المساعد الذكي",
      aiDescription: "مساعد طبي ذكي متاح 24/7",
      typeMessage: "اكتب رسالتك هنا...",
      send: "إرسال",
      suggestions: "اقتراحات",
      quickActions: "إجراءات سريعة",
      bookAppointment: "حجز موعد",
      emergencyInfo: "معلومات الطوارئ",
      clinicHours: "ساعات العمل",
      medicalAdvice: "نصائح طبية",
      typing: "يكتب...",
      commonQuestions: "الأسئلة الشائعة",
      workingHours: "ما هي ساعات عمل العيادة؟",
      appointmentBooking: "كيف يمكنني حجز موعد؟",
      insuranceInfo: "ما هي شركات التأمين المقبولة؟",
      emergencyContact: "أرقام الطوارئ",
    },
    en: {
      aiAssistant: "AI Assistant",
      aiDescription: "24/7 AI Medical Assistant",
      typeMessage: "Type your message here...",
      send: "Send",
      suggestions: "Suggestions",
      quickActions: "Quick Actions",
      bookAppointment: "Book Appointment",
      emergencyInfo: "Emergency Info",
      clinicHours: "Clinic Hours",
      medicalAdvice: "Medical Advice",
      typing: "Typing...",
      commonQuestions: "Common Questions",
      workingHours: "What are the clinic hours?",
      appointmentBooking: "How can I book an appointment?",
      insuranceInfo: "What insurance companies are accepted?",
      emergencyContact: "Emergency Contact",
    },
  }

  const t = translations[language]

  const quickActions = [
    {
      icon: Calendar,
      label: t.bookAppointment,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: AlertCircle,
      label: t.emergencyInfo,
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Clock,
      label: t.clinicHours,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Heart,
      label: t.medicalAdvice,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const commonQuestions = [t.workingHours, t.appointmentBooking, t.insuranceInfo, t.emergencyContact]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        suggestions: getSuggestions(inputMessage),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (language === "ar") {
      if (lowerMessage.includes("موعد") || lowerMessage.includes("حجز")) {
        return "يمكنك حجز موعد من خلال الاتصال على 02-1234567 أو استخدام نظام الحجز الإلكتروني. ما هو التخصص المطلوب والوقت المفضل؟"
      } else if (lowerMessage.includes("ساعات") || lowerMessage.includes("وقت")) {
        return "ساعات عمل العيادة: الأحد - الخميس: 8:00 ص - 8:00 م، الجمعة: 8:00 ص - 12:00 م، السبت: مغلق"
      } else if (lowerMessage.includes("طوارئ")) {
        return "في حالات الطوارئ، يرجى الاتصال على: 101 أو زيارة أقرب مستشفى. للاستفسارات الطبية العاجلة: 02-1234567"
      } else {
        return "شكراً لسؤالك. يمكنني مساعدتك في حجز المواعيد، معلومات العيادة، أو الإجابة على الاستفسارات الطبية العامة. كيف يمكنني مساعدتك؟"
      }
    } else {
      if (lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
        return "You can book an appointment by calling 02-1234567 or using our online booking system. What specialty do you need and what time would you prefer?"
      } else if (lowerMessage.includes("hours") || lowerMessage.includes("time")) {
        return "Clinic hours: Sunday - Thursday: 8:00 AM - 8:00 PM, Friday: 8:00 AM - 12:00 PM, Saturday: Closed"
      } else if (lowerMessage.includes("emergency")) {
        return "For emergencies, please call: 101 or visit the nearest hospital. For urgent medical inquiries: 02-1234567"
      } else {
        return "Thank you for your question. I can help you with appointment booking, clinic information, or general medical inquiries. How can I assist you?"
      }
    }
  }

  const getSuggestions = (message: string): string[] => {
    if (language === "ar") {
      return ["حجز موعد آخر", "معلومات التأمين", "تغيير الموعد", "الاتصال بالعيادة"]
    } else {
      return ["Book another appointment", "Insurance info", "Change appointment", "Contact clinic"]
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
    handleSendMessage()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t.aiAssistant}</h2>
          <p className="text-muted-foreground">{t.aiDescription}</p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600">متصل</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bot className="w-5 h-5" />
              <span>المحادثة</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-96 w-full pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2 rtl:space-x-reverse">
                        {message.type === "assistant" && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                        {message.type === "user" && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Bot className="w-4 h-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.typeMessage}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Lightbulb className="w-5 h-5" />
                <span>{t.quickActions}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <action.icon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${action.color}`} />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Common Questions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.commonQuestions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {commonQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto p-2"
                  onClick={() => handleSuggestionClick(question)}
                >
                  <MessageSquare className="w-3 h-3 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                  <span className="text-right rtl:text-left">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>الطوارئ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-red-700">
                <p className="font-semibold">101 - الإسعاف</p>
                <p className="font-semibold">02-1234567 - العيادة</p>
                <p className="text-sm">متاح 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
