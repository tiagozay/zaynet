import { chownSync } from "fs";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface TypeFeedContext
{
    posicaoFeed: number,
    setPosicaoFeed: React.Dispatch<React.SetStateAction<number>>,
    definePosicaoDoFeed: (posicao: number) => Promise<unknown>;
}

export const FeedContext = createContext<TypeFeedContext>({
    posicaoFeed: 0,
    setPosicaoFeed: () => {},
    definePosicaoDoFeed: (posicao: number) => new Promise(() => {})
}); 

export default function FeedContextProvider({children}: {children: ReactNode}){

    const [posicaoFeed, setPosicaoFeed] = useState<number>(0);

    function definePosicaoDoFeed(posicao: number)
    {
        return new Promise( resolve => {
            setPosicaoFeed(() => {
                resolve(null);
                return posicao;
            });
        });
    }

    return (
        <FeedContext.Provider value={{
            posicaoFeed,
            setPosicaoFeed,
            definePosicaoDoFeed
        }}>
            {children}
        </FeedContext.Provider>
    );
}