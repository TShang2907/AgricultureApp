import React, { createContext, useState, useEffect } from 'react';
import Paho from 'paho-mqtt';

const MqttContext = createContext();
console.log("Render");
client = new Paho.Client(
  "mqttserver.tk",
  Number(9001), "/mqtt",
  "mqtt-tester"
);
// Van trộn dung dịch dinh dưỡng
const payload_valve = {
  station_id: "VALVE_0001",
  station_name: "Van dien tu",
  gps_longitude: 106.89,
  gps_latitude: 10.5,
  sensors: [
    { sensor_id: "valve_0001", sensor_name: "Van nuoc 1", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "valve_0002", sensor_name: "Van nuoc 2", sensor_value: 0, sensor_unit: "" },
    { sensor_id: "valve_003", sensor_name: "Van nuoc 3", sensor_value: 0, sensor_unit: "" }
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
export default MqttProvider = ({ children }) => {
  const [nitro, setNitro] = useState(0);
  const [photpho, setPhotpho] = useState(0);
  const [kali, setKali] = useState(0);
  const [elec, setElec] = useState(0);
  const [pH, setPH] = useState(0);
  const [valueTemp, setValueTemp] = useState([1, 2, 3, 4, 5]);
  const [labelTemp, setLabelTemp] = useState(['1', '2', '3', '4', '5']);
  const [valueHumi, setValueHumi] = useState([1, 2, 3, 4, 5]);

  // Valve
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  //const [isEnabled3, setIsEnabled3] = useState(false);

  // Pump
  //const [isEnabled4, setIsEnabled4] = useState(false);
  //const [isEnabled5, setIsEnabled5] = useState(false);
  //const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(false);

  //const [data, setData] = useState(false);
  //const [ID, setID] = useState(0);
  const updateData = (newData, id) => {

    if (id == 0 || id == 1) {
      payload_valve.sensors[id].sensor_value = Number(newData);
      const message = new Paho.Message(JSON.stringify(payload_valve));
      message.destinationName = ("/innovation/valvecontroller/station");
      client.send(message);
    } else {
      payload_pump.sensors[id].sensor_value = Number(newData);
      const message = new Paho.Message(JSON.stringify(payload_pump));
      message.destinationName = ("/innovation/pumpcontroller/station");
      client.send(message);
    }

  };

  useEffect(() => {
    client.connect({
      onSuccess: onConnect,
      mqttVersion: 3,
      useSSL: false,
      keepAliveInterval: 3000,
      userName: "innovation",
      password: "Innovation_RgPQAZoA5N",
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });

  }, [])

  function onConnect() {

    // client.subscribe("/innovation/airmonitoring/WSNs");
    // client.subscribe("/innovation/soilmonitoring/station");
    // client.subscribe("/innovation/valvecontroller/station");
    // client.subscribe("/innovation/pumpcontroller/station");
    // console.log("onConnect");
    // client.onMessage = onMessage;
    console.log("onConnect");
    client.subscribe("/innovation/airmonitoring/NBIOTs");
    client.subscribe("/innovation/pumpcontroller/station");
    client.subscribe("/innovation/valvecontroller/station");
    client.onMessageArrived = onMessage;

  }

  function processPumpControllerMessage(message) {
    const sensors = JSON.parse(message.payloadString).sensors;
    // setIsEnabled4(sensors[0].sensor_value ? true : false);

    // setIsEnabled5(sensors[1].sensor_value ? true : false);

    // setIsEnabled6(sensors[2].sensor_value ? true : false);

    setIsEnabled7(sensors[3].sensor_value ? true : false);

    setIsEnabled8(sensors[4].sensor_value ? true : false);

  }

  function processValveControllerMessage(message) {
    const sensors = JSON.parse(message.payloadString).sensors;

    setIsEnabled1(sensors[0].sensor_value ? true : false);
    setIsEnabled2(sensors[1].sensor_value ? true : false);
    //setIsEnabled3(sensors[2].sensor_value ? true : false);
  }
  function onMessage(message) {
    console.log(message.payloadString);

    if (message.topic == '/innovation/airmonitoring/station') {

      setValueTemp(pre => [...pre, JSON.parse(message.payloadString).sensors[0].sensor_value]);
      setValueHumi(pre => [...pre, JSON.parse(message.payloadString).sensors[1].sensor_value])
      var timeTemp = new Date();
      setLabelTemp(pre => [...pre, timeTemp.getHours().toString() + ':' + timeTemp.getMinutes().toString()])
    }

    if (message.topic == '/innovation/soilmonitoring/station') {

      setNitro(JSON.parse(message.payloadString).sensors[4].sensor_value)
      setPhotpho(JSON.parse(message.payloadString).sensors[5].sensor_value)
      setKali(JSON.parse(message.payloadString).sensors[6].sensor_value)
      setPH(JSON.parse(message.payloadString).sensors[2].sensor_value)
      setElec(JSON.parse(message.payloadString).sensors[3].sensor_value)
    }

    //
    if (message.topic === "/innovation/pumpcontroller/station") {
      processPumpControllerMessage(message);
    }
    else if (message.topic === "/innovation/valvecontroller/station") {
      processValveControllerMessage(message);
    }

  }

  return (
    <MqttContext.Provider value={{ valueTemp, setValueTemp, labelTemp, setLabelTemp, valueHumi, setValueHumi, updateData, isEnabled1, isEnabled2, isEnabled7, isEnabled8 }}>
      {children}
    </MqttContext.Provider>
  );
};

export { MqttContext };




