<?php

namespace Tiagozay\BackEnd\Utils;

class ArquivoPublicacaoOriginalEMiniatura
{
    public ArquivoPublicacao $arquivoOriginal;
    public ArquivoPublicacao $miniatura;

    public function __construct(ArquivoPublicacao $arquivoOriginal, ArquivoPublicacao $miniatura)
    {
        $this->arquivoOriginal = $arquivoOriginal;
        $this->miniatura = $miniatura;
    }
}
