export class MidiaPublicacaoModel {
  public id: number | null;
  public caminhoMidiaNormal: string;
  public caminhoMidiaMiniatura: string;

  constructor(id: number | null, caminhoMidiaNormal: string, caminhoMidiaMiniatura: string) {
    this.id = id;
    this.caminhoMidiaNormal = caminhoMidiaNormal;
    this.caminhoMidiaMiniatura = caminhoMidiaMiniatura;
  }
}