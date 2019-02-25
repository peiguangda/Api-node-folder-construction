import * as mysql from "mysql";
import { Pool } from "./mysqlConnection";
export class MysqlUtility {

  public executeQuery(query: string, values: any[]): Promise<any> | any {
    let resolvedQuery: string = mysql.format(query, values);
    return new Promise((resolve, reject) => {
      new Pool().createPool().getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
  
        connection.query(resolvedQuery, (errQuery, results) => {
          connection.release();
  
          if (errQuery) {
            return reject(errQuery);
          }
  
          return resolve(results);
        });
      });
    });
  }
}
