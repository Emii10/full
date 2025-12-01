
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';


interface AccessibilityState {
    darkMode: boolean;
    grayscale: boolean;
    fontSize: number; 
    contrast: number; 
}

interface AccessibilityContextType {
    state: AccessibilityState;
    toggleDarkMode: () => void;
    toggleGrayscale: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    increaseContrast: () => void; 
    decreaseContrast: () => void; 
    resetSettings: () => void;
}

const defaultState: AccessibilityState = {
    darkMode: false,
    grayscale: false,
    fontSize: 1.0, 
    contrast: 1.0, 
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);


export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AccessibilityState>(defaultState);


    useEffect(() => {
        const body = document.body;
        

        body.classList.remove('a11y-dark-mode', 'a11y-grayscale'); 


        if (state.darkMode) body.classList.add('a11y-dark-mode');
        if (state.grayscale) body.classList.add('a11y-grayscale');
        

        body.style.setProperty('--a11y-font-size-factor', state.fontSize.toString());
        body.style.setProperty('--a11y-contrast-factor', state.contrast.toString());

    }, [state]); 


    const toggleDarkMode = () => setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
    const toggleGrayscale = () => setState(prev => ({ ...prev, grayscale: !prev.grayscale }));
    

    const increaseFontSize = () => setState(prev => ({ 
        ...prev, 
        fontSize: Math.min(prev.fontSize + 0.1, 1.5) 
    }));
    const decreaseFontSize = () => setState(prev => ({ 
        ...prev, 
        fontSize: Math.max(prev.fontSize - 0.1, 0.8) 
    }));

    // Contraste: +20% por clic (Mín: 100%, Máx: 200%)
    const increaseContrast = () => setState(prev => ({ 
        ...prev, 
        contrast: Math.min(prev.contrast + 0.2, 2.0) 
    }));
    const decreaseContrast = () => setState(prev => ({ 
        ...prev, 
        contrast: Math.max(prev.contrast - 0.2, 1.0) 
    }));

    const resetSettings = () => setState(defaultState);

    return (
        <AccessibilityContext.Provider value={{ 
            state, 
            toggleDarkMode, 
            toggleGrayscale, 
            increaseFontSize, 
            decreaseFontSize, 
            increaseContrast, 
            decreaseContrast, 
            resetSettings 
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

// --- HOOK ---
export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility debe usarse dentro de un AccessibilityProvider');
    }
    return context;
};