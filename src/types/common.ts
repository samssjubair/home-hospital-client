import { string } from "yup";

export interface IMeta{
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
  name: Name;
  gender: string;
  managementDepartment: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth: string;
  bloodGroup: string;
  designation: string;
  presentAddress: string;
  permanentAddress: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// home hospital
export interface IService {
  id: string;
  title: string;
  department: string | null;
  subCategory: string;
  imageUrl: string | null;
  description: string;
  organization: string;
  serviceArea: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  reviews: any[] ;
} 

export interface ICategory {
  id: string;
  title: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FAQItem {
  id: string;
  title: string;
  content: string;
}

export interface ICMSBlogPost {
  id: string;
  contentType: string;
  imageUrl: string | null;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITestimonial 
  {
      id: string,
      userId: string,
      feedback: string,
      createdAt: string,
      updatedAt: string,
      user: any
    
}

export interface IReview {
  id: string;
  userId: string;
  serviceId: string;
  bookingId: string | null;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: any;
}

export default IReview;
