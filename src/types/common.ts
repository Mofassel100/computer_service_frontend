export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type IServiceCategory = {
  id: string;
  image: string;
  name: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IAdmin {
  id: string;
  name?: Name;
  imageURL?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  __v: number;
}
export interface IUser {
  id: string;
  name?: Name;
  email: string;
  role: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
  imageURL?: string;
  updatedAt: string;
  __v: number;
}
export interface IService {
  id: string;
  title: string;
  description: string;
  userId: string;
  image?: string;
  categoryId: string;
  address?: string;
  price: number;
  oldPrice: number;
  location: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  review: string;
  rating: string;
  quantity: number | 1;

  __v: number;
}

export interface IBuilding {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}
