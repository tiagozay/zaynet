import React from 'react';
import Header from '../../components/Header';
import MenuEsquerdo from '../../components/MenuEsquerdo';
import Publicacao from '../../components/Publicacao';
import './home.css';

export default function Home() {
  return (
    <>
      <section id='feed'>
        <Publicacao></Publicacao>
        <Publicacao></Publicacao>
      </section>
    </>
  )
}
