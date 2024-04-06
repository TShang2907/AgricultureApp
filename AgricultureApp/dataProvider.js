// dataProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import Paho from 'paho-mqtt';

const MqttContext = createContext();
const mqttClient = new Paho.Client("mqttserver.tk", Number(9001), "AppMobile");




const DataProvider = ({ children }) => {

  const [messageMonitoring, setMessageMonitoring] = useState('');
  const [messageValvecontroller, setMessageValvecontroller] = useState('');
  const [messagePumpcontroller, setmessagePumpcontroller] = useState('');
  const [messageSchedulelist, setMessageSchedulelist] = useState('');

  useEffect(() => {
    mqttClient.onConnectionLost = onConnectionLost;
    mqttClient.onMessageArrived = onMessageArrived;
    mqttClient.connect({
      onSuccess: onConnect,
      onFailure: onFailure,
      useSSL: false,
      userName: "innovation",
      password: "Innovation_RgPQAZoA5N"
    });

    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };

  }, []);

  function onConnect() {
    if (mqttClient) {
      mqttClient.subscribe("/innovation/airmonitoring/NBIOTs");
      mqttClient.subscribe("/innovation/valvecontroller/station");
      mqttClient.subscribe("/innovation/pumpcontroller/station");
      mqttClient.subscribe("/innovation/valvecontroller/schedulelist");
      console.log("Connected to MQTT server");
    }
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("Connection lost:", responseObject.errorMessage);
    }
  }

  function onFailure(errorMessage) {
    console.log("Failed to connect:", errorMessage);
  }

  // Data from server
  function onMessageArrived(message) {
    console.log("Topic:     " + message.destinationName);
    console.log("Message arrived:", message.payloadString);


    // Monitoring
    if (message.destinationName == "/innovation/airmonitoring/NBIOTs") {
      setMessageMonitoring(message.payloadString);
    }
    // Valecontroler
    if (message.destinationName == "/innovation/valvecontroller/station") {
      setMessageValvecontroller(message.payloadString);
    }
    // Pumpcontroler
    if (message.destinationName == "/innovation/pumpcontroller/station") {
      setmessagePumpcontroller(message.payloadString);
    }
    // Schedulelist
    if (message.destinationName == "/innovation/valvecontroller/schedulelist") {
      setMessageSchedulelist(message.payloadString);
    }

  }
  // Pushlish to server
  const updateData = (data) => {
    if (mqttClient && mqttClient.isConnected()) {
      if (data.station_id == "VALVE_0001") {
        const message = new Paho.Message(JSON.stringify(data));
        message.destinationName = "/innovation/valvecontroller/station";
        message.retained = true;
        mqttClient.send(message);
      } else if (data.station_id == "PUMP_0001") {
        const message = new Paho.Message(JSON.stringify(data));
        message.destinationName = "/innovation/pumpcontroller/station";
        message.retained = true;
        mqttClient.send(message);
      } else if (data.station_id == "SCHEDULE_0001") {
        console.log('Schedule publish:', data.schedule_list)
        const message = new Paho.Message(JSON.stringify(data));
        message.destinationName = "/innovation/valvecontroller/schedulelist";
        message.retained = true;
        mqttClient.send(message);
      }

    } else {
      console.log("Not connected to MQTT server");
    }
  };

  return (
    <MqttContext.Provider value={{ messageMonitoring, messageValvecontroller, messagePumpcontroller, messageSchedulelist, updateData }}>
      {children}
    </MqttContext.Provider>
  );

};
//Create hook to use
export const useMqtt = () => useContext(MqttContext);

export default DataProvider;

//value={{ valueTemp, setValueTemp, labelTemp, setLabelTemp, valueHumi, setValueHumi, updateData, isEnabled1, isEnabled2, isEnabled7, isEnabled8 }}

// import React, { createContext, useState, useEffect } from 'react';
// import Paho from 'paho-mqtt';

// // Tao context DataProvider
// const MqttContext = createContext();

// //Tạo Client MQTT
// client = new Paho.Client("mqttserver.tk", Number(9001), "AppMobile")




// export default MqttProvider = ({ children }) => {
//   const [nitro, setNitro] = useState(0);
//   const [photpho, setPhotpho] = useState(0);
//   const [kali, setKali] = useState(0);
//   const [elec, setElec] = useState(0);
//   const [pH, setPH] = useState(0);
//   const [valueTemp, setValueTemp] = useState([1, 2, 3, 4, 5]);
//   const [labelTemp, setLabelTemp] = useState(['1', '2', '3', '4', '5']);
//   const [valueHumi, setValueHumi] = useState([1, 2, 3, 4, 5]);

//   // Valve
//   const [isEnabled1, setIsEnabled1] = useState(false);
//   const [isEnabled2, setIsEnabled2] = useState(false);
//   //const [isEnabled3, setIsEnabled3] = useState(false);

//   // Pump
//   //const [isEnabled4, setIsEnabled4] = useState(false);
//   //const [isEnabled5, setIsEnabled5] = useState(false);
//   //const [isEnabled6, setIsEnabled6] = useState(false);
//   const [isEnabled7, setIsEnabled7] = useState(false);
//   const [isEnabled8, setIsEnabled8] = useState(false);

