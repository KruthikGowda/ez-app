import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Icon, Input, Row, Text, Header, Item } from "native-base";

import ProductList from "./ProductList";
import SearchedProdcut from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const { height } = Dimensions.get("window");
const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtgs, setProductsCtgs] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productCategories);
    setProductsCtgs(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState([]);
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCtgs = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtgs(initialState), setActive(true)]
        : [
            setProductsCtgs(
              products.filter(
                (i) =>
                  // console.log(ctg);
                  // console.log("And");
                  // console.log(i.category.$oid);
                  i.category.$oid === ctg
              ),
              setActive(true)
            ),
            console.log(productsCtgs),
          ];
    }
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProdcut
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtgs}
                  productsCtgs={productsCtgs}
                  active={active}
                  setActive={setActive}
                />
              </View>
            </View>
            {productsCtgs.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtgs.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No Products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },

  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductContainer;
