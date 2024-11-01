export interface UserTypesInterface {
  id_tipo_usuario: number;
  descricao: string;
}
export interface UserDataInterface {
  id_usuario?: number;
  cnpj?: string;
  email?: string;
  id_tipo_usuario?: number;
  data_criacao?: Date;
  ativo?: boolean;
  nome?: string,
  senha: string;
}
