import { IPerson, IDBRecord } from "../interfaces";

export const getUserInfo = (listUserId, dbRecord): IPerson[] => {
  let usersInfo: IPerson[] = [];
  for (let i = 0; i < listUserId.length; i++) {
    let personObj: IPerson = {key: listUserId[i], info: [], updateDate: new Date() };
    dbRecord.filter(data => data.id === listUserId[i]).forEach((obj) => {
      personObj.info.push({ key: obj.name, value: obj.description });
      personObj.updateDate = obj.update_date;
    });
    usersInfo.push(personObj);
  }

  usersInfo.sort((a, b) => {
    return b.updateDate.getTime() - a.updateDate.getTime();
  });

  return usersInfo;
}

export const getListId = (items: IDBRecord[]): number[] => {
  let ids: number[] = [];
  items.forEach((data) => {
    ids.push(data.id);
  });
  ids.sort((a, b) => {
    return a - b;
  });
  let previousId: number = ids[0];
  let listId: number[] = [previousId];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === previousId) {
      continue;
    }
    previousId = ids[i];
    listId.push(previousId);
  }
  return listId;
}

export const processOptionValues = (personId, optionId, description) => {
  let values: string = "";
  let options: any[] = [];
  for (let i = 0; i < optionId.length; i++) {
    if (i === 0) {
      values = values + `(?, ?, ?)`;
    } else {
      values = values + `,(?, ?, ?)`;
    }
    options.push(personId);
    options.push(optionId[i]);
    options.push(description[i]);
  }

  return {
    values,
    options
  };
}

export const formatDate = (date: Date): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
