import { SolicitacoesDataInterface } from "./solicitacoes.interface";
import { UserDataInterface } from "./user.interface";

export interface AgendaDataInterface {
  idEvento: number;
  usuario: UserDataInterface;
  solicitacao: SolicitacoesDataInterface;
  solicitante: UserDataInterface;
  destinatario: UserDataInterface;
  descricao: string;
  dataEvento: Date;
  tipoEvento: string;
  notificado: boolean;
}
