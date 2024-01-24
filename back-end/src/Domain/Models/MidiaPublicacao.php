<?php
namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__.'/../../../vendor/autoload.php';

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use JsonSerializable;

#[Entity()]
class MidiaPublicacao implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Publicacao::class, inversedBy:'midiasPublicacao')]
    private Publicacao $publicacao;

    #[Column(length:240)]
    private string $nomeArquivoOriginal;

    #[Column(length:240)]
    private string $nomeMiniatura;

    public function __construct(Publicacao $publicacao, string $nomeArquivoOriginal, string $nomeMiniatura)
    {
        $this->publicacao= $publicacao;
        $this->nomeArquivoOriginal = $nomeArquivoOriginal;
        $this->nomeMiniatura = $nomeMiniatura;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'nomeArquivoOriginal' => $this->nomeArquivoOriginal,
            'nomeMiniatura' => $this->nomeMiniatura,
        ];
    }
   
}
