<?php

namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__ . '/../../../vendor/autoload.php';

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use DomainException;
use JsonSerializable;

#[Entity()]
class SolicitacaoDeAmizade implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(targetEntity: Usuario::class, inversedBy: 'solicitacoesDeAmizade')]
    private Usuario $usuario;

    #[ManyToOne(targetEntity: Usuario::class)]
    private Usuario $solicitante;

    /** @throws DomainException */
    public function __construct(Usuario $usuario, Usuario $solicitante)
    {
        if($usuario->getId() === $solicitante->getId()){
            throw new DomainException("Não é possível enviar solicitações para si mesmo");
        }

        if($solicitante->verificaSeEhAmigo($usuario)){
            throw new DomainException("Estes usuários já são amigos");
        }

        $this->usuario = $usuario;
        $this->solicitante = $solicitante;

        if($usuario->verificaSeJaRecebeuSolicitacaoDeAmizade($this)){
            throw new DomainException("Solicitação de amizade já foi enviada");
        }

        $usuario->adicionarSolicitacaoDeAmizade($this);

    }

    public function getAlvo(): Usuario
    {
        return $this->usuario;
    }

    public function getSolicitante(): Usuario
    {
        return $this->solicitante;
    }

    public function toArray(): mixed
    {
        return [
            'id' => $this->id,
            'usuario' => $this->usuario->toArray(),
            'solicitante' => $this->solicitante->toArray(),
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
