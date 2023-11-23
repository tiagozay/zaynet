export class MidiaPublicacaoModel {
    public caminhoMidiaNormal: string;
    public caminhoMidiaMiniatura: string | null;
  
    constructor(caminhoMidiaNormal: string, caminhoMidiaMiniatura: string | null) {
      this.caminhoMidiaNormal = caminhoMidiaNormal;
      this.caminhoMidiaMiniatura = caminhoMidiaMiniatura;
    }
  }