//   useEffect(() => {
//     client.connect({
//       onSuccess: onConnect,
//       mqttVersion: 3,
//       useSSL: false,
//       keepAliveInterval: 3000,
//       userName: "innovation",
//       password: "Innovation_RgPQAZoA5N",
//       onFailure: () => {
//         console.log("Failed to connect!");
//       }
//     });
//   }, []);


//   //const updateData = (newData, id) => {
//   // ConnectToMqtt();
//   // if (client.isConnected()) {
//   //   console.log('Connecttttt');
//   // } else {
//   //   console.log('Not Connect');
//   // }
//   // if (id == 0 || id == 1) {
//   //   payload_valve.sensors[id].sensor_value = Number(newData);
//   //   const message = new Paho.Message(JSON.stringify(payload_valve));
//   //   message.destinationName = ("/innovation/valvecontroller/station");
//   //   client.send(message);
//   // } else {
//   //   payload_pump.sensors[id].sensor_value = Number(newData);
//   //   const message = new Paho.Message(JSON.stringify(payload_pump));
//   //   message.destinationName = ("/innovation/pumpcontroller/station");
//   //   client.send(message);
//   // }
//   //};
//   function onConnect() {
//     console.log('Connect Successfuly !!');
//     client.subscribe("/innovation/valvecontroller/station");
//     client.onMessageArrived = onMessage;
//   }

//   function onMessage(message) {
//     console.log("Message Arrived: " + message.payloadString);
//     console.log("Topic:     " + message.destinationName);
//     console.log("QoS:       " + message.qos);
//     console.log("Retained:  " + message.retained);
//     setValue(message.payloadString);
//   }

//   const updateData = () => {
//     const message = new Paho.Message("Hello");
//     message.destinationName = "/innovation/valvecontroller/station";
//     message.retained = true;
//     message.qos = 0;
//     client.send(message);
//   }
//   // const updateSchedule = (scheduleList) => {
//   // console.log('Update Schedule At Local: ', scheduleList);

//   // const jsonArray = scheduleList.map(schedule => JSON.stringify(schedule));

//   // const dataToSend = {
//   //   scheduleList: jsonArray
//   // };

//   // // Chuyển đối tượng thành chuỗi JSON
//   // const jsonString = JSON.stringify(dataToSend);

//   // const message = new Paho.Message(jsonString);
//   // // message.destinationName = ("/innovation/pumpcontroller/schedulelist");
//   // // client.send(message);
//   //}





//   // function processPumpControllerMessage(message) {
//   //   const sensors = JSON.parse(message.payloadString).sensors;
//   //   // setIsEnabled4(sensors[0].sensor_value ? true : false);

//   //   // setIsEnabled5(sensors[1].sensor_value ? true : false);

//   //   // setIsEnabled6(sensors[2].sensor_value ? true : false);

//   //   setIsEnabled7(sensors[3].sensor_value ? true : false);

//   //   setIsEnabled8(sensors[4].sensor_value ? true : false);

//   // }

//   // function processValveControllerMessage(message) {
//   //   const sensors = JSON.parse(message.payloadString).sensors;

//   //   setIsEnabled1(sensors[0].sensor_value ? true : false);
//   //   setIsEnabled2(sensors[1].sensor_value ? true : false);
//   //   //setIsEnabled3(sensors[2].sensor_value ? true : false);
//   // }



//   // if (message.topic == '/innovation/airmonitoring/station') {

//   //   setValueTemp(pre => [...pre, JSON.parse(message.payloadString).sensors[0].sensor_value]);
//   //   setValueHumi(pre => [...pre, JSON.parse(message.payloadString).sensors[1].sensor_value])
//   //   var timeTemp = new Date();
//   //   setLabelTemp(pre => [...pre, timeTemp.getHours().toString() + ':' + timeTemp.getMinutes().toString()])
//   // }

//   // if (message.topic == '/innovation/soilmonitoring/station') {

//   //   setNitro(JSON.parse(message.payloadString).sensors[4].sensor_value)
//   //   setPhotpho(JSON.parse(message.payloadString).sensors[5].sensor_value)
//   //   setKali(JSON.parse(message.payloadString).sensors[6].sensor_value)
//   //   setPH(JSON.parse(message.payloadString).sensors[2].sensor_value)
//   //   setElec(JSON.parse(message.payloadString).sensors[3].sensor_value)
//   // }

//   // //
//   // if (message.topic === "/innovation/pumpcontroller/station") {
//   //   processPumpControllerMessage(message);
//   // }
//   // else if (message.topic === "/innovation/valvecontroller/station") {
//   //   processValveControllerMessage(message);
//   // }

//   //}

//   return (
//     <MqttContext.Provider value={{ valueTemp, setValueTemp, labelTemp, setLabelTemp, valueHumi, setValueHumi, updateData, isEnabled1, isEnabled2, isEnabled7, isEnabled8 }}>
//       {children}
//     </MqttContext.Provider>
//   );
// };

// export { MqttContext };




