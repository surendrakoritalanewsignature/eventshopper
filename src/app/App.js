import React, { Component } from "react";
import { UIManager, LayoutAnimation, Alert, View, FlatList, StyleSheet, Text } from "react-native";
import { authorize, refresh, revoke } from "react-native-app-auth";
import { Page, Button, ButtonContainer, Form, Heading } from "./components";
import { signupsigninconfig, logoutconfig, passwordresetconfig, profileeditconfig } from "../b2c-config";
import { getEvents, getEventById } from "./service/eventService";
import { Events } from "./screens";
import { Buffer } from "buffer";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type State = {
  hasLoggedInOnce: boolean,
  idToken: ?string,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string,
  Events: [],
};

const events = getEvents();

const defaultState = {
  hasLoggedInOnce: false,
  idToken: "",
  accessToken: "",
  accessTokenExpirationDate: "",
  refreshToken: "",
  Events: [],
};

const defaultConfig = {
  issuer: "",
  clientId: "",
  redirectUrl: "",
  additionalParameters: {},
  scopes: [],

  serviceConfiguration: {
    authorizationEndpoint: "",
    tokenEndpoint: "",
    revocationEndpoint: "",
  },
};

console.disableYellowBox = true;

export default class App extends Component<{}, State> {

  state = {
    hasLoggedInOnce: false,
    idToken: "",
    accessToken: "",
    accessTokenExpirationDate: "",
    refreshToken: "",
    Events: events,
  };

  animateState(nextState: $Shape<State>, delay: number = 0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
      const authState = await authorize(signupsigninconfig);

      this.animateState(
        {
          hasLoggedInOnce: true,
          idToken: authState.idToken,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
        },
        500
      );
    } catch (error) {
      Alert.alert("Failed to log in", error.message);
    }
  };

  refresh = async () => {
    try {
      const authState = await refresh(signupsigninconfig, {
        refreshToken: this.state.refreshToken,
      });

      this.animateState({
        idToken: authState.idToken || this.state.idToken,
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
          authState.accessTokenExpirationDate ||
          this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken,
      });
    } catch (error) {
      Alert.alert("Failed to refresh token", error.message);
    }
  };

  revoke = async () => {
    try {
      await revoke(signupsigninconfig, {
        tokenToRevoke: this.state.accessToken,
        sendClientId: true,
      });
      this.animateState({
        idToken: "",
        accessToken: "",
        accessTokenExpirationDate: "",
        refreshToken: "",
      });
    } catch (error) {
      Alert.alert("Failed to revoke token", error.message);
    }
  };

  passwordreset = async () => {
    try {
      const authState = await authorize(passwordresetconfig);

      this.animateState(
        {
          idToken: "",
          accessToken: "",
          accessTokenExpirationDate: "",
          refreshToken: "",
        },
        500
      );
    } catch (error) {
      Alert.alert("Failed to reset password", error.message);
    }
  };

  profileedit = async () => {
    try {
      const authState = await authorize(profileeditconfig);

      this.animateState({
        idToken: this.state.idToken,
        accessToken: this.state.accessToken,
        accessTokenExpirationDate: this.state.accessTokenExpirationDate,
        refreshToken: this.state.refreshToken,
      });
    } catch (error) {
      Alert.alert("Failed to edit profile", error.message);
    }
  };

  render() {
    const { state } = this;

    if (state.idToken) {
      const jwtBody = state.idToken.split(".")[1];
      const base64 = jwtBody.replace("-", "+").replace("_", "/");
      const decodedJwt = Buffer.from(base64, "base64");
      state.idTokenJSON = JSON.parse(decodedJwt);
    }

    return (
      <Page>
        <>
        {!!state.accessToken ? (
          <View style={styles.container}>
            <Text style={styles.baseText}>Cognizant Events</Text>
            <FlatList
              data={state.Events}
              renderItem={({item}) => <Events event={item} />}
            />
          </View>
        ) : (
          <Heading>
            Hello, Friend.
          </Heading>
        )}
        </>
        <>
        <ButtonContainer>
          {!state.accessToken && (
            <Button onPress={this.authorize} text="Login" color="#DA2536" />
          )}
          {!state.idToken && (
            <Button onPress={this.passwordreset} text="Reset Password" color="#DA2536" />
          )}
          {!!state.accessToken && (
            <Button onPress={this.profileedit} text="Profile edit" color="#24C2CB" />
          )}
          {!!state.accessToken && (
            <Button onPress={this.revoke} text="Logout" color="#EF525B" />
          )}
        </ButtonContainer>        
        </>

      </Page>
    );
  }
}

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
  baseText: {
    fontWeight: 'bold',
    justifyContent: "center",
    fontSize: 40,
    color: "#000080",
  },
});
