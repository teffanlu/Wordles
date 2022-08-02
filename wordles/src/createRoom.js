import React, {useState, useEffect} from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';
import SocialSharing from "./utils/sharing";

const windowd = Dimensions.get("window");

export default function CreateRoom({ navigation, route }) {

  const [word, setWord] = useState("");
  const [turns, setTurns] = useState("5");
  const [limitTime, setLimitTime] = useState("1");
  const [emptySpace, setEmptySpace] = useState(false);
  const [reload, setreload] = useState(false);
  const [user, setUser] = useState('');

  const [wordId, setWordId] = useState(route.params.word);
  
  useEffect(() => {
    async function getUser(){
      let getuser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(getuser));
    }
    getUser();
    console.log(user);

    async function getWordToUpdate() {
      var response = await axios.get('https://wordles-server.herokuapp.com/api/info/room/'+wordId);
      setWord(response.data[0].word);
      setTurns(response.data[0].turns);
      setLimitTime(response.data[0].limitTime);
    }
    if(wordId !== 0){ 
      getWordToUpdate();
    }
    
  }, [reload]);

  async function createWord () {

    if(word === "" || turns === "" || limitTime === ""){
      setEmptySpace(true);
      return 0;
    }
    setEmptySpace(false);

    if(word.length > 20){
      alert('La palabra debe tener maxino 20 letras');
      return 0;
    }

    if(word.length < 3){
      alert('La palabra debe tener minimo tres letras');
      return 0;
    }

    if(parseInt(limitTime) > 30){
      alert('El limite de tiempo no puede ser mayor a 30 minutos');
      return 0;
    }

    if(parseInt(limitTime) < 1){
      alert('El limite de tiempo no puede ser menor a 1 minutos');
      return 0;
    }

    if(parseInt(turns) < 2){
      alert('El numero de intentos tiene que ser minimo de dos');
      return 0;
    }

     //comprobar si solo existen letras del abcdario
    const pattern = new RegExp('ñ|^[A-Z]+$', 'i');

    if(!pattern.test(word)){
      alert("Solo debe ingresar caracteres correspondiente al abecedario, y sin tildes.");
      return 0;
    }

    if(true){
      var response = await axios.post('https://wordles-server.herokuapp.com/api/info/room', {
        word, 
        turns, 
        limitTime, 
        gamer_id: user.id
      });
      console.log(response.data[0]);
      alert("Room creado exitosamente");
      setWordId(response.data[0].id);
    }
  }

  async function updateWord () { 

    if(word === "" || turns === "" || limitTime === ""){
      setEmptySpace(true);
      return 0;
    }
    setEmptySpace(false);

    //comprobar si solo existen letras del abcdario
    const pattern = new RegExp('^[A-Z]+$', 'i');

    if(!pattern.test(word)){
      alert("Solo debe ingresar caracteres correspondiente al abecedario, y sin tildes.");
      return 0;
    }

    if(true){
      var response = await axios.put('https://wordles-server.herokuapp.com/api/info/room/'+wordId, {
        word, 
        turns, 
        limitTime
      });
      console.log(response.data[0]);
      alert("Room actualizado exitosamente");
      navigation.navigate('Menu', {rr: Math.random() * (999999 - 0) + 0});
    }
  }

  async function deleteWord () {
    setWordId(0);
    setWord("");
    setTurns("5");
    setLimitTime("1");
    await axios.delete('https://wordles-server.herokuapp.com/api/info/room/'+wordId);
    alert("Room eliminado exitosamente");
    navigation.navigate('Menu', {rr: Math.random() * (999999 - 0) + 0});
  }

  return (
    <View style={styles.container}>
      { emptySpace ?
        <Text style={styles.warning}>Hay algun campo Vacio, rellene todos los campos</Text>
        :
        null
      }
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
      { wordId !== 0 ?
      <View>
          <Text>Codigo de room: {' '+wordId}</Text>
          <Button
            title="Compartir"
            onPress={() => SocialSharing(wordId)}
          />
          <View style={styles.br}></View>
          <Button
            title="Actualizar"
            onPress={() => updateWord()}
          />
          <View style={styles.br}></View>
          <Button
            title="Eliminar"
            color="red"
            onPress={() => deleteWord()}
          />
        </View>
      :
        <Button
          title="Crear"
          onPress={() => createWord()}
        />
      }
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
      width: windowd.width*0.5,
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
    warning: {
      color: 'red',
    },
});