import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Dimensions, Button, TextInput } from 'react-native';

import Invitation from './utils/invitation';

const window = Dimensions.get("window");

export default function Menu({ navigation, route }) {
  const [reload, setreload] = useState(false);
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    setreload(!reload);
  },[route.params.rr]);

  useEffect(() => {
    async function updateUser(){
      let getuser = await AsyncStorage.getItem('User');

      var response = await axios.post('https://wordles-server.herokuapp.com/api/users/gamer', {userName: JSON.parse(getuser).userName});
      console.log(response.data[0]);

      var user = JSON.stringify(response.data[0]);
      await AsyncStorage.setItem(
        'User',
        user
      );

    }
    updateUser();
  }, [reload]);

  async function searchCodigo() {
    let regex = /^\d+$/;
    if(codigo <= 0 || !regex.test(codigo)){
      alert('Por favor ingrese un codigo valido');
      return 0;
    }
    navigation.navigate('Play', {Search: codigo});
  }

  return (
    <View style={styles.container}>
      <View style={styles.buton}>
        <Button
            title="Jugar Room"
            onPress={() => navigation.navigate('Play', {Search: 0})}
        />
      </View>
      <View style={[styles.buton, styles.row]}>
        <TextInput
          placeholder="Codigo"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={setCodigo}
          value={codigo}
        />
        <Button
            style={styles.butonSearc}
            title="Buscar codigo de Room"
            onPress={() => searchCodigo()}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Agregar Room"
            onPress={() => navigation.navigate('Room', {word: 0})}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Ver lista de Rooms"
            onPress={() => navigation.navigate('ListRooms')}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Ver ranking global"
            onPress={() => navigation.navigate('Ranking')}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Invitar a un amigo"
            color="#a0a0a0"
            onPress={() => Invitation()}
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
        justifyContent: 'center',
    },
    buton: {
        width: 300,
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
      //justifyContent: 'space-around'
      //flexWrap: 'wrap'
    },
    butonSearc: {
      width: '70%',
      margin: 10,
      padding: 10,
      borderRadius: 20,
    },
    input: {
      margin: 0,
      width: '30%',
      borderWidth: 1,
      padding: 6,
      textAlign: "center",
    },
});