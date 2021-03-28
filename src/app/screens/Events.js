// React Native Card View for Android and IOS
// https://aboutreact.com/react-native-card-view/

// import React in our code
import React, { Component } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";

//import Card
import { Avatar, Button, Card, Title, Paragraph, Date } from 'react-native-paper';
import { EventDetails } from './EventDetails';

const Events = (item) => {
    const Image = "'" + String(item.event.imageUrl) + "'";

    return (
        <View style={styles.container}>
          <Card>
            <Card.Content>
              <Title>{item.event.name}</Title>
              <Paragraph>{item.event.location.address}, {item.event.location.city}, {item.event.location.country}</Paragraph>
              <Paragraph>{item.event.date.toLocaleDateString()}</Paragraph>
            </Card.Content>
              {/* <Image source={require(Image)} /> */}
            <Card.Actions>
              <Button onClick="EventDetails(item)">Details</Button>
            </Card.Actions>
          </Card>
        </View>
    );
}

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
