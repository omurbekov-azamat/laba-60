export interface NewMessage {
  name: string;
  message: string;
}

export interface Data{
  [key:string]: string;
  _id: string,
  message: string,
  author: string,
  datetime: string,
}