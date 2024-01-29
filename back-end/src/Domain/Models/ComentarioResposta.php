<?php
namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__.'/../../../vendor/autoload.php';

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\ManyToOne;
use JsonSerializable;

#[Entity()]
class ComentarioResposta extends Comentario implements JsonSerializable
{
    #[ManyToOne(Comentario::class, inversedBy:'respotas')]
    private Comentario $comentarioPublicacao;

    public function __construct(Usuario $autor, string $conteudo )
    {
        $this->autor = $autor;
        $this->conteudo = $conteudo;
        $this->curtidas = new ArrayCollection();
    }

    public function adicionarCurtida(CurtidaComentario $curtida)
    {
        $this->curtidas->add($curtida);
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor,
            'idPublicacao' => $this->comentarioPublicacao->getPublicacao()->getId(),
            'idAutorPublicacao' => $this->comentarioPublicacao->getPublicacao()->getAutor()->getId(),
            'conteudo' => $this->conteudo,
            'curtidas' => $this->curtidas->toArray()
        ];
    }

}
