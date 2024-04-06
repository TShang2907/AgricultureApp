import * as React from 'react';
//import AppNavigation from './navigation/navigation';
import Tabs from './navigation/tabs';
import MqttProvider from './dataProvider.js'
import { NavigationContainer } from '@react-navigation/native';

function App() {

  return (

    <MqttProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </MqttProvider>
  );

}

export default App;
