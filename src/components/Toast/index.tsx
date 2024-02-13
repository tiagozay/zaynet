import React, { useEffect, useState } from 'react';
import './Toast.css';

interface ToastProps {
    texto: string,
    fechaToast: () => void
}

export default function Toast({texto, fechaToast}: ToastProps) {

    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const timeout = setTimeout(() => {
            // Gradualmente diminui a opacidade ao longo de 2 segundos antes de fechar o Toast
            const fadeOutInterval = setInterval(() => {
                setOpacity((prevOpacity) => prevOpacity - 0.1);
            }, 150);

            // Fecha o Toast após 2 segundos
            setTimeout(() => {
                clearInterval(fadeOutInterval);
                fechaToast();
            }, 2000);

            return () => {
                clearInterval(fadeOutInterval);
            };
        }, 4000);

        return () => {
            clearTimeout(timeout);
        };
    }, [fechaToast]);

    return (
        <div id="toast" style={{ opacity }}>
            <p id="toast__mensagem">{texto}</p>
        </div>
    )
}
