import I18n from "i18n-js";
import * as moment from "moment";
import en from "./en";
import fr from "./fr";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

const lang = navigator.language;
I18n.locale = lang;
moment.locale(lang);

export default I18n;
