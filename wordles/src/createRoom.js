import React, {useState, useEffect} from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function CreateRoom({ navigation, route }) {

  const [word, setWord] = useState("");
  const [turns, setTurns] = useState("5");
  const [limitTime, setLimitTime] = useState("1");
  const [reload, setreload] = useState(false);
  const [user, setUser] = useState('');
  
  useEffect(() => {
    async function getUser(){
      let getuser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(getuser));
    }
    getUser();
    console.log(user);

    if(route.params.word !== 0){ //////////////////////////////////////////////////////////////////////////////////////////
      //get word
    }
  }, [reload]);

  async function createWord () { ////////////////////////////////////////////////////////////////////////////////////////////
    if(false){
      var response = await axios.post('https://wordles-server.herokuapp.com/api/info/room', {
        word, 
        turns, 
        limitTime, 
        gamer_id: user.id
      });
      console.log(response.data[0]);
    }
  }

  async function updateWord () { ////////////////////////////////////////////////////////////////////////////////////////////
    if(false){
      var response = await axios.put('https://wordles-server.herokuapp.com/api/info/room/'+0/*word.id*/, {
        word, 
        turns, 
        limitTime, 
        gamer_id: user.id
      });
      console.log(response.data[0]);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Palabra:</Text>
        <TextInput
          placeholder="Introduce la palabra"
          style={styles.input}
          onChangeText={setWord}
          value={word}
        />
        <Text>Numero de letras: {word.length}</Text>
        <View style={styles.br}></View>
        <Text>Numero de intentos:</Text>
        <View style={[styles.campo, styles.align]}>
          <TextInput
            placeholder="Numero de intentos"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setTurns}
            value={turns}
          />
          <Text>intentos</Text>
        </View>
        <Text>Tiempo limite:</Text>
        <View style={[styles.campo, styles.align]}>
          <TextInput
            placeholder="Tiempo limite"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setLimitTime}
            value={limitTime}
          />
          <Text>minutos</Text>
        </View>
      </SafeAreaView>
      <View style={styles.br}></View>
      <View style={styles.br}></View>
      <Button
        title="Crear"
        onPress={() => createWord()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
    },
    input: {
      width: window.width*0.5,
      height: 40,
      margin: 12,
      marginLeft: 0,
      borderWidth: 1,
      padding: 10,
    },
    campo: {
      flexDirection: "row",
    },
    align: {
      alignItems: 'center',
    },
    br: {
      margin: 20,
    },
});