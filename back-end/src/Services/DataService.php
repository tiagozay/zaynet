<?php

namespace Tiagozay\BackEnd\Services;

use DateTime;

abstract class DataService
{
    public static function geraDataAtual()
    {
        return new DateTime();
    }
}
