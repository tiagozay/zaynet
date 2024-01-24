<?php

namespace Tiagozay\BackEnd\Services;

use DateTime;

abstract class DataService
{
    public static function geraDataAtual()
    {
        return new DateTime();
    }

    public static function formataDataParaString(DateTime $dataHora): string
    {
        $meses = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        $dia = $dataHora->format('j');
        $mes = $meses[(int)$dataHora->format('n') - 1];
        $ano = $dataHora->format('Y');
        $hora = $dataHora->format('H:i');

        return "{$dia} de {$mes} de {$ano} às {$hora}";
    }
}
