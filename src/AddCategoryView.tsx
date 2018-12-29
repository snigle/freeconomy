// @ts-ignore
import { RaisedButton, TextField } from "carbon-ui";
// @ts-ignore
import * as colorsys from "colorsys";
import { History } from "history";
import * as React from "react";
import { Button, ScrollView, View } from "react-native";
// @ts-ignore
import { ColorWheel } from "react-native-color-wheel";
import { Header, Icon, Text } from "react-native-elements";
import * as Models from "./Models";
import t from "./translator";
import { ICategoryInput, IconType } from "./Types";

interface IState extends ICategoryInput {
  Loading: boolean;
}

interface IProps {
  CategoryUUID?: string;
  history: History;
}

const icons: Array<{ name: string, type: IconType }> = [
  { name: "security", type: "material" },
  { name: "healing", type: "material" },
  { name: "phone-android", type: "material" },
  { name: "account-balance", type: "material" },
  { name: "local-bar", type: "material" },
  { name: "card-giftcard", type: "material" },
  { name: "local-movies", type: "material" },
  { name: "favorite", type: "material" },
  { name: "local-gas-station", type: "material" },
  { name: "school", type: "material" },
  { name: "shopping-cart", type: "material" },
  { name: "shopping-basket", type: "material" },
  { name: "local-cafe", type: "material" },
  { name: "local-hotel", type: "material" },
  { name: "language", type: "material" },
  { name: "gavel", type: "material" },
  { name: "backup", type: "material" },
  { name: "stars", type: "material" },
  { name: "local-laundry-service", type: "material" },
  { name: "wb-sunny", type: "material" },
  { name: "home", type: "material" },
  { name: "today", type: "material" },
  { name: "style", type: "material" },
  { name: "local-parking", type: "material" },
  { name: "euro-symbol", type: "material" },
  { name: "attach-money", type: "material" },
  { name: "room-service", type: "material" },
  { name: "restaurant", type: "material" },
  { name: "spa", type: "material" },
  { name: "phone", type: "material" },
  { name: "sync", type: "material" },
  { name: "directions-bus", type: "material" },
  { name: "beach-access", type: "material" },
  { name: "directions-car", type: "material" },
  { name: "flight-takeoff", type: "material" },
];
class AddCategoryView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      Name: "",
      Icon: { Name: "account-balance-category", Color: "#517fa4", Type: "material" },
      Loading: true,
    };
  }

  public async componentDidMount() {
    if (this.props.CategoryUUID) {
      Models.GetCategory(this.props.CategoryUUID).then((category) => {
        this.setState({
          ...this.state,
          Loading: false,
          Name: category.Name,
          Icon: category.Icon,
        });
      });
    } else {
      return Promise.resolve(this.setState({ ...this.state, Loading: false }));
    }
  }

  public changeName(text: string) {
    this.setState({ ...this.state, Name: text });
  }
  public changeParentCategory(text: string) {
    this.setState({ ...this.state, ParentCategoryUUID: text });
  }
  public changeIconColor(text: string) {

    this.setState({ ...this.state, Icon: { ...this.state.Icon, Color: text } });
  }
  public changeIcon({ name, type }: { name: string, type: IconType }) {
    this.setState({ ...this.state, Icon: { ...this.state.Icon, Name: name, Type: type } });
  }

  public render() {
    let content: JSX.Element = <View><Text>Chargement</Text></View>;
    if (!this.state.Loading) {
      content = <ScrollView style={{ flex: 1 }}>
        <TextField
          placeholder={t.t("common.name")}
          onChangeText={(v: string) => this.changeName(v)}
          value={this.state.Name} />

        <View style={{ height: 20 }} />
        <Text h4>Icon :</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <ColorWheel
              initialColor={this.state.Icon.Color}
              onColorChange={(color: any) => this.changeIconColor(colorsys.hsv2Hex(color))}
              style={{ marginLeft: 20, padding: 40, height: 100, width: 100, overflow: "visible" }} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
              {icons.map(({ name, type }: { name: string, type: IconType }) =>
                <Icon
                  onPress={() => this.changeIcon({ name, type })}
                  key={name}
                  name={name}
                  type={type}
                  reverse
                  color={this.state.Icon.Color} />,
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 20 }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.save(true)}
              title={t.t("common.saveAndNew")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.save()}
              title={t.t("common.save")}
            />
          </View>
        </View>
      </ScrollView>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{ height: 60 }}
          leftComponent={{
            icon: "navigate-before",
            color: "#fff",
            onPress: () => this.props.history.replace("/CategoriesView"),
          }}
          centerComponent={{ text: t.t("categoriesView.addCategory"), style: { fontSize: 20, color: "#fff" } }}
        />
        {
          content
        }
      </View>
    );
  }

  public save(reload: boolean = false) {
    this.setState({ ...this.state, Loading: true });
    const savePromise: Promise<any> = this.props.CategoryUUID ?
      Models.UpdateCategory(this.props.CategoryUUID, this.state) :
      Models.CreateCategory(this.state);

    savePromise.then(() => {
      if (reload) {
        this.props.history.replace("/");
        this.props.history.replace("/AddCategoryView");
      } else {
        this.props.history.replace("/CategoriesView");
      }
    }).catch((err: any) => console.log("error", err));
  }
}

export default AddCategoryView;
