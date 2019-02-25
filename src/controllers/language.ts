import { Request, Response } from "express";
import { LanguageUtility } from "../utilities/language";

export class LanguageController {

  public async getLanguage(req: Request, res: Response) {
    try {
      const languageType = req.query.languageType ? req.query.languageType : "ja"
      let text: any = new LanguageUtility().getTextByLanguageType(languageType);
      return res.status(200).send(text);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}
