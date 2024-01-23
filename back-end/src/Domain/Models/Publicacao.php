<?php

namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__ . '/../../../vendor/autoload.php';

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use DomainException;
use JsonSerializable;
use Tiagozay\BackEnd\Services\DataService;
use Tiagozay\BackEnd\Services\ImageService;

#[Entity()]
class Publicacao
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    private ?int $id;

    #[ManyToOne(Usuario::class, inversedBy: 'publicacoes')]
    private Usuario $autor;

    #[Column(nullable: true, type: 'text', length: 65535)]
    private ?string $texto;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: MidiaPublicacao::class, cascade:['persist', 'remove'])]
    private Collection $midiasPublicacao;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: ComentarioPublicacao::class)]
    private Collection $comentarios;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: Curtida::class)]
    private Collection $curtidas;

    #[Column()]
    private int $quantidadeDeCompartilhamentos;

    #[Column()]
    private DateTime $dataDePublicação;

    /** @throws DomainException */
    public function __construct(
        Usuario $autor,
        ?string $texto,
        ?array $midiasPublicacao,
    ) {
        $this->validaRegrasDeNegocio(
            $texto,
            $midiasPublicacao
        );

        $this->autor = $autor;
        
        $this->texto = $texto;
        $this->comentarios = new ArrayCollection();
        $this->curtidas = new ArrayCollection();
        $this->quantidadeDeCompartilhamentos = 0;
        $this->dataDePublicação = DataService::geraDataAtual();

        if ($midiasPublicacao) {
            foreach ($midiasPublicacao as $midiaPublicacao) {

                $nomeArquivoOriginal = ImageService::persisteMidiaBinariaPublicacaoEGeraNome(
                    $midiaPublicacao->arquivoOriginal,
                    __DIR__ . "\..\..\..\imagensDinamicas\MidiasPublicacoes\MidiasOriginais\\"
                );

                $nomeMiniatura = ImageService::persisteMidiaBinariaPublicacaoEGeraNome(
                    $midiaPublicacao->miniatura,
                    __DIR__ . "\..\..\..\imagensDinamicas\MidiasPublicacoes\Miniaturas\\"
                );

                $midia = new MidiaPublicacao(
                    $this,
                    $nomeArquivoOriginal,
                    $nomeMiniatura
                );   

                $this->midiasPublicacao = new ArrayCollection();

                $this->midiasPublicacao->add($midia);

            }
        }

        $autor->adicionaPublicacao($this);
    }

    /** @throws DomainException */
    private function validaRegrasDeNegocio(
        ?string $texto,
        ?array $midiasPublicacao
    ) {
        if ($texto !== null && strlen(trim($texto)) > 5000) {
            throw new \DomainException("Texto inválido");
        }

        if ($midiasPublicacao) {
            $tiposDeMidiasPermitidas = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/webm'];
            $tiposDeImagensPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
            $tamanhoLimiteDeMidia = 20 * 1024 * 1024; // -> 20mb (maior pois aceita vídeos também)

            foreach ($midiasPublicacao as $midiaPublicacao) {

                if (
                    !in_array($midiaPublicacao->arquivoOriginal->type, $tiposDeMidiasPermitidas) ||
                    !in_array($midiaPublicacao->miniatura->type, $tiposDeImagensPermitidos)
                ) {
                    throw new DomainException("Tipo de mídia inválido");
                }

                if (
                    $midiaPublicacao->arquivoOriginal->size > $tamanhoLimiteDeMidia ||
                    $midiaPublicacao->miniatura->size > $tamanhoLimiteDeMidia
                ) {
                    throw new DomainException("Tamanho de mídia inválido");
                }
            }
        }
    }
}
