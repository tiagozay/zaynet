import React, { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
    titulo: string,
    texto: string,
    fechaToast: () => void
}

export default function Toast({ titulo, texto, fechaToast }: ToastProps) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            fechaToast();
        }, 4000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div id='toast__overlay'>
            <div id='toast'>
                <div id='toast__divIconeETitulo'>
                    <i className='material-symbols-outlined'>error</i>
                    <h4>{titulo}</h4>
                </div>
                <p id='toast__texto'>
                    {texto}
                </p>
            </div>
        </div>

    )
}
