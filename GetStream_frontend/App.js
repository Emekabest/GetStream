import React, { useState }  from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/**Screen importation section...................... */
import AllMoviesScreen from './Pages/AllMoviesScreen/AllMoviesScreen';
import TrendingScreen from './Pages/TrendingScreen/TrendingScreen';
import MovieInfoScreen from './Pages/MovieInfoScreen/MovieInfoScreen';
import RegisterScreen from './Pages/RegisterScreen/RegisterScreen';
import AdminScreen from './Pages/Admin/Admin';
import SearchMovieScreen from './Pages/SearchMovieScreen/SearchMovieScreen';
import { Header } from './Pages/HomeScreen/Header';
import {NavBar} from './Pages/NavBar/NavBar';
import {LoginScreen} from './Pages/LoginScreen/LoginScreen';
//////////////////////////////////////////////////////////////
import AllScreenStyles from './Pages/HomeScreen/AllScreen_styles';
import { s } from "react-native-wind"



const Stack = createStackNavigator();

export default function App() {


  
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <View style = {[AllScreenStyles.homeContainer, s`bg-green-800`]}>

         <Header />
          <Stack.Navigator initialRouteName='allmovies' detachInactiveScreens = {false}>
            <Stack.Screen name = 'allmovies' component= {AllMoviesScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'trending' component= {TrendingScreen} options={{headerShown:false}} />
            <Stack.Screen name = 'movieInfo' component= {MovieInfoScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'login' component= {LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'register' component= {RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'admin' component= {AdminScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'searchMovie' component= {SearchMovieScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
          <NavBar />

      </View>
    </NavigationContainer>
  );

}


