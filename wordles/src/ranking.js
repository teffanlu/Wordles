import React, {useState, useEffect} from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Dimensions, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

const window = Dimensions.get("window");

const Item = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={[styles.title, styles.bold]}>{"#"+"num"+": "+ item.userName}</Text>
      <Text style={styles.title}>
        Puntaje: {item.totalPoints === null ? "Sin Puntaje" : item.totalPoints} 
        {"\n"}
        Racha actual: {item.currentStreak === null ? "Sin Puntaje" : item.currentStreak}
      </Text>
    </TouchableOpacity>
  );

export default function Ranking ({ navigation }) {

  const [reload, setreload] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUser(){

      var response = await axios.get('https://wordles-server.herokuapp.com/api/users/gamers');
      setUsers(response.data);
      console.log(response.data);
    }
    getUser();

  }, [reload]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.containerList}>
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <Button
        title="Reload"
        onPress={() => setreload(!reload)}
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
    containerList: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width: window.width*0.9,
    },
    item: {
        backgroundColor: '#6495ed',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: "white"
    },
    bold: {
      fontWeight: "bold",
    },
});