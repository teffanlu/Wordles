import React from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';

const window = Dimensions.get("window");

export default function Statistic({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
      <Button
        title="Go to Menu"
        onPress={() => navigation.navigate('Menu')}
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
        justifyContent: 'center',
    },
});