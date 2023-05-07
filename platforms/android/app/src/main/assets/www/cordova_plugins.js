cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-googleplus.GooglePlus",
      "file": "plugins/cordova-plugin-googleplus/www/GooglePlus.js",
      "pluginId": "cordova-plugin-googleplus",
      "clobbers": [
        "window.plugins.googleplus"
      ]
    },
    {
      "id": "cordova-plugin-save-dialog.SaveDialog",
      "file": "plugins/cordova-plugin-save-dialog/www/android/SaveDialog.js",
      "pluginId": "cordova-plugin-save-dialog",
      "clobbers": [
        "cordova.plugins.saveDialog"
      ]
    },
    {
      "id": "cordova-plugin-save-dialog.BlobKeeper",
      "file": "plugins/cordova-plugin-save-dialog/www/android/BlobKeeper.js",
      "pluginId": "cordova-plugin-save-dialog"
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-webpack": "1.0.2",
    "cordova-plugin-googleplus": "8.4.0",
    "cordova-plugin-save-dialog": "2.0.0"
  };
});