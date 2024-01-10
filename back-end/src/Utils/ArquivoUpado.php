<?php

namespace Tiagozay\BackEnd\Utils;

class ArquivoUpado
{
    public string $name;
    public string $type;
    public string $size;
    public string $tmp_name;

    public function __construct(string $name, string $type, string $size, string $tmp_name)
    {
        $this->name = $name;
        $this->type = $type;
        $this->size = $size;
        $this->tmp_name = $tmp_name;
    }
}
