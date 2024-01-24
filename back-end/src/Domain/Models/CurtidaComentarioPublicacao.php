<?php

namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__ . '/../../../vendor/autoload.php';


use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use JsonSerializable;

#[Entity()]
class CurtidaComentarioPublicacao implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class)]
    private Usuario $autor;

    #[ManyToOne(ComentarioPublicacao::class, inversedBy: 'curtidas')]
    private ComentarioPublicacao $comentario;

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor
        ];
    }
}
