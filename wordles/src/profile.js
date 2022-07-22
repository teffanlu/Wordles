import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import {
  //Ionicons,
  //AntDesign
  //Entypo,
  FontAwesome,
  //MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Dimensions, Button, Modal } from 'react-native';

const window = Dimensions.get("window");

export default function Profile({ navigation }) {

  const [reload, setreload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState('');
  
  useEffect(() => {
    async function getUser(){
      let getuser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(getuser));
    }
    getUser();
    console.log(user);

    /*
    var response = await axios.get('https://wordles-server.herokuapp.com/api/info/roomsGamer/'+user.id);
    console.log(response.data[0]);
    */

  }, [reload]);

  async function logout () {
    await AsyncStorage.removeItem('User');
    navigation.navigate('Registro');
  }

  async function deleteUser (op) {
    if(op === 1){
      setModalVisible(!modalVisible);
    }
    if(op === 2){
      
      await axios.delete('https://wordles-server.herokuapp.com/api/users/gamer/'+user.id);
      alert('Usuario eliminado con exito');
      await AsyncStorage.removeItem('User');
      navigation.navigate('Registro');

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <FontAwesome name="user-circle" size={60} color="black" />
        <View style={styles.textProfile}>
          <Text style={styles.title}>{user.userName}</Text>
          <Text>{user.name}</Text>
        </View>
      </View>  

      <View style={styles.separator} />

      <View >
        <Text style={styles.title}>Estadisticas del Jugador:</Text>
        <Text>Puntuacion total  {'->'} {user.totalPoints}</Text>
        <Text>Racha ganadora   {'->'} {user.winStreak}</Text>
        <Text>Racha actual        {'->'} {user.currentStreak}</Text>

        <View style={styles.separator} />

        <Text style={styles.title}>Contactos:</Text>
        <Text>{user.gmail}</Text>
        <Text>{user.phoneNumber}</Text>

        <View style={styles.boton}>
          <Button
            title="Volver al menu"
            onPress={() => navigation.navigate('Menu')}
          />
        </View>
        <View style={styles.boton}>
          <Button
            title="Cerrar Sesion"
            color="orange"
            onPress={() => logout()}
          />
        </View>
        <View style={styles.boton}>
          <Button
            title="Eliminar Cuenta"
            color="red"
            onPress={() => deleteUser(1)}
          />
        </View>
      </View>
      <StatusBar style="auto" />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Esta seguro de que quiere eliminar la cuenta?</Text>
            <View style={styles.fixToText}>
              <Button
                title="Cancelar"
                color="#a0a0a0"
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button
                title="Si"
                onPress={() => deleteUser(2)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      height: 10000,
      backgroundColor: '#fff',
      padding: 20,
    },
    profile: {
      flexDirection: "row",
      padding: 20,
      paddingBottom: 0,
    },
    textProfile: {
      flexDirection: "column",
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      paddingTop: 20,
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    boton: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 40,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    fixToText: {
      width: window.width*0.9,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});