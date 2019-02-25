const Ajv = require('ajv');
const ajv = new Ajv();

import { IError } from "../interfaces";

export class ValidateUtility {
  public validatePostUser(schema, data): IError {
    var valid = ajv.validate(schema, data);
    if (!valid) return { status: "error", error: ajv.errors };
    return {
      status: "ok",
      error: "No Error"
    };
  }
}
