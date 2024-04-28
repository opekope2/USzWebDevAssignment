import { englishTranslation } from "./en";
import { hungarianTranslation } from "./hu";

const translations: { [key: string]: { [key: string]: string } } = {
    en: englishTranslation,
    hu: hungarianTranslation,
}

export function findTranslation(languages: readonly string[]): { [key: string]: string } {
    for (const language of languages) {
        if (language in translations) {
            return translations[language];
        }
    }

    return translations["en"];
}
