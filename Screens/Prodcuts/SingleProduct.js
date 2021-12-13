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
import Toast from "react-native-toast-message";
import MutableButton from "../../Shared/StyledComponents/MutableButton";
import StatusViewer from "../../Shared/StyledComponents/StatusViewer";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<StatusViewer unavailable></StatusViewer>);
      setAvailabilityText("Unvailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<StatusViewer limited></StatusViewer>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<StatusViewer available></StatusViewer>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

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
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        </Left>
        <Right>
          <MutableButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart.`,
                  text2: "Proceed to cart to checkout",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </MutableButton>
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
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
