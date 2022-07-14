import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Login({ navigation }) {

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function finish () {
    alert(userName+'\n'+password);
    navigation.navigate('Menu');
    setUserName('');
    setPassword('');
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </SafeAreaView>

      <View style={styles.separator} />

      <View style={styles.fixToText}>
        <Button
          title="No poseo una cuenta?"
          color="#a0a0a0"
          onPress={() => navigation.navigate('Registro')}
        />
        <Button
          title="Logearme"
          onPress={() => finish()}
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
  input: {
    width: window.width*0.9,
    height: 40,
    margin: 12,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    paddingTop: 30,
  },
  fixToText: {
    width: window.width*0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});