import { useState, useEffect, useContext } from "react";
import Paho from "paho-mqtt";
import { Modal, Text, Animated, View, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styleController";
import { MqttContext } from '../../../dataProvider'
// client2 = new Paho.Client(
//  "mqttserver.tk",
//   Number(9001),"/mqtt",
//   "mqtt-tester2"
// );

export default function Controller() {
  const navigation = useNavigation();
  const translateX = new Animated.Value(-400);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const dataReceived = useContext(MqttContext);

  console.log('Data to Controller', dataReceived);

  //Valve
  const [isEnabled1, setIsEnabled1] = useState(dataReceived.isEnabled1);
  const [isEnabled2, setIsEnabled2] = useState(dataReceived.isEnabled2);
  const [isEnabled3, setIsEnabled3] = useState(false);
  //Selector
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  //Pump
  const [isEnabled7, setIsEnabled7] = useState(dataReceived.isEnabled7);
  const [isEnabled8, setIsEnabled8] = useState(dataReceived.isEnabled8);

  useEffect(() => {
    console.log('isEnabled1: ', isEnabled1);
    //dataReceived.updateData(isEnabled1, 0);
  }, [isEnabled1]);

  useEffect(() => {
    console.log('isEnabled2: ', isEnabled2);
    //dataReceived.updateData(isEnabled2, 1);
  }, [isEnabled2]);

  useEffect(() => {
    console.log('isEnabled7: ', isEnabled7);
    //dataReceived.updateData(isEnabled7, 3);
  }, [isEnabled7]);

  useEffect(() => {
    console.log('isEnabled8: ', isEnabled8);
    //dataReceived.updateData(isEnabled8, 4);
  }, [isEnabled8]);

  //Valve
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  //Selector
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);
  const toggleSwitch5 = () => setIsEnabled5(previousState => !previousState);
  const toggleSwitch6 = () => setIsEnabled6(previousState => !previousState);
  //Pump
  const toggleSwitch7 = () => setIsEnabled7(previousState => !previousState);
  const toggleSwitch8 = () => setIsEnabled8(previousState => !previousState);



  //const updateData = useContext(MqttContext);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = () => {
    client.disconnect()
    navigation.navigate('Login')
  }

  const handleChangeScreen = () => {
    // await client.disconnect()
    navigation.navigate('Monitor')
  }


  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isMenuVisible ? 0 : -400,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuVisible]);

  // useEffect(() => {
  //   if (dataReceived.isEnabled1 != isEnabled1) {
  //     setIsEnabled1(dataReceived.isEnabled1 ? true : false);
  //   }

  // }, [dataReceived]);

  return (
    <View style={styles.container}>
      <Image
        blurRadius={70}
        style={styles.backgroundImage}
        source={require('../../../images/bg.png')}
      />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIconArea} onPress={openMenu}>
          <Image
            style={styles.menuIcon}
            source={require('../../../images/Logo4.png')}
          />
        </TouchableOpacity>
        <View style={styles.theoDoiCayTrongArea}>
          <Text style={styles.theoDoiCayTrong}>Điều khiển công tắc</Text>
        </View>
      </View>

      <View style={styles.buttonArea}>

        <View style={styles.dungDichArea}>
          <View style={styles.buttonAreaRow1}>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/valve.png')}
                />
                <Text style={styles.buttonText}>Dung dịch 1</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled1}
              />
            </View>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/valve.png')}
                />
                <Text style={styles.buttonText}>Dung Dịch 2</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
              />
            </View>
          </View>
          <View style={styles.buttonAreaRow2}>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/valve.png')}
                />
                <Text style={styles.buttonText}>Dung Dịch 3</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled3 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch3}
                value={isEnabled3}
              />
            </View>
          </View>
        </View>

        <View style={styles.phanKhuArea}>
          <View style={styles.buttonAreaRow3}>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/fertilizer.png')}
                />
                <Text style={styles.buttonText}>Phân Khu 1</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled4 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch4}
                value={isEnabled4}
              />
            </View>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/fertilizer.png')}
                />
                <Text style={styles.buttonText}>Phân Khu 2</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled5 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch5}
                value={isEnabled5}
              />
            </View>
          </View>
          <View style={styles.buttonAreaRow4}>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/fertilizer.png')}
                />
                <Text style={styles.buttonText}>Phân Khu 3</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled6 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch6}
                value={isEnabled6}
              />
            </View>
          </View>
        </View>

        <View style={styles.mayBomArea}>
          <View style={styles.buttonAreaRow5}>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/motor.png')}
                />
                <Text style={styles.buttonText}>Bơm Vào</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled7 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch7}
                value={isEnabled7}
              />
            </View>
            <View style={styles.switch1}>
              <View style={styles.iconAndText}>
                <Image
                  style={styles.menuIcon}
                  source={require('../../../images/motor.png')}
                />
                <Text style={styles.buttonText}>Bơm Ra</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled8 ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch8}
                value={isEnabled8}
              />
            </View>
          </View>
        </View>
      </View>


      <Modal visible={isMenuVisible} transparent>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Nửa trái của Modal */}
          <View style={{ flex: 2, backgroundColor: '#116979' }}>
            <View style={styles.pageListArea}>
              <TouchableOpacity style={styles.pageListComponent} onPress={handleChangeScreen}>
                <Text style={styles.pageListText}>Theo dõi cây trồng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pageListComponent}>
                <Text style={styles.pageListText} onPress={closeMenu}>Điều khiển công tắc</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.logoutArea}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.pageListText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nửa phải của Modal */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onPress={closeMenu}
          />
        </View>
      </Modal>
    </View>
  );
}
