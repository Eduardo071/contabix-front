export interface SolicitacoesDataInterface {
  idSolicitacao: number;
  idCliente: number;
  idContador: number;
  servico: string;
  urgencia: string;
  prazo: Date;
  assunto: string;
  descricao: string;
  status: string;
  dataAbertura: Date;
}
