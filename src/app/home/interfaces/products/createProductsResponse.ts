export interface ICreateProductsResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  usersId: number;
  created_at: Date;
  updated_at: Date;
}
