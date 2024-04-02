import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styleRegister';
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        blurRadius={70}
        style={styles.backgroundImage}
        source={require('../../images/bg.png')}
      />
      <View style={styles.logo}>
        <Image
          style={styles.logoIcon}
          source={require('../../images/Logo4.png')}
        />
        <Text style={styles.dangNhap}>Đăng Ký</Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor='#fff'
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor='#fff'
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          placeholderTextColor='#fff'
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={true}
          placeholderTextColor='#fff'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle register button press
          }}
        >
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
        <View style={styles.haveAnAccount}>
          <Text style={styles.chuaCoTaiKhoan}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signinButton}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;