"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

// Mensaje inicial
const initialMessages: Message[] = [
  {
    id: "1",
    text: "¡Hola! Soy el asistente virtual de Motofull. Soy especialista en repuestos para motocicletas y puedo ayudarte con información detallada sobre productos, precios, compatibilidad y más. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
    timestamp: new Date(),
    suggestions: [
      "¿Qué repuestos tienes para mi moto?",
      "¿Cuáles son los tiempos de envío?",
      "¿Tienen garantía los productos?",
      "¿Cómo puedo rastrear mi pedido?",
    ],
  },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const cleanText = text.trim()

    const userMessage: Message = {
      id: Date.now().toString(),
      text: cleanText,
      sender: "user",
      timestamp: new Date(),
    }

    // 🔹 Construimos el nuevo arreglo de mensajes (incluyendo este)
    const nextMessages = [...messages, userMessage]

    // Lo pintamos en pantalla
    setMessages(nextMessages)
    setInputValue("")
    setIsTyping(true)

    // 🔹 Historial que se mandará a la API (últimos 8 mensajes)
    const historyForAI = nextMessages.slice(-8).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }))

    console.log("🧠 [FE] historyForAI length:", historyForAI.length)

    try {
      const res = await fetch("/api/motofull-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanText,
          history: historyForAI,
        }),
      })

      let replyText = ""
      let errorText = ""

      if (res.ok) {
        const data: { text?: string; error?: string; details?: unknown } = await res.json()
        replyText = data.text ?? ""
      } else {
        errorText = await res.text()
      }

      if (errorText) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `⚠️ Error al conectar con la IA (status ${res.status}):\n${errorText}`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        return
      }

      if (!replyText) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Lo siento, tuve un problema al generar la respuesta. Por favor intenta de nuevo.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        return
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error: any) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `🔥 Error de red al conectar con la IA:\n${String(error?.message ?? error)}`,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-6 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg z-50"
        aria-label="Abrir chat de soporte"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-12 right-6 z-50">
      <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? "h-16" : "h-96"}`}>
        <CardHeader className="p-4 bg-orange-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-sm">Asistente Motofull</CardTitle>
                <p className="text-xs opacity-90">En línea</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-orange-700 p-1 h-auto"
                aria-label={isMinimized ? "Maximizar chat" : "Minimizar chat"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-orange-700 p-1 h-auto"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {message.sender === "bot" && (
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-orange-600" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.sender === "user" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-900 border"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-auto py-1 px-2 mr-1 mb-1 bg-white hover:bg-gray-50"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                  aria-label="Mensaje para el chatbot"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-orange-600 hover:bg-orange-700"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
