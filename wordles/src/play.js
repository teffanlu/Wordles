import React, { useState, useEffect } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Play({ navigation }) {

  const [text, onChangeText] = useState("amarillo");
  const [length, setLength] = useState('');
  const [reload, setreload] = useState(false);
  const abc = [
    {caracter:'Q', color:"#32CD32"},
    {caracter:'W', color:"#a0a0a0"},
    {caracter:'E', color:"gold"},
    {caracter:'R'},
    {caracter:'T'},
    {caracter:'Y'},
    {caracter:'U'},
    {caracter:'I'},
    {caracter:'O'},
    {caracter:'P'},
    {caracter:'A'},
    {caracter:'S'},
    {caracter:'D'},
    {caracter:'F'},
    {caracter:'G'},
    {caracter:'H'},
    {caracter:'J'},
    {caracter:'K'},
    {caracter:'L'},
    {caracter:'Z'},
    {caracter:'X'},
    {caracter:'C'},
    {caracter:'V'},
    {caracter:'B'},
    {caracter:'N'},
    {caracter:'Ñ'},
    {caracter:'M'},
  ];

  useEffect(() => {
    async function getWordToUpdate() {

      let getuser = await AsyncStorage.getItem('User');

      var respons = await axios.get('https://wordles-server.herokuapp.com/api/info/rooms');
      console.log(respons);

      var respons = await axios.post('https://wordles-server.herokuapp.com/api/info/statistics', {
        gamer_id: getuser.id
      });
      console.log(respons);

      setLength(text);
    } 
    getWordToUpdate();

  }, [reload]);

  function onfinish () {

    //Obtengo todos los caracteres tecleados despues de la palabra buscada
    let word = text.slice(length.length, text.length);

    console.log(word);

    let list = [];
    for (let i = 0; i < length.length; i++) {
      list.push("");
    }

    console.log(list);

    for (let i = 0; i < word.length; i++) {// Sobreescribo en cada indice los caracteres que se han tecleado, los ultimos de cada indice son los que permanecen
      //word[i][0]   --> indice
      //word[i][1]   --> caracter tecleado
      list.splice(word[i][0], 1, word[i][1]);
    }

    let textString = list.toString().replace(/,/g,"");
    console.log(textString)

    //comprobar si solo existen letras del abcdario
    const pattern = new RegExp('ñ|^[A-Z]+$', 'i');
    console.log(pattern.test(textString));

    if(!pattern.test(textString)){
      alert("Solo debe ingresar caracteres correspondiente al abecedario, y sin tildes.");
      return 0;
    }

    if(textString.length !== length.length){
      alert("Existen espacios vacios, rellene todos los campos");
      return 0;
    }

    if(textString.toUpperCase() === length.toUpperCase()){
      alert("Correcto!!!");
    }

    // pintar las casillas de abcdario del color correspondiente
    // post
  }

  return (
    <View style={styles.container}>

      <View style={[styles.marginB, styles.row]}>
        { 
          abc.map((element, index) =>
            <Text
              key={index}
              style={[styles.input, {backgroundColor: element.color}]}
            >
              {element.caracter}
              { ( index % 6 ) == 0 ?
                  "\n"
                :
                  null
              }
            </Text>
          )
        }
      </View>
      <View style={styles.marginB}></View>

      <SafeAreaView>
        <View style={[styles.row, styles.marginB]}>
        { length.split('').map((element, index) =>
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(e) => onChangeText([...text, [index, e]])} //Guardo despues de la palabra buscada todos los caracteres que se teclean con el indice al cual corresponde
              maxLength={1}
            />
          )
        }
        </View>
      </SafeAreaView>

      <Button
        title="Comprovar"
        onPress={() => onfinish()}
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
      paddingTop: 30,
    },
    input: {
      height: 40,
      width: 40,
      margin: 0,
      borderWidth: 1,
      padding: 6,
      textAlign: "center",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    marginB: {
      marginBottom: 25,
    },
});