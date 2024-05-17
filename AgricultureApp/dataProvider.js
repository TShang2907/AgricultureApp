// dataProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
const MqttContext = createContext();
const mqttClient = new Paho.Client("mqttserver.tk", Number(9001), "AppMobile");

const apiKey = 'AIzaSyCGQxAPIFmR03S3CbNDtulHhxfdAQNmTbM';
const parameter1 = 'majorDimension=COLUMNS';
const parameter2 = 'valueRenderOption=FORMULA';
const parameter3 = 'dateTimeRenderOption=FORMATTED_STRING';
let startRow = 300
let startRow_Prediction = 300


const DataProvider = ({ children }) => {

  //const [messageMonitoring, setMessageMonitoring] = useState('');
  const [messageValvecontroller, setMessageValvecontroller] = useState('');

  const [messagePumpcontroller, setmessagePumpcontroller] = useState('');
  const [messageSchedulelist, setMessageSchedulelist] = useState('');
  //const [isInitialized, setIsInitialized] = useState(true);

  const [sensorData, setSensorData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

  // const sheetRange_real = 'RealData!B' + startRow + ':K';
  // const sheetRange_prediction = 'PredictionData!B' + startRow + ':K';


  // Khởi tạo một đối tượng GoogleSpreadsheet
  const sheetId = '1qO1gqFsBra6mbL7lR1GeKLbJBeAL10zf1mfkAdoFPk0';

  const fetchData = async (sheetName, numRow) => {

    const sheetRange = sheetName + '!B' + numRow + ':K';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}&${parameter1}&${parameter2}&${parameter3}`;


    try {
      const response = await fetch(url);
      if (response?.ok) {
        const jsonData = await response.json();

        if (jsonData.values[0].length > 9) {
          const delay = jsonData.values[0].length - 9;
          if (sheetName == "Data") {
            startRow = startRow + delay;
            fetchData(sheetName, startRow);
          } else {
            startRow_Prediction = startRow_Prediction + delay;
            fetchData(sheetName, startRow_Prediction);
          }
        } else {

          if (sheetName == "PredictionData_1") {
            setPredictionData(jsonData.values)
            console.log("Số hàng PredictionData_1", numRow);

          } else {
            setSensorData(jsonData.values);
            console.log("Số hàng Data", numRow);
            //fetchData("PredictionData_1", startRow_Prediction);
          }

        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };


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
      mqttClient.subscribe("/innovation/airmonitoring/AI");
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
    //console.log("Message arrived:", message.payloadString);

    // Monitoring
    if (message.destinationName == "/innovation/airmonitoring/NBIOTs") {
      fetchData("Data", startRow);
    }
    if (message.destinationName == "/innovation/airmonitoring/AI") {
      fetchData("PredictionData_1", startRow_Prediction);
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
    <MqttContext.Provider value={{ predictionData, sensorData, messageValvecontroller, messagePumpcontroller, messageSchedulelist, updateData }}>
      {children}
    </MqttContext.Provider>
  );

};
//Create hook to use
export const useMqtt = () => useContext(MqttContext);

export default DataProvider;





