import React from 'react';
import './UltimaImagemComSobreposicao.css';

interface UltimaImagemComSobreposicaoProps {
    urlImagem: string,
    classeDeCadaImagem: string,
    quantidadeDeImagensRestantes: number,
    aoClicarEmVerTodasImagens: () => void
}

export default function UltimaImagemComSobreposicao(
    { urlImagem, classeDeCadaImagem, quantidadeDeImagensRestantes, aoClicarEmVerTodasImagens }: UltimaImagemComSobreposicaoProps
) {
    const style = {
        backgroundImage: `url(${process.env.REACT_APP_CAMINHO_MIDIA_PUBLICACAO}${urlImagem})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };

    return <div
        id='publicacao__imagens__sobreposicaoDaUltimaImagem'
        className={classeDeCadaImagem}
        style={style}
    >
        <div onClick={aoClicarEmVerTodasImagens}>
            {"+"+quantidadeDeImagensRestantes}
        </div>
    </div>
}
