import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/outside/login';
import Register from '../screens/outside/register';
import Monitor from '../screens/inside/cropMonitor/monitor';
import Controller from '../screens/inside/controller/controller'
import MqttProvider from '../dataProvider'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import ScheduleStack from '../screens/inside/schedule/scheduleStack';
import ScreenTest from '../ScreenTest';

const Tab = createBottomTabNavigator();
import { useMqtt } from '../dataProvider';

function Tabs() {


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.container,
        tabBarActiveTintColor: '#FFD826',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: styles.text
      }}

    >
      {/* <Tab.Screen
        name="ScreenTest"
        component={ScreenTest}
        options={{
          title: 'ScreenTest',
          tabBarIcon: ({ color }) => <MaterialIcons name="schedule" size={24} color="white" />
        }}
      /> */}
      <Tab.Screen
        name="Monitor"
        component={Monitor}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color="white" />,

        }}
      />
      <Tab.Screen
        name="Controller"
        component={Controller}
        options={{
          title: 'Điều khiển',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color="white" />
        }}
      />
      <Tab.Screen
        name="ScheduleStack"
        component={ScheduleStack}
        options={{
          title: 'Lập lịch',
          tabBarIcon: ({ color }) => <MaterialIcons name="schedule" size={24} color="white" />
        }}
      />

    </Tab.Navigator>

  );
}

export default Tabs;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: 65,
    bottom: 0,
    backgroundColor: 'rgba(108, 221, 208, 0.4)',
    //borderRadius: 20
  },
  text: {
    bottom: 5,
    fontSize: 12
  }
})

