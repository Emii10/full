"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const directions = ["left", "right", "up", "down"];

interface RotationalCaptchaProps {
  onValidate: (isValid: boolean) => void;
  isLoading: boolean;
}

export const RotationalCaptcha: React.FC<RotationalCaptchaProps> = ({ onValidate, isLoading }) => {
  const [targetDirection, setTargetDirection] = useState("left");
  const [userDirection, setUserDirection] = useState("right");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const generateDirections = () => {
    const randomTarget = directions[Math.floor(Math.random() * directions.length)];
    let randomUser = directions[Math.floor(Math.random() * directions.length)];
    while (randomUser === randomTarget) {
      randomUser = directions[Math.floor(Math.random() * directions.length)];
    }
    setTargetDirection(randomTarget);
    setUserDirection(randomUser);
    setIsVerified(false);
    setError("");
  };

  useEffect(() => {
    generateDirections();
  }, []);

  const handleRotate = (direction: 'left' | 'right') => {
    if (isVerified || isLoading) return;

    const currentIndex = directions.indexOf(userDirection);
    const nextIndex = direction === 'right'
      ? (currentIndex + 1) % directions.length
      : (currentIndex - 1 + directions.length) % directions.length;

    setUserDirection(directions[nextIndex]);
  };

  const handleConfirm = () => {
    if (userDirection === targetDirection) {
      setIsVerified(true);
      setError("");
      onValidate(true);
    } else {
      setError("Orientación incorrecta. Intenta nuevamente.");
    }
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-sm font-medium text-gray-700">
        Usa las flechas para rotar el animal para que mire en la dirección de la mano.
      </p>

      <div className="flex justify-center items-center gap-8">
        {/* Flecha objetivo */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white shadow-inner">
            <img 
              src={`/captcha/hand-${targetDirection}.png`} 
              alt={`Flecha apuntando hacia ${targetDirection}`} 
              onError={(e) => { e.currentTarget.src = "/captcha/placeholder.png"; }}
              className="w-full h-full object-contain max-w-[192px] max-h-[192px]" 
            />
          </div>
          <span className="text-xs text-gray-500 mt-2">Ángulo a Igualar</span>
        </div>

        {/* Animal a rotar */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 border border-gray-300 rounded overflow-hidden flex items-center justify-center bg-white shadow-inner relative">
            <img 
              src={`/captcha/animal-${userDirection}.png`} 
              alt={`Animal orientado hacia ${userDirection}`} 
              onError={(e) => { e.currentTarget.src = "/captcha/placeholder.png"; }}
              className="w-full h-full object-contain transition-opacity duration-150 max-w-[192px] max-h-[192px]" 
            />
            {isVerified && (
              <span className="absolute inset-0 flex items-center justify-center text-green-600 font-bold text-xl bg-white/80 p-2 rounded">✅ Verificado</span>
            )}
          </div>

          {/* Botones de rotación */}
          <div className="flex gap-4 mt-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleRotate('left')} 
              disabled={isVerified || isLoading}
              aria-label="Rotar a la izquierda"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleRotate('right')} 
              disabled={isVerified || isLoading}
              aria-label="Rotar a la derecha"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Botón de confirmación */}
          <Button 
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleConfirm}
            disabled={isVerified || isLoading}
          >
            Confirmar
          </Button>
        </div>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="text-center pt-2 font-semibold text-red-500">
          {error}
        </div>
      )}

      {isVerified && (
        <div className="text-center pt-2 font-semibold text-green-600">
          CAPTCHA Resuelto Correctamente.
        </div>
      )}
    </div>
  );
};
