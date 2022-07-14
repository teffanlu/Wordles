import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Menu({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.buton}>
        <Button
            title="Agregar Room"
            onPress={() => alert("Agregar Room")}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Jugar Room"
            onPress={() => alert("Jugar Room")}
        />
      </View>
      <View style={styles.buton}>
        <Button
            title="Reglas del JUego"
            color="#a0a0a0"
            onPress={() => navigation.navigate('Rules')}
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
});