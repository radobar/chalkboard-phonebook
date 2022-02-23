export interface ICustomError {
  response: IErrorMessage;
  status: number;
  message: IErrorMessage;
}

export interface IErrorMessage {
  EN: string;
  DETAILS?: string;
}
