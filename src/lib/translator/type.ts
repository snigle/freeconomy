import _ from "lodash";
import fr from "./fr";
export type custom = string | {custom:boolean};
const keys : typeof fr = _.cloneDeep(fr);
  
  // Fill keys with absolute path to get i18n scope. (eg: keys.errors.invalidDate == 'errors.invalidDate')
  function parseKeys(value : {[key:string]: any}, absolutePath: string) {
    _.forEach(value, (v,key )=> {
        const path = absolutePath? `${absolutePath}.${key}` : key;
        if (_.isString(v) || v.custom) {
            value[key] = path;
        } else if (_.isObject(v)) {
            parseKeys(v, path);
        }
      })
  }
  parseKeys(keys, "");

  export default keys;
