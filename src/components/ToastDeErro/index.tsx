import React, { useEffect } from 'react';
import './ToastDeErro.css';

interface ToastProps {
    titulo: string,
    texto: string,
    fechaToast: () => void
}

export default function ToastDeErro({ titulo, texto, fechaToast }: ToastProps) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            fechaToast();
        }, 4000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div id='toastDeErro__overlay'>
            <div id='toastDeErro'>
                <div id='toastDeErro__divIconeETitulo'>
                    <i className='material-symbols-outlined'>error</i>
                    <h4>{titulo}</h4>
                </div>
                <p id='toastDeErro__texto'>
                    {texto}
                </p>
            </div>
        </div>

    )
}
