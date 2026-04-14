export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServicePayload {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateServicePayload extends Partial<CreateServicePayload> {}
