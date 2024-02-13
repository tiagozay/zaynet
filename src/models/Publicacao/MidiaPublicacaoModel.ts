export class MidiaPublicacaoModel {
  public id: number;
  public caminhoMidiaNormal: string;
  public caminhoMidiaMiniatura: string;

  constructor(id: number, caminhoMidiaNormal: string, caminhoMidiaMiniatura: string) {
    this.id = id;
    this.caminhoMidiaNormal = caminhoMidiaNormal;
    this.caminhoMidiaMiniatura = caminhoMidiaMiniatura;
  }
}