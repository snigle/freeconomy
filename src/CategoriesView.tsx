import { History } from "history";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Divider, Header, Icon } from "react-native-elements";
import CategoryListItem from "./CategoryListItem";
import Loading from "./Loading";
import * as Models from "./Models";
import MoreActions from "./MoreActions";
import SideBar, { SideBarClass } from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";
import { ICategory } from "./Types";

interface IState {
  Categories: ICategory[];
  displayOptions: boolean;
}

interface IProps {
  history: History;
}

class CategoriesView extends React.Component<IProps, IState> {
  public sidebar: SideBarClass | null;

  constructor(props: IProps) {
    super(props);
    this.state = { Categories: [], displayOptions: false };
    this.sidebar = null;
  }

  public componentDidMount() {
    Models.GetCategories().then((categories) => this.setState({ Categories: categories }))
      .catch(() => console.log("fail to load categories, need to reset ?"));
  }

  public render() {
    let content: JSX.Element[] | JSX.Element;
    let options: JSX.Element = <View></View>;
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        { title: t.t("categoriesView.addCategory"), onPress: () => this.props.history.push("/AddWalletView") },
        { title: t.t("common.back"), onPress: () => this.props.history.replace("/") },
      ]} />;
    }
    if (!this.state.Categories) {
      content = <Loading Message={t.t("categoriesView.loading")} />;
    } else {

      content = this.state.Categories.map((category) =>
        <View key={category.UUID}>
          <CategoryListItem Category={category} Categories={this.state.Categories} history={this.props.history} />
          <Divider />
        </View>,
      );

    }

    return <SideBar
      history={this.props.history}
      ref={(sidebar: any) => (this.sidebar = sidebar)}>
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{ height: 60 }}
          leftComponent={{ icon: "menu", color: "#fff", onPress: () => this.sidebar && this.sidebar.openDrawer() }}
          centerComponent={{ text: "Categories", style: { fontSize: 20, color: "#fff" } }}
          rightComponent={{
            icon: this.state.displayOptions ? "expand-less" : "more-vert",
            color: "#fff",
            onPress: () => this.setState({ ...this.state, displayOptions: !this.state.displayOptions }),
          }}
        />
        <SyncBar history={this.props.history} refresh={() => this.componentDidMount()} />
        <View style={{ flex: 1 }}>
          {options}
          <ScrollView >
            {content}
            <View style={{ height: 100 }} />
          </ScrollView>
          <Icon
            raised
            containerStyle={{ position: "absolute", right: 20, bottom: 20 }}
            name="add"
            color="#517fa4"
            onPress={() => this.props.history.push("/AddCategoryView")} />
        </View>
      </View>
    </SideBar>;
  }

}

export default CategoriesView;
