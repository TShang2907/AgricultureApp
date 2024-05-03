import { useState, useEffect, useContext } from "react";
import Paho from "paho-mqtt";
import { Modal, Text, Animated, View, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styleController";
import { useMqtt } from "../../../dataProvider";

// Van trộn dung dịch dinh dưỡng
const payload_valve = {
  station_id: "VALVE_0001",
  station_name: "Van dien tu",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    { sensor_id: "valve_0001", sensor_name: "Van nuoc 1", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "valve_0002", sensor_name: "Van nuoc 2", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "valve_0003", sensor_name: "Van nuoc 3", sensor_value: 0, sensor_unit: "" }
  ]
};

// Máy bơm và phân khu
const payload_pump = {
  station_id: "PUMP_0001",
  station_name: "He Thong Bom",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    { sensor_id: "pump_0001", sensor_name: "Phan khu 1", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "pump_0002", sensor_name: "Phan khu 2", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "pump_0003", sensor_name: "Phan khu 3", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "pump_0004", sensor_name: "Phan khu 4", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "pump_0005", sensor_name: "Phan khu 5", sensor_value: 0, sensor_unit: "" }
  ]

}
export default function Controller() {
  const navigation = useNavigation();
  const translateX = new Animated.Value(-400);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const [isFirstValve, setIsFirstValve] = useState(true);
  const [isFirstPump, setIsFirstPump] = useState(true);

  const { updateData, messageValvecontroller, messagePumpcontroller } = useMqtt();
  //console.log('messageValvecontroller', JSON.parse(messageValvecontroller));
  //console.log('messagePumpcontroller', JSON.parse(messagePumpcontroller));

  //Valve
  const [isEnabled1, setIsEnabled1] = useState(JSON.parse(messageValvecontroller).sensors[0].sensor_value);
  //const [isEnabled1, setIsEnabled1] = useState(false);

  const [isEnabled2, setIsEnabled2] = useState(JSON.parse(messageValvecontroller).sensors[1].sensor_value);
  //const [isEnabled2, setIsEnabled2] = useState(false);

  const [isEnabled3, setIsEnabled3] = useState(false);

  //Pump
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  //const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(JSON.parse(messagePumpcontroller).sensors[3].sensor_value);
  //const [isEnabled8, setIsEnabled8] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(JSON.parse(messagePumpcontroller).sensors[4].sensor_value);

  //Update Valvecontroller to server
  useEffect(() => {
    setIsFirstValve(false);
  }, [messageValvecontroller]);
  //Update Valvecontroller to server
  useEffect(() => {
    setIsFirstPump(false);
  }, [messagePumpcontroller]);


  //isEnabled1
  useEffect(() => {
    console.log('isEnabled1: ', isEnabled1);

    payload_valve.sensors[0].sensor_value = Number(isEnabled1);
    if (isFirstValve == false) {
      updateData(payload_valve);
      console.log('Send isEnabled1: ', isEnabled1);
    }

  }, [isEnabled1]);

  //isEnabled2
  useEffect(() => {
    console.log('isEnabled2: ', isEnabled2);

    payload_valve.sensors[1].sensor_value = Number(isEnabled2);
    if (isFirstValve == false) {
      updateData(payload_valve);
      console.log('Send isEnabled2: ', isEnabled1);
    }
  }, [isEnabled2]);

  //Update Pumpcontroller to server

  //isEnabled7
  useEffect(() => {
    console.log('isEnabled7: ', isEnabled7);

    payload_pump.sensors[3].sensor_value = Number(isEnabled7);
    if (isFirstPump == false) {
      updateData(payload_pump);
      console.log('Send isEnabled7: ', isEnabled1);
    }
  }, [isEnabled7]);

  // isEnabled8
  useEffect(() => {
    console.log('isEnabled8: ', isEnabled8);
    payload_pump.sensors[4].sensor_value = Number(isEnabled8);
    if (isFirstPump == false) {
      updateData(payload_pump);
      console.log('Send isEnabled8: ', isEnabled1);
    }
  }, [isEnabled8]);

  //Valve
  const toggleSwitch1 = () => { setIsEnabled1(previousState => !previousState) };
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
