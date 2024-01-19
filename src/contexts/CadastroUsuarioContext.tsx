import React, { ReactNode, createContext, useState } from "react";

interface TypeCadastroUsuarioContext {
    indicadorCadastroUsuarioAberto: boolean,
    setIndicadorCadastroUsuarioAberto: React.Dispatch<React.SetStateAction<boolean>>,
    fasesDoCadastroConcluidas: 0 | 1 | 2,
    setFasesDoCadastroConcluidas: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    mensagemDeErroCadastro: string,
    setMensagemDeErroCadastro: React.Dispatch<React.SetStateAction<string>>,
    zerarIndicadoresDeCadastro: Function,
    nome: string,
    setNome: React.Dispatch<React.SetStateAction<string>>,
    sobrenome: string,
    setSobrenome: React.Dispatch<React.SetStateAction<string>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    senha: string,
    setSenha: React.Dispatch<React.SetStateAction<string>>,
    dataDeNascimento: string,
    setDataDeNascimento: React.Dispatch<React.SetStateAction<string>>,
    genero: "Feminino" | "Masculino" | "",
    setGenero: React.Dispatch<React.SetStateAction<"Feminino" | "Masculino" | "">>,
    cidadeNatal: string,
    setCidadeNatal: React.Dispatch<React.SetStateAction<string>>,
    cidadeAtual: string,
    setCidadeAtual: React.Dispatch<React.SetStateAction<string>>,
    statusDeRelacionamento: string,
    setStatusDeRelacionamento: React.Dispatch<React.SetStateAction<string>>,
    fotoDoPerfil: File | null,
    setFotoDoPerfil: React.Dispatch<React.SetStateAction<File | null>>,
    fotoDaCapa: File | null,
    setFotoDaCapa: React.Dispatch<React.SetStateAction<File | null>>,

}

export const CadastroUsuarioContext = createContext<TypeCadastroUsuarioContext>({
    indicadorCadastroUsuarioAberto: false,
    setIndicadorCadastroUsuarioAberto: () => { },
    fasesDoCadastroConcluidas: 0,
    setFasesDoCadastroConcluidas: () => { },
    mensagemDeErroCadastro: "",
    setMensagemDeErroCadastro: () => { },
    zerarIndicadoresDeCadastro: () => {},
    nome: "",
    setNome: () => { },
    sobrenome: "",
    setSobrenome: () => { },
    email: "",
    setEmail: () => { },
    senha: "",
    setSenha: () => { },
    dataDeNascimento: "",
    setDataDeNascimento: () => { },
    genero: "",
    setGenero: () => { },
    cidadeNatal: "",
    setCidadeNatal: () => { },
    cidadeAtual: "",
    setCidadeAtual: () => { },
    statusDeRelacionamento: "",
    setStatusDeRelacionamento: () => { },
    fotoDoPerfil: null,
    setFotoDoPerfil: () => { },
    fotoDaCapa: null,
    setFotoDaCapa: () => { },
});

export default function CadastroUsuarioProvider({ children }: { children: ReactNode }) {
    const [
        indicadorCadastroUsuarioAberto,
        setIndicadorCadastroUsuarioAberto
    ] = useState(false);

    const [fasesDoCadastroConcluidas, setFasesDoCadastroConcluidas] = useState<0 | 1 | 2>(0);

    const [
        mensagemDeErroCadastro,
        setMensagemDeErroCadastro
    ] = useState("");

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [genero, setGenero] = useState<"Feminino" | "Masculino" | "">("");
    const [cidadeNatal, setCidadeNatal] = useState("");
    const [cidadeAtual, setCidadeAtual] = useState("");
    const [statusDeRelacionamento, setStatusDeRelacionamento] = useState("");
    const [fotoDoPerfil, setFotoDoPerfil] = useState<File | null>(null);
    const [fotoDaCapa, setFotoDaCapa] = useState<File | null>(null);

    function zerarIndicadoresDeCadastro()
    {
        setIndicadorCadastroUsuarioAberto(false);
        setFasesDoCadastroConcluidas(0);

        setNome("");
        setSobrenome("");
        setEmail("");
        setSenha("");
        setDataDeNascimento("");
        setGenero("");
        setCidadeNatal("");
        setCidadeAtual("");
        setStatusDeRelacionamento("");
        setFotoDoPerfil(null);
        setFotoDaCapa(null);
    }

    return (
        <CadastroUsuarioContext.Provider value={{
            indicadorCadastroUsuarioAberto,
            setIndicadorCadastroUsuarioAberto,
            fasesDoCadastroConcluidas,
            setFasesDoCadastroConcluidas,
            mensagemDeErroCadastro,
            setMensagemDeErroCadastro,
            zerarIndicadoresDeCadastro,
            nome,
            setNome,
            sobrenome,
            setSobrenome,
            email,
            setEmail,
            senha,
            setSenha,
            dataDeNascimento,
            setDataDeNascimento,
            genero,
            setGenero,
            cidadeNatal,
            setCidadeNatal,
            cidadeAtual,
            setCidadeAtual,
            statusDeRelacionamento,
            setStatusDeRelacionamento,
            fotoDoPerfil,
            setFotoDoPerfil,
            fotoDaCapa,
            setFotoDaCapa,
        }}>
            {children}
        </CadastroUsuarioContext.Provider>
    );
}