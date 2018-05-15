import * as moment from "moment";
import I18n,  {getLanguages} from "react-native-i18n";
import en from "./en";
import fr from "./fr";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

getLanguages().then((languages) => {
return languages.length ? languages[0].split("-")[0] : "";
})
.then((lang) => {
  I18n.locale = lang;
  moment.locale(lang);
});

export default I18n;
