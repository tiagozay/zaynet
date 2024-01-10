<?php
class Usuario
{
    private ?int $id;
    private string $nome;
    private string $sobrenome;
    private string $email;
    private string $senha;
    private DateTime $dataDeNascimento;
    private string $genero;
    private string $cidadeNatal;
    private string $cidadeAtual;
    private string $statusDeRelacionamento;
    private ?string $caminhoFotoPerfil;
    private ?string $caminhoFotoCapa;

    public function __construct(
        string $nome,
        string $sobrenome,
        string $email,
        string $senha,
        DateTime $dataDeNascimento,
        string $genero,
        string $cidadeNatal,
        string $cidadeAtual,
        string $statusDeRelacionamento,
        ?ArquivoUpado $fotoPerfil,
        ?ArquivoUpado $fotoCapa,
    ) {
        $this->validaRegrasDeNegocio($nome, $sobrenome, $email, $senha, $dataDeNascimento, $genero, $cidadeNatal, $cidadeAtual, $statusDeRelacionamento, $fotoPerfil, $fotoCapa);

        $this->nome = $nome;
        $this->sobrenome = $sobrenome;
        $this->email = $email;
        $this->senha = $senha;
        $this->dataDeNascimento = $dataDeNascimento;
        $this->genero = $genero;
        $this->cidadeNatal = $cidadeNatal;
        $this->cidadeAtual = $cidadeAtual;
        $this->statusDeRelacionamento = $statusDeRelacionamento;

        if ($fotoPerfil) {
            $this->caminhoFotoPerfil = ImagemService::persisteImagemEGeraNome(
                $fotoPerfil,
                __DIR__ . "\..\..\imagensDinamicas\PerfisUsuarios\\"
            );
        }

        if ($fotoCapa) {
            $this->caminhoFotoCapa = ImagemService::persisteImagemEGeraNome(
                $fotoCapa,
                __DIR__ . "\..\..\imagensDinamicas\CapasUsuarios\\"
            );
        }

    }

    private function validaRegrasDeNegocio(
        string $nome,
        string $sobrenome,
        string $email,
        string $senha,
        DateTime $dataDeNascimento,
        string $genero,
        string $cidadeNatal,
        string $cidadeAtual,
        string $statusDeRelacionamento,
        ?ArquivoUpado $fotoPerfil,
        ?ArquivoUpado $fotoCapa,
    ) {
        if (strlen(trim($nome)) < 3 || strlen($nome) > 80) {
            throw new DomainException("Nome inválido");
        }

        if (strlen(trim($sobrenome)) < 3 || strlen($sobrenome) > 80) {
            throw new DomainException("Sobrenome inválido");
        }

        $expressaoParaEmail = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if (strlen(trim($email)) < 5 || strlen($email) > 240 || !preg_match($expressaoParaEmail, $email)) {
            throw new DomainException("E-mail inválido");
        }

        if (strlen(trim($senha)) < 8 || strlen($senha) > 240) {
            throw new DomainException("Senha inválida");
        }

        $limiteDataNascimentoInferior = new DateTime("1905-01-01");
        $limiteDataNascimentoSuperior = new DateTime("");
        if ($dataDeNascimento < $limiteDataNascimentoInferior || $dataDeNascimento > $limiteDataNascimentoSuperior) {
            throw new DomainException("Data de nascimento inválida");
        }

        if ($genero !== "Feminino" && $genero !== "Masculino") {
            throw new DomainException("Genero inválido");
        }

        if (strlen(trim($cidadeNatal)) < 2 || strlen($cidadeNatal) > 240) {
            throw new DomainException("Cidade natal inválida");
        }

        if (strlen(trim($cidadeAtual)) < 2 || strlen($cidadeAtual) > 240) {
            throw new DomainException("Cidade atual inválida");
        }

        if ($statusDeRelacionamento !== "Solteiro" && $statusDeRelacionamento !== "Namorando" && $statusDeRelacionamento !== "Noivo" && $statusDeRelacionamento !== "Casado" && $statusDeRelacionamento !== "Separado" && $statusDeRelacionamento !== "Viúvo") {
            throw new DomainException("Status de relacionamento inválido");
        }

        $tiposDeImagensPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
        $tamanhoLimiteDeImagem = 10 * 1024 * 1024; // -> 10mb

        if ($fotoPerfil) {
            if (!in_array($fotoPerfil->type, $tiposDeImagensPermitidos) || $fotoPerfil->size > $tamanhoLimiteDeImagem) {
                throw new DomainException("Imagem de perfil inválida");
            }
        }

        if ($fotoCapa) {
            if (!in_array($fotoCapa->type, $tiposDeImagensPermitidos) || $fotoCapa->size > $tamanhoLimiteDeImagem) {
                throw new DomainException("Imagem de capa inválida");
            }
        }
    }
}
