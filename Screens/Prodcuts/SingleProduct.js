import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contectContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        {/*ToDO Rich desp, Avail */}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        </Left>
        <Right>
          <Button
            title="Add To Cart"
            onPress={() => props.addItemToCart(item)}
          />
        </Right>
      </View>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },

  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },

  image: {
    width: "100%",
    height: 250,
  },

  contectContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },

  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },

  price: {
    fontSize: 20,
    margin: 20,
    color: "red",
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
