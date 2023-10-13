import React from 'react'
import './MenuEsquerdo.css';

export default function MenuEsquerdo() {
  return (
    <nav id='menuEsquerdo'>
        <ul id='menuEsquerdo__opcoes'>
            <li id='menuEsquerdo__opcao'>
                <img src="./imagensDinamicas/perfil.jpg" alt="Foto do perfil" id='menuEsquerdo__opcao__perfil' />
                <p id="menuEsquerdo__opcao__nome">Tiago zay</p>
            </li>
            <li id='menuEsquerdo__opcao'>
                <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>group</i>
                <p id="menuEsquerdo__opcao__nome">Amigos</p>
            </li>
            <li id='menuEsquerdo__opcao'>
                <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>group_add</i>
                <p id="menuEsquerdo__opcao__nome">Adicionar amigos</p>
            </li>
            <li id='menuEsquerdo__opcao'>
                <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>image</i>
                <p id="menuEsquerdo__opcao__nome">Fotos</p>
            </li>
            <li id='menuEsquerdo__opcao'>
                <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>movie</i>
                <p id="menuEsquerdo__opcao__nome">Vídeos</p>
            </li>
            <li id='menuEsquerdo__opcao'>
                <i className='material-symbols-outlined' id='menuEsquerdo__opcao__icone'>post_add</i>
                <p id="menuEsquerdo__opcao__nome">Publicar</p>
            </li>
        </ul>   
    </nav>
  )
}
