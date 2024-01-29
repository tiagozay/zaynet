<?php
namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__.'/../../../vendor/autoload.php';

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use JsonSerializable;

#[Entity()]
#[InheritanceType('SINGLE_TABLE')]
#[DiscriminatorColumn(name: 'discr', type: 'string')]
#[DiscriminatorMap(['comentario_publicacao' => Comentario::class, 'comentario_resposta' => ComentarioResposta::class])]
class Comentario implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    protected ?int $id;

    #[ManyToOne(Usuario::class)]
    protected Usuario $autor;

    #[ManyToOne(Publicacao::class, inversedBy:'comentarios')]
    private Publicacao $publicacao;

    #[Column(type: 'text', length:65535)]
    protected string $conteudo;

    #[OneToMany(mappedBy:'comentario', targetEntity: CurtidaComentario::class, cascade: ['persist', 'remove'])]
    protected Collection $curtidas;

    #[OneToMany(mappedBy: 'comentarioPublicacao', targetEntity: ComentarioResposta::class)]
    private Collection $respostas;

    public function __construct(Usuario $autor, Publicacao $publicacao, string $conteudo)
    {
        $this->autor = $autor;
        $this->publicacao = $publicacao;
        $this->conteudo = $conteudo;
        $this->curtidas = new ArrayCollection();
        $this->respostas = new ArrayCollection();
    }

    public function adicionarCurtida(CurtidaComentario $curtida)
    {
        $this->curtidas->add($curtida);
    }

    public function adicionarResposta(ComentarioResposta $resposta)
    {
        $this->respostas->add($resposta);
    }

    public function getAutor(): Usuario
    {
        return $this->autor;
    }

    public function getPublicacao(): Publicacao
    {
        return $this->publicacao;
    } 

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor,
            'idPublicacao' => $this->publicacao->getId(),
            'idAutorPublicacao' => $this->publicacao->getAutor()->getId(),
            'conteudo' => $this->conteudo,
            'curtidas' => $this->curtidas->toArray(),
            'respostas' => $this->respostas->toArray(),
        ];
    }
}
