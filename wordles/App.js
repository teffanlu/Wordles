import 'react-native-gesture-handler';

import {
  //Ionicons,
  AntDesign
  /*Entypo,
  FontAwesome5,
  MaterialCommunityIcons,*/
} from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Register from "./src/register";
import Login from "./src/login";
import Profile from "./src/profile";
import Menu from "./src/menu";
import CreateRoom from "./src/createRoom";
import Play from "./src/play";
import Statistic from "./src/statistic";
import ListWords from "./src/listWords";
import Ranking from "./src/ranking";

function LogoPerfil({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <AntDesign
        style={{ padding: 6, marginRight: 10 }}
        name="user"
        color="#fff"
        size={24}
      />
    </TouchableOpacity>
  );
}

function MenuRoute({ navigation }) {
  return (
    <Stack.Navigator
        initialRouteName="Registro"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'blue' },
        }}
      >
        <Stack.Screen
          name="Registro"
          component={Register}
          options={{
            title: 'Registro de usuario',
            headerLeft: null
          }}  
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Inicio de sesion',
            headerLeft: null
          }}  
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Perfil de usuario',
          }}  
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Menu de opciones',
            headerLeft: null,
            headerRight: () => LogoPerfil({ navigation }),
          }}  
        />
        <Stack.Screen
          name="Room"
          component={CreateRoom}
          options={{
            title: 'Room',
            headerRight: () => LogoPerfil({ navigation }),
          }}  
        />
        <Stack.Screen
          name="ListRooms"
          component={ListWords}
          options={{
            title: 'Lista de Rooms',
            headerRight: () => LogoPerfil({ navigation }),
          }}  
        />
        <Stack.Screen
          name="Ranking"
          component={Ranking}
          options={{
            title: 'Ranking',
            headerRight: () => LogoPerfil({ navigation }),
          }}  
        />
        <Stack.Screen
          name="Play"
          component={Play}
          options={{
            title: 'Jugar Room',
          }}  
        />
        <Stack.Screen
          name="Statistic"
          component={Statistic}
          options={{
            title: 'Puntuacion',
          }}  
        />
      </Stack.Navigator>
  );
}

export default function App({navigation}) {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={MenuRoute}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}