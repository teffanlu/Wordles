import React, { useState, useEffect } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Play({ navigation }) {

  const [text, onChangeText] = useState("");
  const [length, setLength] = useState('');
  const [wordd, setWord] = useState(0);
  const [user, setUser] = useState(0);
  const [reload, setreload] = useState(false);
  const [array, setArray] = useState([]);
  const [turns, setTurns] = useState([]);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState('00:00');
  const [wordCorrect, setWordCorrect] = useState(0);
  const [end, setEnd] = useState(false);

  var id = null;

  //wordId and userId
  var wId = 0;
  var uId = 0;

  var arrayTurns = [];
  var abc = [
    {caracter:'Q'},
    {caracter:'W'},
    {caracter:'E'},
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

    setArray(abc);

    async function getWordToUpdate() {
      var getuser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(getuser));
      uId = JSON.parse(getuser).id;

      var rooms = await axios.get('https://wordles-server.herokuapp.com/api/info/rooms');

      var statistics = await axios.post('https://wordles-server.herokuapp.com/api/info/statistics', {
        gamer_id: JSON.parse(getuser).id
      });
      console.log(JSON.parse(getuser).id, statistics.data);

      //Identificar cuales palabras no se han jugado para guardarlas en una lista y luego elegir una aleatoria
      var unplayedWords = rooms.data;

        for (let i = 0; i < statistics.data.length; i++) {
          
          for (let j = 0; j < rooms.data.length; j++) {

            if(rooms.data[j].id === statistics.data[i].word_id){
              unplayedWords.splice(j,1);
            }

          }
        }

      if(unplayedWords.length === 0){
        alert("Ya ha jugado todos los rooms, intentelo mas tarde");
        navigation.navigate('Menu');
      }else{

      //Obtener un indice de array aleatorio
      let indexWord = Math.trunc(Math.random() * (unplayedWords.length - 0) + 0);
      console.log(indexWord);

      console.log(unplayedWords[indexWord].word);
      onChangeText(unplayedWords[indexWord].word);
      setWord(unplayedWords[indexWord]);
      setLength(unplayedWords[indexWord].word);
      wId = unplayedWords[indexWord];

      //Iniciar contador
      startTimer(unplayedWords[indexWord].limitTime + ':00');

      }
    } 
    getWordToUpdate();

    //componentWillUnmount
    return () => { 

      alert('Fue asignado cero puntos a este Room, por abandono');
      forcedFinish(0);

    }

  }, [reload]);

  async function forcedFinish(r) {  

    setEnd(false);
    clearInterval(id);

    console.log(wId.limitTime + ':00', count+1, wId.id, uId);
    var statistics = await axios.post('https://wordles-server.herokuapp.com/api/info/createStatistic', {
      totalPoints: 0, 
      totalTime: wId.limitTime + ':00', 
      totalTurns: count+1, 
      word_id: wId.id, 
      gamer_id: uId
    });
    console.log(statistics);

    if(r === 1)
      setreload(!reload);
  }

  function startTimer(Inictime) {

      let time = Inictime.split(':');
      let minutes = parseInt(time[0]);
      let seconds = parseInt(time[1]);

      console.log(minutes, seconds);

      //ciclo infinito
      let condition = false;
      do {
        id = setInterval(() => {
          if(!condition){

            if(seconds > 0){
              seconds -= 1;
            }

            if(seconds === 0){
              if(minutes > 0){
                minutes -= 1;
                seconds = 59;
              }
              if(minutes === 0){
                if(seconds === 0){
                  setEnd(true);
                  alert("Tiempo agotado");
                  condition = true;
                  return 0;
                }
              }
            }

            setTimer(
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
            );
          }
        }, 1000);
      
    } while (condition);
  }

  async function onfinish () {

    if(parseInt(wordd.turns) == count+1){
      alert('Ya no hay mas intentos');
      setEnd(true);
    }

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

    var textString = list.toString().replace(/,/g,"");
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

    //Juego terminado satisfactoriamente
    if(textString.toUpperCase() === length.toUpperCase()){
      alert("Correcto!!!");
      setEnd(true);
      postResult();
    }

    //Guardar el cambio anterior en la lista de abcdario
    if(count > 0){
      abc = array;
    }
    
    // pintar las casillas de abcdario del color correspondiente
    var color = {color: ''};
    var repit = length.toUpperCase().split('');
    for (let i = 0; i < length.length; i++) {

      //Extraer la letra tecleada 
      const result = abc.filter(word => word.caracter === textString[i].toUpperCase());

      //identificar si existe en la palabra buscada
      const exist = length.split('').filter(word => word.toUpperCase() === textString[i].toUpperCase());

        //Existe y estaa en la posicion correcta #VERDE
        if(exist[0] && length[i].toUpperCase() === textString[i].toUpperCase()){
          color = {color: '#32CD32'};
          setWordCorrect(wordCorrect + 1);
        }

        //Existe pero en la posicion incorrecta #GOLD
        if(exist[0] &&  length[i].toUpperCase() !== textString[i].toUpperCase()){
          color = {color: 'gold'};
        }

        //No existe en la palabra #GRAY
        if(!exist[0]){
          color = {color: "#a0a0a0"};
        }

        arrayTurns = [...arrayTurns, {...result[0], ...color}];       
    }

    setCount(count + 1);
    setArray(abc);
    setTurns([arrayTurns, ...turns]);

  }

  async function postResult () {

    let timerNow = timer;
    let time = timerNow.split(':');
    let minutes = parseInt(time[0]);

    // longitud de la palabra al cuadradro + minutos+1*10 - intentos+1*10 + letras acertadas*2
    let totalPoints = length.length*length.length + (minutes + 1) * 10 - (count+1) * 10 + wordCorrect * 2;

    console.log(totalPoints, timerNow, count+1, wordd.id, user.id);

    var statistics = await axios.post('https://wordles-server.herokuapp.com/api/info/createStatistic', {
      totalPoints, 
      totalTime: timerNow, 
      totalTurns: count+1, 
      word_id: wordd.id, 
      gamer_id: user.id
    });
    console.log(statistics.data);

    alert('Tu puntaje en este room fue: '+ totalPoints);

  }

  return (
    <View style={styles.container}>
      <View style={styles.marginB}><Text>{timer}</Text></View>

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

    { end ?
      <Button
        title="Siguiente"
        onPress={() => forcedFinish(1)}
      />
      :
      <Button
        title="Comprovar"
        onPress={() => onfinish()}
      />
    }
      
      <View style={styles.marginB}></View>
      <View style={styles.marginB}></View>

      <Text>Intento #{count} de {wordd.turns} intentos</Text>
      { turns.map((element, index) => 
        <View style={[styles.marginB, styles.row]}>
          { 
          //abc
            turns[index].map((element, i) =>
              <Text
                key={i}
                style={[styles.input, {backgroundColor: element.color}]}
              >
                {element.caracter}
              </Text>
            )
          }
        </View>
        )
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