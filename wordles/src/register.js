import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, SafeAreaView, TextInput, Dimensions, Button, Text, Modal } from 'react-native';

const window = Dimensions.get("window");

export default function Register({ navigation }) {

  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [gmail, setGmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [emptySpace, setEmptySpace] = React.useState(false);
  const [wrongPassword, setWrongPassword] = React.useState(false);
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

    try {
      
      /* var data = {name, userName, phoneNumber, gmail, password}
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json(); // parses JSON response into native JavaScript objects*/

      /*
      var user = JSON.stringify(response.data);
      await AsyncStorage.setItem(
        'User',
        user
      );
      */

      //JSON.stringify(
      //JSON.parse(

    } catch (error) {
      console.log(error);
    }

    /*setName('');
    setUserName('');
    setPhoneNumber('');
    setGmail('');
    setPassword('');
    setConfirmPassword('');*/

    setEmptySpace(false);
    setWrongPassword(false);

    setModalVisible(true);
    
    //navigation.navigate('Menu');
  }

  async function confirmCodigo () {
    alert(name+'\n'+userName+'\n'+phoneNumber+'\n'+gmail+'\n'+password+'\n'+confirmPassword);

    /* var data = {name, userName, phoneNumber, gmail, password}
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json(); // parses JSON response into native JavaScript objects*/

      /*
      var user = JSON.stringify(response.data);
      await AsyncStorage.setItem(
        'User',
        user
      );
      */

    setModalVisible(!modalVisible);
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