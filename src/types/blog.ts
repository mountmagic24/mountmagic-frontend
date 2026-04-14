export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  imageUrl?: string;
  imagePublicId?: string;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {}
