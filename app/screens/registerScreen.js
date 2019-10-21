import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import HeaderSection from "../components/Header";
import { FirebaseInit } from '../utils/firebase';

export default class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
   } 

  static navigationOptions = {title:"Register"}

  register = (email, password) => {
    if (!email) {
      alert("Preencha o campo de email abaixo.")
      return
    }
    if (!password) {
      alert("Preencha o campo de senha abaixo.")
      return
    }
    try{
      FirebaseInit.auth().createUserWithEmailAndPassword(email, password);
      alert("Usuário cadastrado")
      this.props.navigation.navigate('Login')
    }
    catch(error){
      alert(error.toString(error))
    }
  }   


  render() {
    return (
      <View style={styles.container}>
        <HeaderSection title="Registrar" />
        <View style={styles.form}>
          <Text style={{fontWeight: 'bold'}}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={"Digite seu email"}
            onChangeText={value => this.setState({ email: value })}
          />
          <Text style={{fontWeight: 'bold'}}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder={"Digite sua senha"}
            onChangeText={value => this.setState({ password: value })}
          />
          <View
            style={{display:'flex',flexDirection:'row',width:"100%", justifyContent: 'space-around'}}
            >
          <Button
            title="Cadastrar"
            style={{ width: "100%" }}
            color="#0c4367"
            onPress={() => this.register(this.state.email, this.state.password)}
          />
          <Button
            title="Ja tenho login"
            color="#0c4367"
            onPress={() => this.props.navigation.navigate('Login')}
          />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
    },
    input:{
      width:"100%",
      height:40,
      borderWidth:1,
      borderColor:"#B1B1B1",
      borderRadius:8,
      backgroundColor:"#FCF8F6",
      padding: 12,
      marginTop:12,
      marginBottom: 12,
    },
    form:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      padding:10
  
    }
  });
  