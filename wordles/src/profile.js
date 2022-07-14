import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  //Ionicons,
  //AntDesign
  //Entypo,
  FontAwesome,
  //MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Profile({ navigation }) {

  //var user = await AsyncStorage.getItem('');

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <FontAwesome name="user-circle" size={60} color="black" />
        <View style={styles.textProfile}>
          <Text style={styles.title}>userName</Text>
          <Text>name lastname</Text>
        </View>
      </View>  

      <View style={styles.separator} />

      <View >
        <Text style={styles.title}>Estadisticas del Jugador:</Text>
        <Text>Puntuacion total  {'->'}</Text>
        <Text>Racha ganadora   {'->'}</Text>
        <Text>Racha actual        {'->'}</Text>

        <View style={styles.separator} />

        <Text style={styles.title}>Contactos:</Text>
        <Text>gmail@mail.com</Text>
        <Text>xxx xxxxxxx</Text>

        <View style={styles.boton}>
          <Button
            title="Volver al menu"
            onPress={() => navigation.navigate('Menu')}
          />
        </View>
        <View style={styles.boton}>
          <Button
            title="Cerrar Sesion"
            color="red"
            onPress={() => navigation.navigate('Registro')}
          />
        </View>
      </View>
      <StatusBar style="auto" />
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
});