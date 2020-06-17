import React from 'react'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';


import { StyleSheet, Text, TextInput, View, Button,Keyboard } from 'react-native'

export default class database extends React.Component{

    onCreateDatabase()
    
    {

        const dbref= firebase.database().ref()
        console.log(dbref)
        dbref.set("hello world");
    }
    render(){

        return(
            <View style= {{justifyContent:"center", alignContent:'center'}}>
                <Text>
                    {this.props.foods}
                </Text>
                <Button
                title="set data" onPress={this.onCreateDatabase}
                >

                </Button>
                

            </View>
        )
    }
}

  
 