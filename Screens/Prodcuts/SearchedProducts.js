import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Content,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Text,
  Item,
} from "native-base";

var { width } = Dimensions.get("window");

const SearchedProdcut = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("ProductDeatils", { item: item });
            }}
            key={item._id}
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note={item.description}></Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}> No products found</Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SearchedProdcut;
