import React, {useState} from "react";
import axios from 'axios';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, SafeAreaView, TextInput, Dimensions, Button, Text } from 'react-native';

const window = Dimensions.get("window");

export default function Login({ navigation }) {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emptySpace, setEmptySpace] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [notFound, set404] = useState(false);

  async function finish () {
    
    if(userName === '' || password === ''){
      setEmptySpace(true);
      return 0;
    }
    setEmptySpace(false);

    var response = await axios.post('https://wordles-server.herokuapp.com/api/users/gamer', {userName});
    console.log(response.data[0]);

    if(response.data[0] === undefined){
      set404(true);
      return 0;
    }
    set404(false);

    if(response.data[0].password != password){
      setWrongPassword(true);
      return 0;
    }
    setWrongPassword(false);

    var user = JSON.stringify(response.data[0]);
    await AsyncStorage.setItem(
      'User',
      user
    );

    setUserName('');
    setPassword('');
    navigation.navigate('Menu', {rr: Math.random() * (999999 - 0) + 0});
  }

  return (
    <View style={styles.container}>
      { emptySpace ?
        <Text style={styles.warning}>Hay algun campo Vacio, rellene todos los campos</Text>
        :
        null
      }
      { wrongPassword ?
        <Text style={styles.warning}>Contraseña incorrecta</Text>
        :
        null
      }
      { notFound ?
        <Text style={styles.warning}>Usuario no encontrado</Text>
        :
        null
      }
      <SafeAreaView>
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </SafeAreaView>

      <View style={styles.separator} />

      <View style={styles.fixToText}>
        <Button
          title="No poseo una cuenta?"
          color="#a0a0a0"
          onPress={() => navigation.navigate('Registro')}
        />
        <Button
          title="Logearme"
          onPress={() => finish()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 100,
  },
  input: {
    width: window.width*0.9,
    height: 40,
    margin: 12,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    paddingTop: 30,
  },
  fixToText: {
    width: window.width*0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warning: {
    color: 'red',
  },
});