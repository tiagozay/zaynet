export class MidiaPublicacaoModel {
    public caminhoMidiaNormal: string;
    public caminhoMidiaMiniatura: string;
  
    constructor(caminhoMidiaNormal: string, caminhoMidiaMiniatura: string) {
      this.caminhoMidiaNormal = caminhoMidiaNormal;
      this.caminhoMidiaMiniatura = caminhoMidiaMiniatura;
    }
  }