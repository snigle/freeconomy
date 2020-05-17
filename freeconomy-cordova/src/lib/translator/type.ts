import _ from "lodash";
import fr from "./fr";

const keys : typeof fr = _.cloneDeep(fr);
  
  // Fill keys with absolute path to get i18n scope. (eg: keys.errors.invalidDate == 'errors.invalidDate')
  function parseKeys(value : {[key:string]: any}, absolutePath: string) {
    _.forEach(value, (v,key )=> {
        const path = absolutePath? `${absolutePath}.${key}` : key;
        if (_.isObject(v)) {
            parseKeys(v, path);
        }
        if (_.isString(v)) {
            value[key] = path;
        }
    })
  }
  parseKeys(keys, "");

  export default keys;
