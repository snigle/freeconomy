import * as React from "react";
import {Text, View, TextInput} from "react-native"

interface State {
  Name : string,
  Description : string,
}

class AddWalletView extends React.Component<object,State>{
  constructor(props:any){
    super(props)
    this.state = {Name : "", Description : ""};
  }

  changeName(text : string) {
    this.setState({...this.state, Name : text});
  }
  changeDescription(text : string) {
    this.setState({...this.state, Description : text});
  }

  render() {
    return (
      <View>
        <Text>Formulaire</Text>
        <TextInput placeholder="Name" onChangeText={() => this.changeName}/>
        <TextInput placeholder="Description" onChangeText={() => this.changeDescription}/>
      </View>
    )
  }
};

export default AddWalletView;
