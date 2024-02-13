<?php

namespace Tiagozay\BackEnd\Domain\Models;

require_once __DIR__ . '/../../../vendor/autoload.php';

use DateTime;
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
use DomainException;
use JsonSerializable;
use Tiagozay\BackEnd\Services\DataService;
use Tiagozay\BackEnd\Services\ImageService;

#[Entity()]
#[InheritanceType('SINGLE_TABLE')]
#[DiscriminatorColumn(name: 'discr', type: 'string')]
#[DiscriminatorMap(['publicacao_normal' => Publicacao::class, 'publicacao_compartilhada' => PublicacaoCompartilhada::class])]
class Publicacao implements JsonSerializable
{
    #[Id]
    #[GeneratedValue()]
    #[Column()]
    protected ?int $id;

    #[ManyToOne(Usuario::class, inversedBy: 'publicacoes')]
    protected Usuario $autor;

    #[Column(nullable: true, type: 'text', length: 65535)]
    protected ?string $texto;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: MidiaPublicacao::class, cascade: ['persist', 'remove'])]
    private Collection $midiasPublicacao;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: Comentario::class, cascade: ['persist', 'remove'])]
    protected Collection $comentarios;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: Curtida::class, cascade: ['persist', 'remove'])]
    protected Collection $curtidas;

    #[OneToMany(mappedBy: 'publicacao', targetEntity: PublicacaoCompartilhada::class)]
    private Collection $compartilhamentos;

    #[Column()]
    protected DateTime $dataDePublicacao;

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
        $this->compartilhamentos = new ArrayCollection();
        $this->dataDePublicacao = DataService::geraDataAtual();
        $this->midiasPublicacao = new ArrayCollection();

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

                $this->midiasPublicacao->add($midia);
            }
        }

        $autor->adicionaPublicacao($this);
    }

    /** @throws DomainException */
    public function editar(
        ?string $texto,
        ?array $novasMidias,
        ?array $midiasParaExcluir
    ){
        $this->validaRegrasDeNegocio($texto, $novasMidias);

        $this->texto = $texto;

        if ($novasMidias) {
            foreach ($novasMidias as $midiaPublicacao) {

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

                $this->midiasPublicacao->add($midia);
            }
        }

        if ($midiasParaExcluir) {
            foreach ($midiasParaExcluir as $midiaParaExcluir) {

                ImageService::removeImagemDoDiretorio(
                    __DIR__ . "\..\..\..\imagensDinamicas\MidiasPublicacoes\MidiasOriginais\\".$midiaParaExcluir->getNomeArquivoOriginal()
                );

                ImageService::removeImagemDoDiretorio(
                    __DIR__ . "\..\..\..\imagensDinamicas\MidiasPublicacoes\Miniaturas\\".$midiaParaExcluir->getNomeMiniatura()
                );

            }
        }

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

    public function getId(): int
    {
        return $this->id;
    }

    public function getAutor(): Usuario
    {
        return $this->autor;
    }

    public function getComentarios(): array
    {
        return $this->comentarios->toArray();
    }

    public function adicionarComentario(Comentario $comentario)
    {
        $this->comentarios->add($comentario);
    }

    public function adicionarCurtida(Curtida $curtida)
    {
        $this->curtidas->add($curtida);
    }

    public function adicionarCompartilhamento(PublicacaoCompartilhada $publicacaoCompartilhada)
    {
        $this->compartilhamentos->add($publicacaoCompartilhada);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'autor' => $this->autor,
            'texto' => $this->texto,
            'midiasPublicacao' => $this->midiasPublicacao->toArray(),
            'comentarios' => $this->comentarios->toArray(),
            'curtidas' => $this->curtidas->toArray(),
            'quantidadeDeCompartilhamentos' => $this->compartilhamentos->count(),
            'dataDePublicacao' => DataService::formataDataParaString($this->dataDePublicacao)
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
