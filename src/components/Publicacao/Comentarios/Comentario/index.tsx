import React, { useEffect, useRef, useState } from 'react';
import './Comentario.css';
import EstruturaDoComentario from './EstruturaDoComentario';
import UsuarioService from '../../../../services/UsuarioService';
import { ComentarioPublicacao } from '../../../../models/Publicacao/ComentarioPublicacao';
import { APIService } from '../../../../services/APIService';
import InputComentario from '../InputComentario';


interface ComentarioProps {
    comentario: ComentarioPublicacao,
    atualizaComentarios: () => void
}

export default function Comentario({ comentario, atualizaComentarios }: ComentarioProps) {

    const [indicadorInputResponderAberto, setIndicadorInputResponderAberto] = useState(false);

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

    function clickAbrirInputResponder() {
        setIndicadorInputResponderAberto(true);
    }

    function fecharInputResponder() {
        setIndicadorInputResponderAberto(false);
        setRespostaDigitada("");
    }

    function aoEnviarResposta() {
        if (respostaDigitada.length !== 0) {
            APIService.post(`comentarios/${comentario.id}/respostas`, { conteudo: respostaDigitada })
                .then(() => {
                    atualizaComentarios();
                    fecharInputResponder();
                })
        }
    }

    return (
        <li className='publicacao__areaComentarios__comentario'>

            <EstruturaDoComentario
                comentario={comentario}
                ehUmaResposta={false}
                clickResponderComentario={clickAbrirInputResponder}
                atualizaComentarios={atualizaComentarios}
            />

            <ul id="comentario__listaDeRespostas">
                {
                    comentario.respotas?.map((resposta) => (
                        <EstruturaDoComentario
                            key={resposta.id}
                            comentario={resposta}
                            ehUmaResposta={true}
                            atualizaComentarios={atualizaComentarios}
                        />
                    ))
                }
                {
                    indicadorInputResponderAberto ?
                        <div
                            id='comentario__listaDeRespostas__divInputResponder'
                        >
                            <img
                                src={UsuarioService.obtemMiniaturaPerfilDoUsuarioLogado()}
                                id='comentario__divInputResponder__perfil'
                                alt="Foto perfil"
                            />
                            <div id='comentario__divInputResponder__container'>

                                <InputComentario
                                    clickEnviarComentario={aoEnviarResposta}
                                    novoComentarioDigitado={respostaDigitada}
                                    setNovoComentarioDigitado={setRespostaDigitada}
                                    ref={inputRef}
                                />

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
