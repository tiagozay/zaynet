<?php

namespace Tiagozay\BackEnd\Utils;

class ArquivoPublicacao
{
    public string $type;
    public string $size;
    public string $fileBase64;
    public string $fileDecodificado;

    public function __construct(string $file)
    {
        $this->fileBase64 = $file;
        $this->fileDecodificado = base64_decode(explode(',', $file)[1]);

        preg_match('/^data:(.*?);base64,/', $file, $matches);

        $this->type = $matches[1];
        $this->size = strlen($this->fileDecodificado);
    }
}
