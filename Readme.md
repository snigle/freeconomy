# Freeconomy
Web / Android application to track daily bank/wallet operations.
You can try it here : https://snigle.github.io/freeconomy/

## Contributing
### Dependencies

    sudo apt-get install build-essential
    yarn

You can ignore node-sass issue when running yarn.

### Credentials

Add config file :

    cat platforms/android/release-signing.properties 
    # location of keystore
    storeFile=./my-release-key.jks
    # Key alias
    keyAlias=freeconomy
    # Store password
    storePassword=xxxxxxxxx
    # Key password
    keyPassword=xxxxxxxx

### How to install cordova plugin

    yarn add cordova-plugin-name
    yarn cordova plugin add cordova-plugin-name
    rm package-lock.json