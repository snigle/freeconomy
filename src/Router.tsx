import * as React from "react"
import {View, Text} from "react-native"
import { NativeRouter, BackButton } from 'react-router-native'
import App from './App'

const Router = <NativeRouter>
  <View style={{flex :1}}>
    <BackButton/>
    <App/>
  </View>
</NativeRouter>

export default () => Router;
