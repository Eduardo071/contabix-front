export interface UserTypesInterface {
  idTipoUsuario: number;
  descricao: string;
}
export interface UserDataInterface {
  id_usuario?: number;
  cnpj?: string;
  email?: string;
  tipoUsuario?: UserTypesInterface;
  data_criacao?: Date;
  ativo?: boolean;
  nome?: string,
  senha: string;
}
