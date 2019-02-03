import i18n from "i18n-js";
import * as moment from "moment";
import RNLanguages from "react-native-languages";
import en from "./en";
import fr from "./fr";

i18n.locale = RNLanguages.language;
i18n.defaultLocale = "en";
i18n.fallbacks = true;
i18n.translations = { en, fr };

export default i18n;
