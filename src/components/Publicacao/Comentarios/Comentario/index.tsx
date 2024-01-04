import React, { useEffect, useRef, useState } from 'react';
import './Comentario.css';
import EstruturaDoComentario from './EstruturaDoComentario';


interface ComentarioProps {
    perfilUsuario: string;
    nomeUsuario: string;
    comentario: string;
    respostas?: { perfilUsuario: string, nomeUsuario: string, comentario: string }[]
}

export default function Comentario({ perfilUsuario, nomeUsuario, comentario, respostas }: ComentarioProps) {

    const [indicadorInputResponderAberto, setIndicadorInputResponderAberto] = useState(false);
    const [permisaoParaEnviarResposta, setPermisaoParaEnviarResposta] = useState(false);

    const [respostaDigitada, setRespostaDigitada] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                fecharInputResponder();
            }
        })
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, [indicadorInputResponderAberto]);

    useEffect(() => {
        if (respostaDigitada.trim().length > 0) {
            setPermisaoParaEnviarResposta(true);
        } else {
            setPermisaoParaEnviarResposta(false);
        }
    }, [respostaDigitada]);

    function clickAbrirInputResponder()
    {
        setIndicadorInputResponderAberto(true);
    }

    function fecharInputResponder()
    {
        setIndicadorInputResponderAberto(false);
    }

    function aoDigitarResposta(e: React.ChangeEvent<HTMLInputElement>)
    {
        setRespostaDigitada(e.target.value);
    }   

    return (
        <li className='publicacao__areaComentarios__comentario'>

            <EstruturaDoComentario
                comentario={comentario}
                nomeUsuario={nomeUsuario}
                perfilUsuario={perfilUsuario}
                ehUmaResposta={false}
                clickResponderComentario={clickAbrirInputResponder}
            />

            <ul id="comentario__listaDeRespostas">
                {
                    respostas?.map((resposta, index) => (
                        <EstruturaDoComentario
                            key={index}
                            comentario={resposta.comentario}
                            nomeUsuario={resposta.nomeUsuario}
                            perfilUsuario={resposta.perfilUsuario}
                            ehUmaResposta={true}
                        />
                    ))
                }

                {
                    indicadorInputResponderAberto ?
                        <div
                            id='comentario__listaDeRespostas__divInputResponder'
                        >
                            <img
                                src="./imagensDinamicas/perfil.jpg"
                                id='comentario__divInputResponder__perfil'
                                alt="Foto perfil"
                            />
                            <div id='comentario__divInputResponder__container'>
                                <div id='comentario__divInputResponder__divInput'>
                                    <input
                                        type="text"
                                        id='comentario__divInputResponder__input'
                                        placeholder='Escreva uma resposta'
                                        ref={inputRef}
                                        value={respostaDigitada}
                                        onChange={ aoDigitarResposta }
                                    />
                                    <button
                                        className={`
                                            material-symbols-outlined 
                                            ${ !permisaoParaEnviarResposta ? 'btnResponderInativo' : ''} 
              
                                        `}
                                        id='comentario__divInputResponder__btnEnviarResposta'
                                        disabled={!permisaoParaEnviarResposta}
                                    >
                                        send
                                    </button>
                                </div>

                                <p id='comentario__divInputResponder__textoCancelar'>
                                    Pressione Esc para
                                    <button onClick={fecharInputResponder}> cancelar</button>
                                </p>
                            </div>

                        </div> :
                        ""
                }


            </ul>

        </li>
    )
}
