export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

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

export interface IDepartment {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IAdmin {
  id: string;
  name?: Name;
  imageURL?:string
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  role: string
  __v: number;
}
export interface IUser {
  id: string;
  name?: Name;
  email: string;
  role: string
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
  imageURL?:string
  updatedAt: string;
  __v: number;
}


export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}







export interface IBuilding {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}


