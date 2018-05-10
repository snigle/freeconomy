import * as React from "react"
import {ScrollView, TouchableHighlight, View, Button} from "react-native"
import {List, ListItem, Card, Text, Header} from "react-native-elements"
import DrawerLayout, {DrawerLayoutProperties} from "react-native-drawer-layout"
import {History} from "history"
import {GoogleSync} from "./Sync"
import * as Models from "./Models"
//@ts-ignore
import {Overlay} from "react-native-elements"
import { connect } from "react-redux";
import { setLogout } from "./reducer/login";

interface PropsParams {
  history : History
}
interface Props extends PropsParams {
  setLogout : any
}

interface State {
  logout : boolean
}

export class SideBarClass extends React.Component<Props,State>{
  public drawer : DrawerLayout | null
  constructor(props:Props) {
    super(props);
    this.drawer = null
    this.state = {logout : false};
  }

  openDrawer() {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  }

  logout() {
    Models.CleanAll().then(() => this.props.setLogout())
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
    <ListItem title="Reports" onPress={() => this.props.history.replace("/ReportPie")} />
    <ListItem title="Synchronise" onPress={() => GoogleSync() && this.drawer ? this.drawer.closeDrawer() : null } />
    <ListItem title="Logout" onPress={() => this.setState({logout : true}) || (this.drawer ? this.drawer.closeDrawer() : null)} />
    </List>
  </ScrollView>
  }
  ref={drawer => {
            return (this.drawer = drawer);
          }}
  >
      {this.props.children}
      <Overlay isVisible={this.state.logout} containerStyle={{padding:0}}>
        <Header
        outerContainerStyles={{height:60}}
          centerComponent={{ text: 'Are you sure to logout ?', style: { fontSize: 20, color: '#fff' } }}
          rightComponent={{ icon: "close", color : "#fff", onPress:() => this.setState({logout:false})}}
        />
        <Text>Are you sure to logout ? All not synced data will be removed. Be sure to sync all your data before logout.</Text>
        <View style={{flexDirection:"column"}}>
          <Button title="Cancel" onPress={() => this.setState({logout:false})}/>
          <Button title="Logout" onPress={() => this.logout()}/>
        </View>
      </Overlay>
      </DrawerLayout>
    }
  }

  export default connect((state : any, props : PropsParams) : Props => ({
    ...state,
    ...props,
  }), { setLogout : setLogout }, null, {withRef : true})(SideBarClass);
