export const ENUMOPTION: { NAME: number, AGE: number, COMMENT: number } = {
  NAME: 1,
  AGE: 2,
  COMMENT: 3
}

export const TABLEPERSON: { name: string, columns: { [key: string]: string } } = {
  name: "person",
  columns: {
    id: "id",
    deleteFlag: "delete_flag",
    createDate: "create_date",
    createBy: "create_by",
    updateDate: "update_date",
    updateBy: "update_by"
  },
};

export const TABLEINFO: { name: string, columns: { [key: string]: string } } = {
  name: "info",
  columns: {
    id: "id",
    personId: "person_id",
    optionId: "option_id",
    description: "description"
  },
};

export const TABLEOPTION: { name: string, columns: { [key: string]: string } } = {
  name: "option",
  columns: {
    id: "id",
    name: "name"
  },
};
