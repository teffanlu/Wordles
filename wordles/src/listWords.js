import React, {useState, useEffect} from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Dimensions, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

const window = Dimensions.get("window");

const Item = ({ word, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{word}</Text>
    </TouchableOpacity>
  );

export default function ListWords ({ navigation }) {

  const [reload, setreload] = useState(false);
  const [user, setUser] = useState('');
  const [listwors, setListwors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function getUser(){
      let getuser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(getuser));

      var response = await axios.get('https://wordles-server.herokuapp.com/api/info/roomsGamer/'+JSON.parse(getuser).id);
      setListwors(response.data);
    }
    getUser();

  }, [reload]);

  const renderItem = ({ item }) => {
    return (
      <Item
        word={item.word}
        onPress={() => navigation.navigate('Room', {word: item.id})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Lista de palabras creadas por mi:</Text>

      <SafeAreaView style={styles.containerList}>
        <FlatList
            data={listwors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
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
});