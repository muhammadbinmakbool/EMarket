import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './profile.style';
import {COLORS, SIZES} from '../constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useFetch from '../hook/useFetch';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const {userId} = useFetch();

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error retrieving Data', error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([useId, 'id']);
      navigation.replace('Bottom Navigation');
    } catch (error) {
      console.log('Error Logging Out the User', error);
    }
  };

  const logout = () => {
    Alert.alert('Logout', 'Are you sure You want to Logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Continue',
        onPress: () => userLogout(),
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure You want to Delete all saved Data on your device',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Clear Cache'),
        },
        {
          text: 'Continue',
          onPress: () => console.log(clearData()),
        },
      ],
    );
  };

  const deleteAccount = () => {
    Alert.alert('Logout', 'Are you sure You want to Delete your Account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Delete Account'),
      },
      {
        text: 'Continue',
        onPress: () => console.log('Delete Account Pressed'),
      },
    ]);
  };

  const clearData = async () => {
    const endpoint = `http://10.0.2.2:3000/api/cart/delete/${userId}`;
    try {
      // Remove cart data
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        console.log('Cart Deleted');
      } else {
        console.log('Error Deleting Cart');
      }
    } catch (cartError) {
      console.log('Error Clearing Cart Data', cartError);
    }

    try {
      const res = await AsyncStorage.removeItem(`user${userId}fav`);
      if (!res) {
        console.log('Favorites Removed');
      } else {
        console.log('Error Removing Favorites');
      }
    } catch (favoritesError) {
      console.log('Error Clearing Favorites Data', favoritesError);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{width: '100%'}}>
          <Image
            source={require('../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true
              ? userData.username
              : 'Please Login into your Account'}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}> L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}> {userData.email} </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesignIcon
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesignIcon
                    name="logout"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
