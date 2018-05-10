import * as React from "react"
import {View, Text, ScrollView} from "react-native"
import SideBar from "./SideBar"
import {SideBarClass} from "./SideBar"
import {Header} from "react-native-elements"
import {RouteComponentProps} from "react-router"
import {VictoryPie} from "victory-native"
import * as Models from "./Models"
import * as _ from "lodash"
import * as querystring from "querystring"
import moment from "moment"
import {Category, Transaction, displayPrice, Currency} from "./Types"
import ReportByCategoryItem from "./ReportByCategoryItem"
import {v4} from "uuid"
interface data {
  y : number,
  label : string,
  x : string,
  Category : Category,
}
interface State {
    datas : data[],
    begin : moment.Moment
    end : moment.Moment
    currencyCode : string
    Currency : Currency
}

function rainbow(numOfSteps: number, step : number) : string {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b : number;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    var d = 0
    var l = 1
    switch(i % 6){
        case 0: r = l; g = f; b = d; break;
        case 1: r = q; g = l; b = d; break;
        case 2: r = d; g = l; b = f; break;
        case 3: r = d; g = q; b = l; break;
        case 4: r = f; g = d; b = l; break;
        case 5: r = l; g = d; b = q; break;
        default : r=d; g = d; b = d;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

export default class extends React.Component<RouteComponentProps<any>,State>{
  private sidebar ?: SideBarClass

  constructor(props: any) {
    super(props)
    const queryParams = querystring.parse(props.location.search.replace("?",""))
    let begin = moment().startOf("month")
    let end = moment()
    if(queryParams.begin) {
      begin = moment(queryParams.begin)
    }
    if(queryParams.end) {
      end = moment(queryParams.end)
    }
    this.state = {datas : [], begin : begin, end : end, currencyCode : queryParams.currency && queryParams.currency.length ? queryParams.currency[0] : 'EUR', Currency : { Code : "EUR", Symbol: "€"}}
  }

  componentDidMount() {
    Promise.all([
      Models.GetAllTransactions(),
      Models.GetWallets(),
      Models.GetCategories(),
    ]).then(([transactions, wallets, categories]) => {
      const categoriesByUUID : { [key:string] : Category} = _.mapValues(_.groupBy(categories, "UUID"), c => c[0])
      wallets = wallets.filter(w => w.Currency.Code === this.state.currencyCode)
      transactions = transactions.filter(t =>
        moment(t.Date).isAfter(this.state.begin) && moment(t.Date).isBefore(this.state.end) &&
        wallets.find(w => w.UUID === t.WalletUUID)
      )
      const transactionsByCategoryUUID = _.mapValues(_.groupBy(transactions, t => t.CategoryUUID),
      transactions => _.reduce(transactions, (aggregate,transaction) => aggregate+transaction.Price, 0))
      const defaultCategory : Category = {UUID : v4(), Name: "Unknown" , Icon : {Name : "question", Type: "material", Color:""}, LastUpdate: new Date()}
      const datas : data[] = _.values(_.mapValues(transactionsByCategoryUUID, (total, categoryUUID) => ({x:"", y : total, label:" ", Category : categoriesByUUID[categoryUUID] || defaultCategory})))
      console.log("datas", datas)
      this.setState({...this.state, datas : _.sortBy(_.filter(datas, d => d.y < 0).map(d => ({...d, y : -d.y})), d => - d.y)})
    })
  }

  render() {
    const total = this.state.datas.reduce((agg, d) => (agg+d.y), 0);
    const totalMax = this.state.datas.length ? this.state.datas[0].y : 0;
    return <SideBar history={this.props.history} ref={(sidebar: any) => (this.sidebar = sidebar ? sidebar.getWrappedInstance() : null)}>
    <View style={{flex:1}}>
    <Header
    outerContainerStyles={{height:60}}
    leftComponent={{ icon: 'menu', color: '#fff', onPress : () => this.sidebar && this.sidebar.openDrawer() }}
    centerComponent={{ text: 'Rapport des dépenses', style: { fontSize: 20, color: '#fff' } }}
    />
    <ScrollView style={{flex:1}}>
    <View style={{ alignSelf:"center", height:200}}>
    <VictoryPie  height={200} padding={5} innerRadius={70}
    data={this.state.datas} colorScale={this.state.datas.map((v,k) => rainbow(this.state.datas.length,k+1))}/>
    </View>
    <View style={{position:"absolute", top:60, alignSelf:"center"}}>
      <Text style={{textAlign:"center", fontSize:20, marginBottom:10}}>Total :</Text>
      <Text style={{textAlign:"center", fontSize: 30}}>{displayPrice(total, this.state.Currency)}</Text>
    </View>
    <View>
    {this.state.datas.map((d,i) =>
      <ReportByCategoryItem key={i} TotalMax={totalMax} Category={d.Category} Total={total} TotalCategory={d.y} Color={rainbow(this.state.datas.length, i)} Currency={this.state.Currency} history={this.props.history}/>
    )}
    </View>
    </ScrollView>
    </View>
    </SideBar>
  }
}
