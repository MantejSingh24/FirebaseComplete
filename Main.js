import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import storage from '@react-native-firebase/storage';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class Main extends React.Component {


    constructor(props) {
        super(props)
        this.state =
        {
            filePath: {},
            CurrentUser: ""
        }
    }
   

    initApp = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                alert(user.email)
            } else {
                // Signed out
            }



            this.setState({ CurrentUser: user.email })
        })
    }

    uploadImage = async (path,) => {
      const storage = firebase.storage();
      const sessionId = new Date().getTime();
      const imageRef = storage.ref('images').child(`${sessionId}`);
      console.log('Response = ', path);
      console.log('Response = ',`${sessionId}`);
      return await imageRef.putFile(path);
    
    };

    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              filePath: source,
            });
           this.uploadImage(response.uri)
          }
        });
    }
    componentDidMount() {


        this.initApp()


    }




    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text>
          <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
        </View>
                <Text>
                    Hi  {this.state.CurrentUser}
                </Text>
                <Button
                    title="sign out"
                    onPress={() => { this.props.navigation.navigate('Login'), this.signOutUser }
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})