export interface IKeyValue {
  key: string;
  value: string;
}

export interface IPerson {
  key: number;
  info: IKeyValue[];
  updateDate: Date;
}

export interface IDBRecord {
  id: number;
  name: string;
  description: string;
  create_date: Date;
}

export interface IListID {
  id: number;
}

export interface IUserInfo {
  users: IPerson[];
  totalRecord: number;
}

export interface IError {
  status: string;
  error: string | {};
}
