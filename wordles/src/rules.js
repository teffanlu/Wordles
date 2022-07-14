import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Rules({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Reglas del juego.</Text>
      <View style={styles.boton}>
          <Button
            title="Volver al menu"
            onPress={() => navigation.navigate('Menu')}
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
    boton: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 40,
    },
});