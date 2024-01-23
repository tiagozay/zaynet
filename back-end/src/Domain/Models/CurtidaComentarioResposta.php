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
class CurtidaComentarioResposta 
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class)]
    private Usuario $autor;

    #[ManyToOne(ComentarioResposta::class, inversedBy:'curtidas')]
    private ComentarioResposta $comentario;
   
}
