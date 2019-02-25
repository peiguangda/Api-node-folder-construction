import { MysqlUtility } from "../utilities/mysql";
import { TABLEPERSON, TABLEINFO, TABLEOPTION } from "../constants";
import { processOptionValues, formatDate } from "../utilities/common";

import { IDBRecord } from "../interfaces";

export class UserModel {
  private mysqlUtility: MysqlUtility;

  constructor() {
    this.mysqlUtility = new MysqlUtility();
  }

  public async getUsers(pageIndex: number): Promise<IDBRecord[]> {
    let optionLength = 3;
    if (pageIndex < 1) pageIndex = 1;
    let limit: number = parseInt(process.env.LIMIT) * pageIndex * optionLength;
    let offset: number = 0;

    let users: IDBRecord[] = await this.mysqlUtility.executeQuery(`
      SELECT
        ${TABLEPERSON.name}.${TABLEPERSON.columns.id},
        ${"`"}${TABLEOPTION.name}${"`"}.${TABLEOPTION.columns.name},
        ${TABLEINFO.name}.${TABLEINFO.columns.description},
        ${TABLEPERSON.name}.${TABLEPERSON.columns.updateDate}
      FROM ${TABLEPERSON.name}
      INNER JOIN ${TABLEINFO.name}
        ON ${TABLEPERSON.name}.${TABLEPERSON.columns.id} = ${TABLEINFO.name}.${TABLEINFO.columns.personId}
      INNER JOIN ${"`"}${TABLEOPTION.name}${"`"}
        ON ${TABLEINFO.name}.${TABLEINFO.columns.optionId} = ${"`"}${TABLEOPTION.name}${"`"}.${TABLEOPTION.columns.id}
      WHERE
        (${TABLEPERSON.columns.deleteFlag} = ${process.env.DELETED_FLAG} OR ${TABLEPERSON.columns.deleteFlag} is null)
        AND ${"`"}${TABLEOPTION.name}${"`"}.${TABLEOPTION.columns.id} IN (1, 2, 3)
      ORDER BY
        ${TABLEPERSON.columns.updateDate} DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `, []);
    return users;
  }

  public async saveUser() {
    let date = new Date();
    let dummyData = {
      createDate: date,
      createBy: 1,
      updateDate: date,
      updateBy: 1
    }
    const results = await this.mysqlUtility.executeQuery(`
      INSERT INTO ${TABLEPERSON.name}(
        ${TABLEPERSON.columns.createDate},
        ${TABLEPERSON.columns.createBy},
        ${TABLEPERSON.columns.updateDate},
        ${TABLEPERSON.columns.updateBy}
      )
      VALUES(?, ?, ?, ?)
    `, [dummyData.createDate, dummyData.createBy, dummyData.updateDate, dummyData.updateBy]);
    return results;
  }

  public async saveUserInfo(personId, optionId, description) {
    let valuesAndOptions = processOptionValues(personId, optionId, description);
    let values =  valuesAndOptions.values;
    let options =  valuesAndOptions.options;
    const results = await this.mysqlUtility.executeQuery(`
      INSERT INTO ${TABLEINFO.name}(
        ${TABLEINFO.columns.personId},
        ${TABLEINFO.columns.optionId},
        ${TABLEINFO.columns.description}
      )
      VALUES ${values}
    `, options);
    return results;
  }

  public async updateUser(id: number, age: number, optionId) {
    let date = formatDate(new Date());
    const results = await this.mysqlUtility.executeQuery(`
      UPDATE ${TABLEINFO.name}
      INNER JOIN ${TABLEPERSON.name}
      ON ${TABLEPERSON.name}.${TABLEPERSON.columns.id} = ${TABLEINFO.name}.${TABLEINFO.columns.personId}
      SET ${TABLEINFO.name}.${TABLEINFO.columns.description} = ?, ${TABLEPERSON.name}.${TABLEPERSON.columns.updateDate} = "${date}"
      WHERE ${TABLEINFO.name}.${TABLEINFO.columns.personId} = ?
        AND ${TABLEINFO.name}.${TABLEINFO.columns.optionId} = ?
        AND ${TABLEINFO.name}.${TABLEINFO.columns.description} = ${age - 1}
        AND (${TABLEPERSON.name}.${TABLEPERSON.columns.deleteFlag} is NULL OR ${TABLEPERSON.name}.${TABLEPERSON.columns.deleteFlag} = 0)
    `, [age, id, optionId]);
    return results;
  }

  public async deleteUser(id: number) {
    const results = await this.mysqlUtility.executeQuery(`
      UPDATE ${TABLEPERSON.name}
      SET ${TABLEPERSON.columns.deleteFlag} = ?
      WHERE ${TABLEPERSON.columns.id} = ?
        AND (${TABLEPERSON.name}.${TABLEPERSON.columns.deleteFlag} is NULL OR ${TABLEPERSON.name}.${TABLEPERSON.columns.deleteFlag} = 0)
    `, [1, id]);
    return results;
  }

  public async countUserRecord(): Promise<number> {

    let numberOfRecords = await this.mysqlUtility.executeQuery(`
      SELECT 
        count(*) as totalRecord  
      FROM ${TABLEPERSON.name}
      WHERE
        (${TABLEPERSON.columns.deleteFlag} = ${process.env.DELETED_FLAG} OR ${TABLEPERSON.columns.deleteFlag} is null)
    `, []);
    return numberOfRecords[0].totalRecord;
  }

}
