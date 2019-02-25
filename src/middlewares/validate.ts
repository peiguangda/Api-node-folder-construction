import { Request, Response, NextFunction } from "express";
import { ValidateUtility } from "../utilities/validate";
import * as userSchema from "../schemas/userSchema.json";

import { IError } from "../interfaces";

export const validatePostUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid: IError = new ValidateUtility().validatePostUser(userSchema, req.body);
    if (valid.status === "error") {
      res.status(400).send(valid.error);
    } else {
      next();
    }
  } catch (err) {
    res.status(400).send(err);
  }
}
