import React, { ReactNode, createContext, useState } from "react";

interface TypePublicarContext {
    indicadorModalPublicarAberto: boolean,
    setIndicadorModalPublicarAberto: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PublicarContext = createContext<TypePublicarContext>({
    indicadorModalPublicarAberto: false,
    setIndicadorModalPublicarAberto: () => { },
});

export default function PublicarContextProvider({ children }: { children: ReactNode }) {

    const [indicadorModalPublicarAberto, setIndicadorModalPublicarAberto] = useState(false);

    return (
        <PublicarContext.Provider value={{
            indicadorModalPublicarAberto,
            setIndicadorModalPublicarAberto
        }}>
            {children}
        </PublicarContext.Provider>
    );
}