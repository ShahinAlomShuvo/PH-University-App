export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  status: number;
  message: string;
  errorSource: TErrorSource;
};
