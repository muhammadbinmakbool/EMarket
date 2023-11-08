import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './loginPage.style';
import {BackBtn, Button} from '../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string()
    .email('Provide a Valid email address')
    .required('Required'),
});

const LoginPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const login = async values => {
    setLoader(true);
    try {
      const endpoint = 'http://10.0.2.2:3000/api/login';
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData),
        );
        await AsyncStorage.setItem('id', JSON.stringify(responseData._id));
        navigation.replace('Bottom Navigation');
      } else {
        Alert.alert('Error Logging In', 'Please provide Valid Credentials', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'Continue',
            onPress: () => console.log('Logout Pressed'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Ooops, Error Logging in. Try Again with Correct Credentials',
        [
          {
            text: 'Cancel',
            onPress: () => console.log(error),
          },
          {
            text: 'Continue',
            onPress: () => console.log('Logout Pressed'),
          },
        ],
      );
    } finally {
      setLoader(false);
    }
  };

  const inValidForm = () => {
    Alert.alert('Invalid Form', 'Please provide all Fields', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Continue',
        onPress: () => console.log('Logout Pressed'),
      },
      {defaultIndex: 1},
    ]);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}> Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => login(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      keyboardType="email-address"
                      placeholder="Enter Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => {
                        setFieldTouched('email', '');
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMsg}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="Enter Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => {
                        setFieldTouched('password', '');
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMsg}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  title={'L O G I N'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
                <Text
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}
                  style={styles.registration}>
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
