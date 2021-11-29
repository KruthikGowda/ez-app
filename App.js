import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigatiors
import Main from "./Navigators/Main";

//Screens
import ProductContainer from "./Screens/Prodcuts/ProductContainer";
import Header from "./Shared/Header";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
