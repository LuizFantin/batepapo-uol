import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView
} from "react-native";
import HeaderSection from "../components/Header";
import CardMessage from "../components/Message";
import { FirebaseInit } from "../utils/firebase";
import FirebaseService from "../services/FirebaseService";

export default class chatScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    message: "",
    allMessages: [],
    userEmail: ""
  };

  componentDidMount()
  {
    FirebaseInit.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userEmail: user.email });
      } else {
        console.log("DEU MERDA");
      }
    });
    FirebaseService.getDataList(
      "Messages",
      dataIn => this.setState({ allMessages: dataIn }),
      100
    );
  }
  static navigationOptions = { title: "Chat" };
  
  addMessage = message => {
    if (!message) {
      alert("Digite alguma coisa antes de enviar");
      return;
    }
    
    let nodeMessages = FirebaseInit.database().ref("Messages/");
    var newMessage = nodeMessages.push();
    
    newMessage
      .set({ message: this.state.message, author: this.state.userEmail })
      .then(() => alert("Você enviou uma mensagem!"))
      .catch(error => alert("Ops! :( \n ", error));
    };
    
    render() {
    const { allMessages } = this.state;
    return (
      <View style={styles.container}>
        <HeaderSection title="Chat" />
        <View style={styles.content}>
          <ScrollView style={styles.chat}>
            {!!allMessages.length && allMessages
              ? allMessages.map(data => (
                  <CardMessage name={data.author} message={data.message} />
                ))
              : null}
          </ScrollView>
          <View style={styles.sendMessageBox}>
            <TextInput
              style={styles.input}
              placeholder={"Digite sua mensagem"}
              onChangeText={value => this.setState({ message: value })}
            ></TextInput>
            <Button
              title={"Enviar"}
              onPress={() => this.addMessage(this.state.message)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  input: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "#B1B1B1",
    borderRadius: 8,
    backgroundColor: "#FCF8F6",
    padding: 12,
    marginTop: 12,
    marginBottom: 12
  },
  chat: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "67%",
    padding: 10,
    backgroundColor: "#FAF9EA"
  },
  sendMessageBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#DBFFC8",
    height: 100,
    width: "100%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center"
  }
});
