import * as React from "react";
import {View, TextInput, Dimensions, ScrollView} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {CategoryInput, IconType} from "./Types"
import {History} from "history"
import {Header, Button, Divider, Icon, Text} from "react-native-elements"
//@ts-ignore
import {ColorWheel} from "react-native-color-wheel"
//@ts-ignore
import * as colorsys from 'colorsys'
//@ts-ignore
import { RaisedButton, TextField} from 'carbon-ui'

interface State extends CategoryInput{
  Loading : boolean,
}

interface Props {
  CategoryUUID? : string,
  history: History,
}

const icons : {name : string, type : IconType}[] = [
  {name : "account-balance-category", type : "material"},
  {name : "attach-money", type : "material"},
  {name : "card-giftcard", type : "material"},
  {name : "card-travel", type : "material"},
  {name : "payment", type : "material"},
  {name : "toll", type : "material"},
  {name : "account-balance", type : "material"},
  // {name : "cc-paypal", type : "material"},
  // {name : "cc-visa", type : "material"},
  // {name : "cc-mastercard", type : "material"},
]
class AddCategoryView extends React.Component<Props,State>{
  constructor(props:Props){
    super(props)
    this.state = {
      Name : "",
      Icon : { Name : "account-balance-category", Color : "#517fa4", Type: "material"},
      Loading : true,
    };
  }

  async componentDidMount() {
    if (this.props.CategoryUUID) {
      Models.GetCategory(this.props.CategoryUUID).then(category => {
        this.setState({...this.state,
        Loading : false,
        Name : category.Name,
        Icon : category.Icon,
      })
      })
    } else {
      return Promise.resolve(this.setState({...this.state, Loading: false}))
    }
  }

  changeName(text : string) {
    this.setState({...this.state, Name : text});
  }
  changeParentCategory(text : string) {
    this.setState({...this.state, ParentCategoryUUID : text});
  }
  changeIconColor(text : string) {

    this.setState({...this.state, Icon : {...this.state.Icon, Color : text}});
  }
  changeIcon({name, type}: {name : string, type : IconType}) {
    this.setState({...this.state, Icon : {...this.state.Icon, Name : name, Type : type}});
  }

  render() {
    let content : JSX.Element= <View><Text>Chargement</Text></View>
    if (!this.state.Loading) {
      content = <ScrollView style={{flex:1}}>
      <TextField placeholder="Name" onChangeText={(v:string) => this.changeName(v)} value={this.state.Name}/>

      <View style={{height:20}} />
      <Text h4>Icon :</Text>
      <View style={{flexDirection:"row"}}>
        <View>
          <ColorWheel
          initialColor={this.state.Icon.Color}
          onColorChange={(color:any) => this.changeIconColor(colorsys.hsv2Hex(color))}
          style={{ marginLeft: 20, padding: 40, height: 100, width: 100, overflow:"visible" }}/>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={{flexDirection:"row", alignContent:"center", alignItems:"center"}}>
          {icons.map(({name, type} : {name : string, type:IconType}) =>
            <Icon onPress={() => this.changeIcon({name,type})} key={name} name={name} type={type} reverse color={this.state.Icon.Color} />
          )}
        </View>
        </ScrollView>
      </View>
      <View style={{height:20}} />

      <View style={{flexDirection:"row"}}>
        <View style={{flex:1}}>
        <Button onPress={() => this.save(true)} text="Save and New"  containerStyle={{margin:5}}  textStyle={{flex:1}}/>
        </View>
        <View style={{flex:1}}>
        <Button onPress={() => this.save()} text="Save" containerStyle={{margin:5}} textStyle={{flex:1}} />
        </View>
      </View>
      </ScrollView>
    }
    return (
      <View style={{flex:1}}>
        <Header
        outerContainerStyles={{height:60}}
          leftComponent={{ icon: 'navigate-before', color: '#fff', onPress:() => this.props.history.replace("/") }}
          centerComponent={{ text: 'Add Category', style: { fontSize: 20, color: '#fff' } }}
        />
        {
          content
        }
      </View>
    )
  }

  save(reload : boolean = false) {
    this.setState({...this.state, Loading : true })
    let savePromise : Promise<any>;
    if(this.props.CategoryUUID) {
      savePromise = Models.UpdateCategory(this.props.CategoryUUID, this.state)
    } else {
      savePromise = Models.CreateCategory(this.state)
    }
    savePromise.then(() => {
      if (reload) {
        this.props.history.replace("/");
        this.props.history.replace("/AddCategoryView");
      } else {
        this.props.history.replace("/CategoriesView");
      }
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddCategoryView;
