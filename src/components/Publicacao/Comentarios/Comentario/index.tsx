import React, { useEffect, useRef } from 'react';
import './Comentario.css';
import EstruturaDoComentario from './EstruturaDoComentario';


interface ComentarioProps {
    perfilUsuario: string;
    nomeUsuario: string;
    comentario: string;
    respostas?: {perfilUsuario: string, nomeUsuario:string, comentario:string}[]
}

export default function Comentario({ perfilUsuario, nomeUsuario, comentario, respostas }: ComentarioProps) {


    return (
        <li className='publicacao__areaComentarios__comentario'>

            <EstruturaDoComentario
                comentario={comentario}
                nomeUsuario={nomeUsuario}
                perfilUsuario={perfilUsuario}
            />

            <ul id="comentario__listaDeRespostas">
                {

                    respostas?.map((resposta, index) => (
                        <EstruturaDoComentario
                            key={index}
                            comentario={resposta.comentario}
                            nomeUsuario={resposta.nomeUsuario}
                            perfilUsuario={resposta.perfilUsuario}
                        />
                    ))


                }
            </ul>

        </li>
    )
}
