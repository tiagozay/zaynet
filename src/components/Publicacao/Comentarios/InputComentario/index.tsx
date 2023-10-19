import React, { LegacyRef, useEffect, forwardRef, Ref } from 'react';
import './InputComentario.css';
import { useState } from 'react';

interface InputComentarioProps{
    value?: string;
}

function InputComentario({value} : InputComentarioProps, ref: Ref<HTMLInputElement>) {
    const [indicadorBtnEnviarComentarioAtivo, setIndicadorBtnEnviarComentarioAtivo] = useState(false);
    const [comentarioDigitado, setComentarioDigitado] = useState(!value ? "" : value);

    function aoDigitarComentario(event: React.ChangeEvent<HTMLInputElement>) {
        setComentarioDigitado(event.target.value);
    }

    useEffect(() => {
        if (comentarioDigitado.trim().length > 0) {
            setIndicadorBtnEnviarComentarioAtivo(true);
        } else {
            setIndicadorBtnEnviarComentarioAtivo(false);
        }
    }, [comentarioDigitado]);

    return (
        <div id='inputComentario__divInput'>
            <input
                type="text" 
                placeholder='Escreva um  comentário...'
                id='inputComentario__input'
                value={comentarioDigitado}
                onChange={aoDigitarComentario}
                ref={ref}
            />
            <button
                className={`material-symbols-outlined ${!indicadorBtnEnviarComentarioAtivo && 'btnComentarInativo'}`}
                disabled={!indicadorBtnEnviarComentarioAtivo}
                id='inputComentario__btnEnviarComentario'
            >send</button>
        </div>
    );
}

export default forwardRef(InputComentario);