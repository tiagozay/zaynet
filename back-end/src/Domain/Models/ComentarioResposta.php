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
class ComentarioResposta
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class)]
    private Usuario $autor;

    #[ManyToOne(ComentarioPublicacao::class, inversedBy:'respotas')]
    private ComentarioPublicacao $comentarioPublicacao;

    #[Column(type: 'text', length:65535)]
    private string $conteudo;

    #[OneToMany(mappedBy: 'comentario', targetEntity: CurtidaComentarioResposta::class)]
    private Collection $curtidas;

}
