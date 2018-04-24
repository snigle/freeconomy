import * as React from "react"
import * as Models from "./Models"
import {Category, displayPrice} from "./Types"
import Loading from "./Loading"
import WalletListItem from "./WalletListItem"
import AddWalletView from "./AddWalletView"
import {View, Button, Text, ScrollView, FlatList} from "react-native"
import {History} from "history"
import {MyLink} from "./Link"
import {GoogleSync} from "./Sync"
import * as _ from "lodash"
import {Header, Divider, Card, Icon} from "react-native-elements"
import MoreActions from "./MoreActions"
import SideBar from "./SideBar"
import CategoryListItem from "./CategoryListItem"

interface State {
  Categories : Category[],
  displayOptions : boolean
}

interface Props {
  history : History
}

class CategoriesView extends React.Component<Props,State>{
  public sidebar : SideBar | null

  constructor(props: Props) {
    super(props)
    this.state = { Categories : [], displayOptions : false}
    this.sidebar = null
  }

  componentDidMount() {
    Models.GetCategories().then(categories => this.setState({ Categories : categories}))
    .catch(() => console.log("fail to load categories, need to reset ?"))
  }

  render() {
    let content: JSX.Element[] | JSX.Element
    let options : JSX.Element = <View></View>
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        {title : "Add Category", onPress : () => this.props.history.push("/AddWalletView")},
        {title: "Back", onPress : () => this.props.history.replace("/")},
      ]} />
    }
    if (!this.state.Categories) {
     content = <Loading Message="Chargement des categories" />;
   } else {

      content = this.state.Categories.map((category) =>
              <View key={category.UUID}>
              <CategoryListItem Category={category} Categories={this.state.Categories} history={this.props.history}/>
              <Divider />
              </View>
           )

   }

    return <SideBar history={this.props.history} ref={(sidebar: SideBar) => this.sidebar = sidebar}>
    <View style={{flex:1}}>
    <Header
    outerContainerStyles={{height:60}}
      leftComponent={{ icon: 'menu', color: '#fff', onPress : () => this.sidebar && this.sidebar.openDrawer() }}
      centerComponent={{ text: 'Categories', style: { fontSize: 20, color: '#fff' } }}
      rightComponent={{ icon:this.state.displayOptions ? "expand-less" : "more-vert", color : "#fff", onPress:() => this.setState({...this.state, displayOptions : !this.state.displayOptions})}}
    />
    <View style={{flex:1}}>
    {options}
    <ScrollView >
    {content}
    <View style={{height:100}}/>
    </ScrollView>
    <Icon
      raised
      containerStyle={{position:"absolute", right:20,bottom:20}}
      name='add'
      color='#517fa4'
      onPress={() => this.props.history.push("/AddCategoryView")} />
      </View>
    </View>
    </SideBar>
  }

}

export default CategoriesView;
