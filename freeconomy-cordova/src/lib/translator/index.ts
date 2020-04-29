import I18n from "i18n-js";
import * as moment from "moment";
import en from "./en";
import fr from "./fr";
import keys from "./type";

I18n.defaultLocale = "en";
I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

const lang = navigator.language;
I18n.locale = lang;
moment.locale(lang);

export default I18n;

const $t = (scope: I18n.Scope, options?: I18n.TranslateOptions) => I18n.t(scope, options);
$t.keys = keys;
export const TranslatePlugin = {
  install : (Vue:any, options:any) => {
    Vue.prototype.$t = $t
  }
}

declare module 'vue/types/vue' {
  // 3. Déclarez l'augmentation pour Vue
  interface Vue {
    $t: typeof $t;
  }
}
