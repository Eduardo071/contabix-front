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

export enum UrgenciaEnum {
  BAIXA = '24',
  MEDIA = '48',
  ALTA = '60',
}

export enum ServicoEnum {
  CONTABIL = 'Contábil',
  FISCAL = 'Fiscal',
  DOCUMENTOS = 'Documentos',
  OUTROS = 'Outros',
}
