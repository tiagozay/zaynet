import React, { LegacyRef, useEffect, forwardRef, Ref, useRef } from 'react';
import './InputComentario.css';
import { useState } from 'react';

interface InputComentarioProps {
    novoComentarioDigitado: string;
    setNovoComentarioDigitado: React.Dispatch<React.SetStateAction<string>>;
    clickEnviarComentario: () => void;
}

function InputComentario({ novoComentarioDigitado, setNovoComentarioDigitado, clickEnviarComentario }: InputComentarioProps, ref: Ref<HTMLInputElement>) {
    const [indicadorBtnEnviarComentarioAtivo, setIndicadorBtnEnviarComentarioAtivo] = useState(false);

    function aoDigitarComentario(event: React.ChangeEvent<HTMLInputElement>) {
        setNovoComentarioDigitado(event.target.value);
    }

    useEffect(() => {
        if (novoComentarioDigitado.trim().length > 0) {
            setIndicadorBtnEnviarComentarioAtivo(true);
        } else {
            setIndicadorBtnEnviarComentarioAtivo(false);
        }
    }, [novoComentarioDigitado]);

    function aoPressionarEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && indicadorBtnEnviarComentarioAtivo) {
            clickEnviarComentario();
        }
    }

    return (
        <div id='inputComentario__divInput'>
            <input
                type="text"
                placeholder='Escreva um  comentário...'
                id='inputComentario__input'
                value={novoComentarioDigitado}
                onChange={aoDigitarComentario}
                onKeyPress={aoPressionarEnter}
                ref={ref}
            />
            <button
                className={`material-symbols-outlined ${!indicadorBtnEnviarComentarioAtivo && 'btnComentarInativo'}`}
                disabled={!indicadorBtnEnviarComentarioAtivo}
                id='inputComentario__btnEnviarComentario'
                onClick={() => clickEnviarComentario()}
            >send</button>
        </div>
    );
}

export default forwardRef(InputComentario);