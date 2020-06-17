import React from 'react'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import { StyleSheet, Text, TextInput, View, Button, Keyboard } from 'react-native'
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: ""
    };

    this.handleSignUp = this.handleSignUp.bind(this);


  }
  async handleSignUp() {

    Keyboard.dismiss();


    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password).then((authData) => {
        
          let account = {}
          account.email = authData.user.email.toLowerCase()
          account.uid = authData.user.uid
         console.log(authData.user.uid)
          firebase.database().ref('users/' + authData.user.uid ).set({
            account
          }).then(() => this.props.navigation.navigate('Main'))
        }).catch((err) => console.log(err));


    }
    catch (error) { console.log(error) }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button title="database" onPress={() => this.props.navigation.navigate('database')} />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})