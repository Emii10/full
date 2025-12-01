"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  Palette,
  Type,
  Volume2,
  RotateCcw,
  Settings,
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  largeButtons: boolean;
  colorBlindFriendly: boolean;
  fontFamily: string;
  grayscale: boolean;
  readingGuide: boolean;
}

const DEFAULTS: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  darkMode: false,
  reducedMotion: false,
  screenReader: false,
  largeButtons: false,
  colorBlindFriendly: false,
  fontFamily: "sans-serif",
  grayscale: false,
  readingGuide: false,
};

export default function AccessibilityFeatures() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULTS);

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        const parsedSettings: AccessibilitySettings = JSON.parse(saved);
        setSettings(parsedSettings);
      } catch {
        setSettings(DEFAULTS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    root.style.fontSize = `${s.fontSize}%`;
    root.style.fontFamily = s.fontFamily;

    toggleClass(root, "high-contrast", s.highContrast);
    toggleClass(root, "reduce-motion", s.reducedMotion);
    toggleClass(root, "large-buttons", s.largeButtons);
    toggleClass(root, "color-blind-friendly", s.colorBlindFriendly);
    toggleClass(root, "grayscale", s.grayscale);
    toggleClass(root, "reading-guide", s.readingGuide);

    if (s.darkMode) {
      root.classList.add("dark");
      setDarkVariables(root);
    } else {
      root.classList.remove("dark");
      setLightVariables(root);
    }
  };

  const setDarkVariables = (root: HTMLElement) => {
    root.style.setProperty("--bg", "#1e1e1e"); // Color de fondo oscuro
    root.style.setProperty("--text", "#ffffff"); // Texto blanco
    root.style.setProperty("--card", "#2c2c2c");
    root.style.setProperty("--muted", "#b3b3b3");
    root.style.setProperty("--primary", "#bb86fc");
    root.style.setProperty("--input-bg", "#333");
    root.style.setProperty("--border", "#444");
  };

  const setLightVariables = (root: HTMLElement) => {
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--text", "#0d0d0d"); // Texto oscuro
    root.style.setProperty("--card", "#f9f9f9");
    root.style.setProperty("--muted", "#6b7280");
    root.style.setProperty("--primary", "#1a73e8");
    root.style.setProperty("--input-bg", "#ffffff");
    root.style.setProperty("--border", "#e5e7eb");
  };

  const toggleClass = (el: Element, cls: string, enabled: boolean) => {
    if (enabled) el.classList.add(cls);
    else el.classList.remove(cls);
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULTS);
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) updateSetting("fontSize", settings.fontSize + 10);
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) updateSetting("fontSize", settings.fontSize - 10);
  };

  const changeFontFamily = () => {
    const order = ["sans-serif", "serif", "monospace"];
    const currentIndex = order.indexOf(settings.fontFamily);
    const nextIndex = (currentIndex + 1) % order.length;
    updateSetting("fontFamily", order[nextIndex]);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        aria-label="Abrir opciones de accesibilidad"
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className="w-80 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Accessibility className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Accesibilidad</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar opciones de accesibilidad"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Tamaño de texto. */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tamaño de Texto</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 80}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="min-w-[60px] justify-center">
                  {settings.fontSize}%
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 150}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Opciones visuales */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Opciones Visuales</label>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">Alto Contraste</span>
                </div>
                <Button
                  variant={settings.highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("highContrast", !settings.highContrast)}
                >
                  {settings.highContrast ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-sm">Modo Oscuro</span>
                </div>
                <Button
                  variant={settings.darkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("darkMode", !settings.darkMode)}
                >
                  {settings.darkMode ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-sm">Colores Amigables</span>
                </div>
                <Button
                  variant={settings.colorBlindFriendly ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("colorBlindFriendly", !settings.colorBlindFriendly)}
                >
                  {settings.colorBlindFriendly ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-sm">Escala de Grises</span>
                </div>
                <Button
                  variant={settings.grayscale ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("grayscale", !settings.grayscale)}
                >
                  {settings.grayscale ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-sm">Guía de Lectura</span>
                </div>
                <Button
                  variant={settings.readingGuide ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("readingGuide", !settings.readingGuide)}
                >
                  {settings.readingGuide ? "ON" : "OFF"}
                </Button>
              </div>
            </div>

            {/* Movimiento e Interacción */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Movimiento e Interacción</label>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <EyeOff className="h-4 w-4" />
                  <span className="text-sm">Reducir Animaciones</span>
                </div>
                <Button
                  variant={settings.reducedMotion ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                >
                  {settings.reducedMotion ? "ON" : "OFF"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span className="text-sm">Botones Grandes</span>
                </div>
                <Button
                  variant={settings.largeButtons ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("largeButtons", !settings.largeButtons)}
                >
                  {settings.largeButtons ? "ON" : "OFF"}
                </Button>
              </div>
            </div>

            {/* Cambio de Tipografía */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span className="text-sm">Cambiar Tipografía</span>
              </div>
              <Button variant="outline" size="sm" onClick={changeFontFamily}>
                {settings.fontFamily === "sans-serif" ? "Sans" : settings.fontFamily === "serif" ? "Serif" : "Mono"}
              </Button>
            </div>

            {/* Lector de pantalla */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <span className="text-sm">Lector de Pantalla</span>
              </div>
              <Button
                variant={settings.screenReader ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting("screenReader", !settings.screenReader)}
              >
                {settings.screenReader ? "ON" : "OFF"}
              </Button>
            </div>

            {/* Restablecer */}
            <Button variant="outline" className="w-full bg-transparent" onClick={resetSettings}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


