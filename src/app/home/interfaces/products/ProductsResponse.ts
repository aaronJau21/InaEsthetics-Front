export interface IProductsResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  usersId: number;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

export interface Image {
  id: number;
  images: string;
  product_id: number;
}
