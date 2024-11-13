import { UserDataInterface } from "./user.interface";

export interface SolicitacoesDataInterface {
  idSolicitacao: number;
  cliente: UserDataInterface;
  contador: UserDataInterface;
  servico: string;
  urgencia: string;
  prazo: Date;
  assunto: string;
  descricao: string;
  status: string;
  dataAbertura: Date;
}

export enum UrgenciaEnum {
  BAIXA = 'Baixa',
  MEDIA = 'Media',
  ALTA = 'Alta',
}

export enum ServicoEnum {
  CONTABIL = 'Contábil',
  FISCAL = 'Fiscal',
  DOCUMENTOS = 'Documentos',
  OUTROS = 'Outros',
}
