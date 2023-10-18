import { createContext, useContext } from "react";
import React, { useState } from 'react';

interface TypeCarrosselContext {
    abrir: (imagens: string[], indiceDaImagemParaIniciar: number) => void;
    fechar: () => void;
    carrosselAberto: boolean;
    imagensDoCarrossel: string[];
    indiceImagemAtual: number;
    setIndiceImagemAtual: React.Dispatch<React.SetStateAction<number>>
}

export const CarrosselDeImagensContext = createContext<TypeCarrosselContext>({
    abrir: (imagens: string[], indiceDaImagemParaIniciar: number) => { },
    fechar: () => { },
    carrosselAberto: false,
    imagensDoCarrossel: [],
    indiceImagemAtual: 0,
    setIndiceImagemAtual: () => { }
});

export default function CarrosselDeImagensProvider({ children }: { children: React.JSX.Element[] }) {
    const [carrosselAberto, setCarrosselAberto] = useState(false);
    const [imagensDoCarrossel, setImagensDoCarrossel] = useState<string[]>([]);
    const [indiceImagemAtual, setIndiceImagemAtual] = useState(0);

    function abrir(imagens: string[], indiceParaIniciar: number) {
        setCarrosselAberto(true);
        setImagensDoCarrossel(imagens);
        setIndiceImagemAtual(indiceParaIniciar);
    }

    function fechar() {
        setCarrosselAberto(false);
        setImagensDoCarrossel([]);
        setIndiceImagemAtual(0);
    }

    return (
        <CarrosselDeImagensContext.Provider value={{
            abrir,
            fechar,
            carrosselAberto,
            imagensDoCarrossel,
            indiceImagemAtual,
            setIndiceImagemAtual
        }}>
            {children}
        </CarrosselDeImagensContext.Provider>
    );
}

export const useCarrosselContext = () => {
    return useContext(CarrosselDeImagensContext);
}
