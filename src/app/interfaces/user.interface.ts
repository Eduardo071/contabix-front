export interface UserTypesInterface {
  idTipoUsuario: number;
  descricao: string;
}
export interface UserDataInterface {
  id_usuario?: number;
  cnpj?: string;
  email?: string;
  idTipoUsuario?: number;
  data_criacao?: Date;
  ativo?: boolean;
  nome?: string,
  senha: string;
}
