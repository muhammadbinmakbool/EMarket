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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string()
    .email('Provide a Valid email address')
    .required('Required'),
  location: Yup.string()
    .min(3, 'Provide a Valid Location')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Provide a Valid Username')
    .required('Required'),
});

const SignupPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

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

  const registerUser = async values => {
    setLoader(true);
    console.log(values);
    try {
      const endpoint = 'http://10.0.2.2:3000/api/register';
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        navigation.replace('Login');
      }
    } catch (error) {
      console.log('Error Registering the User', error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={{
              height: SIZES.height / 3.4,
              width: SIZES.width - 60,
              resizeMode: 'contain',
              marginBottom: SIZES.xxLarge,
            }}
          />
          <Text style={styles.title}> Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              location: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => registerUser(values)}>
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
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Username"
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onFocus={() => {
                        setFieldTouched('username');
                      }}
                      onBlur={() => {
                        setFieldTouched('username', '');
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMsg}>{errors.username}</Text>
                  )}
                </View>

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

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Location"
                      value={values.location}
                      onChangeText={handleChange('location')}
                      onFocus={() => {
                        setFieldTouched('location');
                      }}
                      onBlur={() => {
                        setFieldTouched('location', '');
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMsg}>{errors.location}</Text>
                  )}
                </View>
                <Button
                  title={'S I G N U P'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignupPage;

// const styles = StyleSheet.create({});
