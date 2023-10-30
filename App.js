import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FilmOverview from './components/FilmOverview';
import FilmDetails from './components/FilmDetails';
import SerieOverview from './components/SerieOverview';
import SerieDetails from './components/SerieDetails';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => { 
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" backgroundColor='#343333' />
      <Tab.Navigator
        initialRouteName="Films"
        activeColor="#ffffff"
        barStyle={{ backgroundColor: '#3F3E3E' }}>
        <Tab.Screen 
        name="Films" 
        component={FilmStack}
        options={{
          tabBarLabel: 'Films',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="filmstrip" color={color} size={24} />
          ),
        }}/>
        <Tab.Screen name="Series" 
        Name="Series"
        component={SerieStack}
        options={{
          tabBarLabel: 'Series',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="television-play" color={color} size={24} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const FilmStack = ()=> {
  return (
    <Stack.Navigator
      initialRouteName="FilmOverview"
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#3F3E3E' },
      }}>
      <Stack.Screen 
        name="FilmOverview" 
        component={FilmOverview}
        options={({navigation}) => ({
          title: 'Films',
        })} />
      <Stack.Screen 
        name="FilmDetails" 
        component={FilmDetails}
        options={{
          title: 'Filmdetails',
        }} />
    </Stack.Navigator>
  );
}

const SerieStack = ()=> {
  return (
    <Stack.Navigator
      initialRouteName="SerieOverview"
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#3F3E3E' },
      }}>
      <Stack.Screen 
        name="SerieOverview" 
        component={SerieOverview}
        options={({navigation}) => ({
          title: 'Series',
        })} />
      <Stack.Screen 
        name="SerieDetails" 
        component={SerieDetails}
        options={{
          title: 'Seriedetails',
        }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});

export default App
