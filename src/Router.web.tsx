import * as React from "react"
import { View } from "react-native"
import { BrowserRouter } from 'react-router-dom'
import App from './App'
//@ts-ignore
import {WebStyles} from "carbon-ui"

const Router = <BrowserRouter>
  <View>
  <WebStyles />
  <App/>
  </View>
</BrowserRouter>

export default () => Router;
