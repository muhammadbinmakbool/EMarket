import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Cart,
  NewRivals,
  ProductDetails,
  LoginPage,
  Orders,
  Favorites,
  SignupPage,
} from './src/screens';
import useFetch from './src/hook/useFetch';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const {userId} = useFetch();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{headerShown: false}}
          initialParams={{totalCartItems: totalCartItems, userId: userId}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
          initialParams={{userId: userId, setTotalCartItems: setTotalCartItems}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
          initialParams={{userId: userId}}
        />
        <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{headerShown: false}}
          initialParams={{userId: userId}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
