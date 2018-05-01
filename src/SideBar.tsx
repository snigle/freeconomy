import * as React from "react"
import {ScrollView, TouchableHighlight, View} from "react-native"
import {List, ListItem, Card, Text} from "react-native-elements"
import DrawerLayout, {DrawerLayoutProperties} from "react-native-drawer-layout"
import {History} from "history"
import {GoogleSync} from "./Sync"
import * as Models from "./Models"

interface Props {
  history : History
}

export default class extends React.Component<Props,any>{
  public drawer : DrawerLayout | null
  constructor(props:Props) {
    super(props);
    this.drawer = null
  }

  openDrawer() {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  }

  render() {
    return <DrawerLayout
  drawerPosition="left"
  drawerBackgroundColor="white"
  drawerWidth={300}
  renderNavigationView={() =>
  <ScrollView>
    <Text style={{textAlign:"center", margin:10, fontSize:18}}>Freeconomy</Text>
    <List containerStyle={{marginTop:0}}>
    <ListItem title="Accueil" onPress={() => this.props.history.replace("/")} />
    <ListItem title="Categories" onPress={() => this.props.history.replace("/CategoriesView")} />
    <ListItem title="Synchronise" onPress={() => GoogleSync() && this.drawer ? this.drawer.closeDrawer() : null } />
    <ListItem title="Logout" onPress={() => Models.SaveLogin({id : "", token : "", expires : new Date()}) && this.drawer ? this.drawer.closeDrawer() : null } />
    </List>
  </ScrollView>
  }
  ref={drawer => {
            return (this.drawer = drawer);
          }}
  >
      {this.props.children}
      </DrawerLayout>
    }
  }
