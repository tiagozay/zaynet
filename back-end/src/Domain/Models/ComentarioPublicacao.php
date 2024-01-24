<?php
namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__.'/../../../vendor/autoload.php';

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use JsonSerializable;

#[Entity()]
class ComentarioPublicacao implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class)]
    private Usuario $autor;

    #[ManyToOne(Publicacao::class, inversedBy:'comentarios')]
    private Publicacao $publicacao;

    #[Column(type: 'text', length:65535)]
    private string $conteudo;

    #[OneToMany(mappedBy: 'comentario', targetEntity: CurtidaComentarioPublicacao::class)]
    private Collection $curtidas;

    #[OneToMany(mappedBy: 'comentario', targetEntity: ComentarioResposta::class)]
    private Collection $respostas;

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor,
            'conteudo' => $this->conteudo,
            'curtidas' => $this->curtidas->toArray(),
            'respostas' => $this->respostas->toArray(),
        ];
    }
}
