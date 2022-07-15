import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, SafeAreaView, TextInput, Dimensions, Button, Text, Modal } from 'react-native';
import axios from 'axios';

const window = Dimensions.get("window");

export default function Register({ navigation }) {

  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [gmail, setGmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [newCodigo, setNewCodigo] = React.useState("");
  const [emptySpace, setEmptySpace] = React.useState(false);
  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [existName, setExistName] = React.useState(false);
  const [existEmail, setExistEmail] = React.useState(false);
  const [existPhone, setExistPhone] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  async function finish () {
  
    if(name === '' || userName === '' || phoneNumber === '' || gmail === '' || password === '' || confirmPassword === ''){
      setEmptySpace(true);
      setWrongPassword(false);
      return 0;
    }

    if(password !== confirmPassword){
      setWrongPassword(true);
      setEmptySpace(false);
      return 0;
    }

    //Comprobar si ya existe un usuario con ese nombre o email y el telefono
    var response = await axios.post('https://wordles-server.herokuapp.com/api/users/gamer', {userName, phoneNumber, gmail});

    console.log(response.data[0][0], response.data[1][0], response.data[2][0]);

    if(response.data[0][0]){
      setExistName(true);
      setExistPhone(false);
      setExistEmail(false);
      return 0;
    }
    if(response.data[1][0]){
      setExistPhone(true);
      setExistName(false);
      setExistEmail(false);
      return 0;
    }
    if(response.data[2][0]){
      setExistEmail(true);
      setExistName(false);
      setExistPhone(false);
      return 0;
    }

    //Crear el codigo 
    var res = await axios.post('https://wordles-server.herokuapp.com/api/users/createCodigo', {gmail});
    console.log(res.data);
    setNewCodigo(res.data[0].clave);

    /*setName('');
    setUserName('');
    setPhoneNumber('');
    setGmail('');
    setPassword('');
    setConfirmPassword('');*/

    setEmptySpace(false);
    setWrongPassword(false);

    setModalVisible(true);
  }

  async function confirmCodigo () {
    console.log(0.112358);
    //Comprobar el codigo 
    if(codigo === newCodigo){
      console.log(0.112358);
      //Crear el nuevo usuario
      var response = await axios.post('https://wordles-server.herokuapp.com/api/users/newGamer', {name, userName, phoneNumber, gmail, password});
      console.log(response.data[0]);

      var user = JSON.stringify(response.data[0]);
      await AsyncStorage.setItem(
        'User',
        user
      );

      setModalVisible(!modalVisible);
    navigation.navigate('Menu');

    } else {
      alert('El codigo es incorrecto');
    }
  }

  return (
    <View style={styles.container}>
      { emptySpace ?
        <Text style={styles.warning}>Hay algun campo Vacio, rellene todos los campos</Text>
        :
        null
      }
      { wrongPassword ?
        <Text style={styles.warning}>Las Contraseñas no coinciden</Text>
        :
        null
      }
      { existName ?
        <Text style={styles.warning}>El Nombre de usuario que ingreso ya esta en uso</Text>
        :
        null
      }
      { existEmail ?
        <Text style={styles.warning}>El Correo Electronico que ingreso ya esta en uso</Text>
        :
        null
      }
      { existPhone ?
        <Text style={styles.warning}>El Numero de Telefono que ingreso ya esta en uso</Text>
        :
        null
      }
      <SafeAreaView>
        <TextInput
          placeholder="Nombre Completo"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
        />
        <TextInput
          placeholder="Numero de Telefono"
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <TextInput
          placeholder="Correo electronico"
          style={styles.input}
          onChangeText={setGmail}
          value={gmail}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          placeholder="Confirmar Contraseña"
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </SafeAreaView>

      <View style={styles.separator} />
      
      <View style={styles.fixToText}>
        <Button
          title="ya Tengo una cuenta?"
          color="#a0a0a0"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Registrarme"
          onPress={() => finish()}
        />
      </View>
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingresa el codigo enviado a tu Correo</Text>
            <TextInput
              placeholder="Codigo"
              style={styles.input}
              onChangeText={setCodigo}
              value={codigo}
            />
            <View style={styles.fixToText}>
              <Button
                title="Cancelar"
                color="#a0a0a0"
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button
                title="Crear la cuenta"
                onPress={() => confirmCodigo()}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  separator: {
    paddingTop: 30,
  },
  fixToText: {
    width: window.width*0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: window.width*0.9,
    height: 40,
    margin: 12,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
  },
  warning: {
    color: 'red',
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
});