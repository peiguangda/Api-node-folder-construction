import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { getUserInfo, getListId } from "../utilities/common";

import { IDBRecord, IUserInfo } from "../interfaces";
import { ENUMOPTION } from "../constants";

export class UserController {

  public async getUsers(req: Request, res: Response) {
    try {
      const pageIndex: number = req.query.pageIndex ? parseInt(req.query.pageIndex) : 1;
      const usersRecord: IDBRecord[] = await new UserModel().getUsers(pageIndex);
      const getTotalRecords = await new UserModel().countUserRecord();
      const listUserId: number[] = getListId(usersRecord);

      let usersInfo: IUserInfo;
      if (usersRecord.length === 0) {
        usersInfo = {
          users: [],
          totalRecord: 0
        }
      } else {
        usersInfo = {
          users: getUserInfo(listUserId, usersRecord),
          totalRecord: getTotalRecords
        }
      }

      res.status(200).send(usersInfo);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async saveUser(req: Request, res: Response) {
    try {
      let resultsUser = await new UserModel().saveUser();
      if (resultsUser.affectedRows === 1) {
        let optionId: number[] = [ENUMOPTION.NAME, ENUMOPTION.AGE, ENUMOPTION.COMMENT];
        let description = [req.body.name, req.body.age, req.body.comment];
        let resultsUserInfo = await new UserModel().saveUserInfo(resultsUser.insertId, optionId, description);
        if (resultsUserInfo.affectedRows === optionId.length) {
          res.status(200).send({
            id: resultsUser.insertId,
            name: req.body.name,
            age: req.body.age,
            comment: req.body.comment
          });
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      let results = await new UserModel().updateUser(parseInt(req.params.id), req.body.age + 1, ENUMOPTION.AGE);
      if (results.affectedRows === 2) {
        res.status(200).send({
          message: 'Update Success',
        });
      }
      if (results.affectedRows === 0) {
        res.status(400).send({
          message: 'Update Fail',
        });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      let results = await new UserModel().deleteUser(parseInt(req.params.id));
      if (results.affectedRows === 1) {
        res.status(200).send({
          message: 'Delete Success',
        });
      }
      if (results.affectedRows === 0) {
        res.status(400).send({
          message: 'Delete Fail',
        });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }

}
