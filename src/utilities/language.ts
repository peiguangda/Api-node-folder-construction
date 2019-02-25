import * as langages from "../languages/languages.json";

export class LanguageUtility {
  private languages: any;

  constructor(languages = langages) {
    this.languages = languages;
  }

  public getTextByLanguageType(languageType): any {
    for (let key in this.languages) {
      if (key === languageType) {
        return this.languages[languageType];
      }
    }
    languageType = "ja";
    return this.languages[languageType];
  }
}
