export interface IUser {
  _id?: string;
  author?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthdate: string;
  address: {
    street: string;
    neighborhood: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    cep: string;
  };
}
