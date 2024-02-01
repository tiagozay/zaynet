<?php

namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__ . '/../../../vendor/autoload.php';

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\ManyToOne;
use DomainException;
use JsonSerializable;
use Tiagozay\BackEnd\Services\DataService;

#[Entity()]
class PublicacaoCompartilhada extends Publicacao implements JsonSerializable
{

    #[ManyToOne(targetEntity: Publicacao::class)]
    private Publicacao $publicacao;

    /** @throws DomainException */
    public function __construct(
        Usuario $autor,
        Publicacao $publicacao,
        ?string $texto,
    ) {
        $this->validaRegrasDeNegocio(
            $texto,
        );

        $this->autor = $autor;
        $this->publicacao = $publicacao;
        
        $this->texto = $texto;
        $this->comentarios = new ArrayCollection();
        $this->curtidas = new ArrayCollection();
        $this->dataDePublicacao = DataService::geraDataAtual();

        $autor->adicionaPublicacao($this);
    }

    /** @throws DomainException */
    private function validaRegrasDeNegocio(
        ?string $texto,
    ) {
        if ($texto !== null && strlen(trim($texto)) > 5000) {
            throw new \DomainException("Texto inválido");
        }
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor,
            'indicadorEhUmaPublicacaoCompartilhada' => true,
            'publicacao' => $this->publicacao,
            'texto' => $this->texto,
            'midiasPublicacao' => null,
            'comentarios' => $this->comentarios->toArray(),
            'curtidas' => $this->curtidas->toArray(),
            'quantidadeDeCompartilhamentos' => null,
            'dataDePublicacao' => DataService::formataDataParaString($this->dataDePublicacao)
        ];
    }
}
