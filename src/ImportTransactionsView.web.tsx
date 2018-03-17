import * as React from "react"
import {Text, View, AsyncStorage, TextInput, Button} from "react-native"
import {RouteProps, RouterProps, RouteComponentProps} from "react-router"
import * as queryString from "querystring"
import * as Papa from "papaparse"
import * as Models from "./Models"
import {Transaction, Category} from "./Types"
import {v4} from "uuid"
import TransactionListItem from "./TransactionListItem"
import {History} from "history"
//@ts-ignore
import {DataTable, AppBar} from "carbon-ui"
interface Props extends RouteProps{
  history : History
}

interface State {
  WalletUUID : string,
  Lines : string[][],

  // Computed
  CategoriesToImport : Category[],
  TransactionsToImport : Transaction[],

  // Inputs
  CategoryName : string,
  Beneficiary : string,
  Date : string,
  Price : string,
  Comment : string,
}

const keys : Keys[] = ["CategoryName" , "Beneficiary" , "Date" , "Price" , "Comment"]
const mandatory : Keys[]= ["Beneficiary", "CategoryName", "Date", "Price"]
type Keys = "CategoryName" | "Beneficiary" | "Date" | "Price" | "Comment"
export default class extends React.Component<RouteComponentProps<any>,State> {
  constructor(props : RouteComponentProps<any>) {
    super(props)
    console.log("props", props);
    if (props.location) {
      const toto = queryString.parse(props.location.search.replace("?",""))
      this.state = {
        WalletUUID : Array.isArray(toto.walletUUID) ? toto.walletUUID[0] : toto.walletUUID,
        Lines : [],
        CategoryName : "",
        Beneficiary : "",
        Date : "",
        Price : "",
        Comment : "",
        CategoriesToImport : [],
        TransactionsToImport : [],
        }
    } else {
      this.state = {
        WalletUUID : "",
        Lines : [],
        CategoryName : "",
        Beneficiary : "",
        Date : "",
        Price : "",
        Comment : "",
        CategoriesToImport : [],
        TransactionsToImport : [],
        }
    }
  }

  async componentDidMount() {
    AsyncStorage.getItem("csv").then(result => this.handleCSVContent(result))
  }

  bindInput(key : Keys, value : string) {
    const state = {...this.state};
    const number = parseInt(value);
    if (!this.state.Lines[0]) {
      return
    }
    // Nombre entre 1 et n : ok
    if (number >= 0 && number < this.state.Lines[0].length) {
      state[key] = ""+number;
    }
    // Vide => vide
    if (value === "") {
      state[key] = "";
    }
    this.setState(state);
  }

  render() {
    let content : JSX.Element;

    if (this.state.TransactionsToImport.length) {
      content = (
        <View>
        <Text> Voulez vous importer toutes ces transactions ? </Text>
        {this.state.TransactionsToImport.map(t =>
          <TransactionListItem key={t.UUID} Transaction={t} history={this.props.history} Currency={{Code : "EUR", Symbol : "€"}}/>
        )}
        </View>
      )
    } else if (this.state.Lines.length) {
      content = (
        <View>
          <Text>Associate importation fields with a column number of your CSV</Text>
          <View>
          {keys.map(k => (
            <View style={{flexDirection : "row"}}>
              <Text>{k} : </Text>
            <TextInput keyboardType="numeric" key={k} onChangeText={(e) => this.bindInput(k, e)} placeholder="Column Name" value={this.state[k]}/>
            </View>
          ))}
          <Button title="Import" onPress={() => this.generateTransactions()}/>
          </View>
          <Text>Your CSV file : </Text>
          <View style={{flex : 10, flexDirection:"column"}}>
            <View style={{flexDirection:"row", alignSelf: 'stretch'}}>
              {this.state.Lines[0] && this.state.Lines[0].map((l,i) =>
                <Text style={{flex : 1, textAlign:"center"}} key={i}>{i}</Text>
              )}
            </View>
            {this.state.Lines.slice(0,15).map((l,i) =>
              <View style={{flexDirection:"row", alignSelf: 'stretch'}} key={i}>
                {l.map( (m,j) =>
                  <Text style={{flex : 1, textAlign:"center"}} key={j}>{m}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      )
    } else {
      content = <input style={{flex : 1}} type="file" accept=".csv" onChange={(event) => event.target.files && this.handleFile(event.target.files[0])}/>
    }
    return (
    <View>
      <AppBar title="Freeconomy" />
        <Text style={{flex : 1}}>Import in wallet {this.state.WalletUUID}
      </Text>
      {content}
    </View>)
  }

  handleFile(file : File) {
    var reader = new FileReader();
    reader.onload = (event) => this.handleCSVContent(reader.result);
    reader.readAsText(file);
  }

  handleCSVContent(string : string) {
    console.log("handle csv", string)
    AsyncStorage.setItem("csv", string);
    const csv = Papa.parse(string, {dynamicTyping : true});
    this.setState({...this.state, Lines : csv.data})
    console.log("file read", csv.data.slice(0,5));
  }

  generateTransactions() {
    if (!mandatory.reduce((agg, current)=> (agg && this.state[current] !== ""), true)){
      console.log("missing mandatory field")
      return
    }

    const state = {...this.state}

    // Get list of category to import and create map Name => UUID
    Models.GetCategories().then(categories => {
      const alreadyImportedMap : {[key:string] : string} = {}
      categories.forEach(t => alreadyImportedMap[t.Name] = t.UUID)
      return alreadyImportedMap;
    }).then(alreadyImportedMap => {
      const categories : Category[] = [];
      const categoryAdded : {[key:string] : string} = {};
      this.state.Lines.forEach((line) => {
        const categoryName = line[parseInt(this.state.CategoryName)]
        if (categoryAdded[categoryName] || alreadyImportedMap[categoryName]) {
          return;
        }
        const c = {
          UUID : v4(),
          Icon : "android",
          LastUpdate : new Date(),
          Name : categoryName,
        }
        categories.push(c);
        categoryAdded[c.Name] = c.UUID
      })
      state.CategoriesToImport = categories;
      return {...alreadyImportedMap, ...categoryAdded}
    }).then(categoryNameToUUID => {
      return Models.GetAllTransactions(this.state.WalletUUID).then(
        transactions => {
          const alreadyImportedMap : {[key:string] : boolean} = {}
          transactions.forEach(t => alreadyImportedMap[t.Beneficiary+t.Date+t.Price] = true)
          return alreadyImportedMap;
        }
      ).then(alreadyImportedMap => {
        const transactions : Transaction[] = this.state.Lines.map((line) : Transaction => ({
          UUID : v4(),
          WalletUUID : this.state.WalletUUID,
          CategoryUUID : categoryNameToUUID[line[parseInt(this.state.CategoryName)]],
          LastUpdate : new Date(),
          Beneficiary : line[parseInt(this.state.Beneficiary)],
          Date : new Date(line[parseInt(this.state.Date)]),
          Price : parseFloat(line[parseInt(this.state.Price)]),
          Comment : this.state.Comment && line[parseInt(this.state.Comment)],
        }))
        .filter(t => !alreadyImportedMap[t.Beneficiary+t.Date+t.Price])
        state.TransactionsToImport = transactions;
      })
    }).then(() => {
      this.setState(state);
    })

  }
}
