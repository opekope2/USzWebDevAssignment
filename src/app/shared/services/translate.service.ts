import { Injectable } from '@angular/core';
import { findTranslation } from '../translations/translations';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor() { }

  translate(key: string): string {
    const translation = findTranslation(navigator.languages);
    return translation[key] || `Untranslated (${key})`;
  }
}
