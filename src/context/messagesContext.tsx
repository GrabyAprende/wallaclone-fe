'use client';
import { createContext, useRef } from 'react';
import { ChildContainerProps } from '@/types';
import { Toast } from 'primereact/toast';

// Esta es la interfaz de las funciones que vamos a compartir con los componentes
interface MessagesContextProps {
    showSuccessMessage: (message: string) => void
    showInfoMessage: (message: string) => void
    showWarningMessage: (message: string) => void
    showErrorMessage: (message: string) => void
}

// Aqui creamos el contexto
export const MessagesContext = createContext({} as MessagesContextProps);

// Y ahora creamos el provider
export const MessagesProvider = ({ children }: ChildContainerProps) => {
    // Esta va a ser la referencia, el componente que va a usar toast
    const toast = useRef<Toast>(null);

    // Estos son las categorías de mensajes, dependiendo de como sea, saldrá de un color
    // Success verde, Error rojo, Warning naranja e Info Azul
    const showSuccessMessage = (message: string) => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: message });
    };
    const showInfoMessage = (message: string) => {
        toast.current?.show({ severity: 'info', summary: 'Info', detail: message });
    };
    const showWarningMessage = (message: string) => {
        toast.current?.show({ severity: 'warn', summary: 'Warning', detail: message });
    };
    const showErrorMessage = (message: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: message });
    };

    // Definimos los valores del contexto
    const value: MessagesContextProps = {
        showSuccessMessage,
        showInfoMessage,
        showWarningMessage,
        showErrorMessage,
    };

    // Devolvemos el contexto, esto será usado en el layout y el hijo (children) va a ser
    // la ruta donde estemos en ese momento
    return (
        <MessagesContext.Provider value={value}>
             <Toast ref={toast} />
            {children}
        </MessagesContext.Provider>
    );
};
