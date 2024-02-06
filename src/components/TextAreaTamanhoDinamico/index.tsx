import React, { useEffect, useRef, useState } from 'react';
import './TextAreaTamanhoDinamico.css';
import FeedPublicacoesUsuario from '../../pages/FeedPublicacoesUsuario';

interface TextAreaTamanhoDinamicoProps {
    id: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
    alturaInicial: number,
    className?: string | null,
    value?: string | null,
}

export default function TextAreaTamanhoDinamico({ id, className, placeholder, onChange, alturaInicial, value }: TextAreaTamanhoDinamicoProps) {

    const campoRef = useRef<HTMLTextAreaElement | null>(null);

    const [alturaCampo, setAlturaCampo] = useState(alturaInicial);

    function aoDigitar(e: React.ChangeEvent<HTMLTextAreaElement>) {

        if (campoRef.current) {
            if(alturaCampo < 175){
                setAlturaCampo(campoRef.current.scrollHeight);
            }
        }

        onChange(e);
    }

    return (
        <textarea
            id={id}
            className={`${className} textAreaTamanhoDinamico`}
            style={{ height: `${alturaCampo}px` }}
            placeholder={placeholder}
            onChange={aoDigitar}
            ref={campoRef}
        >{value}</textarea>
    )
}
