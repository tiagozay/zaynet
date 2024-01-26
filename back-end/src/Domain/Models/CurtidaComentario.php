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
class CurtidaComentario implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class)]
    private Usuario $autor;

    #[ManyToOne(Comentario::class, inversedBy: 'curtidas')]
    private Comentario $comentario;

    public function __construct(Usuario $autor)
    {
        $this->autor = $autor;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor
        ];
    }
}
