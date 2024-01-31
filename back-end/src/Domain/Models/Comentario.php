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

    /** @throws DomainException */
    public function __construct(Usuario $autor, Publicacao $publicacao, string $conteudo)
    {
        $this->autor = $autor;
        $this->publicacao = $publicacao;
        $this->setConteudo($conteudo);
        $this->curtidas = new ArrayCollection();
        $this->respostas = new ArrayCollection();
    }

    /** @throws DomainException */
    public function editarComentario(string $novoComentario)
    {
        $this->setConteudo($novoComentario);
    }

    public function adicionarCurtida(CurtidaComentario $curtida)
    {
        $this->curtidas->add($curtida);
    }

    public function adicionarResposta(ComentarioResposta $resposta)
    {
        $this->respostas->add($resposta);
    }

    /** @throws DomainException */
    public function setConteudo(string $conteudo)
    {
        if (strlen(trim($conteudo)) === 0 || strlen(trim($conteudo)) > 5000) {
            throw new \DomainException("Conteúdo comentário inválido");
        }
        $this->conteudo = $conteudo;
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
