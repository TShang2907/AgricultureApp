#include <M5Station.h>
#include <WiFi.h>
#include "MQTT.h"
#include "Unit_4RELAY.h"
#include <ArduinoJson.h>

#define SSID_WIFI "HUYNH NGOC"  
#define PASS_WIFI "HN200912@"
#define MQTT_SERVER "mqttserver.tk"
#define USERNAME "innovation"
#define PASSWORD "Innovation_RgPQAZoA5N"
#define BUFFER_SIZE 2048
#define VALVE_TOPIC "/innovation/valvecontroller/station"
#define PUMP_TOPIC "/innovation/pumpcontroller/station"
#define SENSOR_DATA_TOPIC "/innovation/airmonitoring/NBIOTs"

#define SERIAL_BUFFER_SIZE 512

UNIT_4RELAY relay;
// Class MyMQTT
MyMQTT mqtt(MQTT_SERVER,USERNAME,PASSWORD,BUFFER_SIZE); //Initialize MQTT Server

StaticJsonDocument<500> doc;
StaticJsonDocument<300> sensors_json;
StaticJsonDocument<100> relay_json;
uint8_t relayArray[8] = {0, 0, 0, 0, 0, 0, 0, 0};




int value=0;
int relay_id=0;


// Function Setup WIFI
void setupWifi(){
  M5.Lcd.printf("Connecting to %s", SSID_WIFI);
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(SSID_WIFI, PASS_WIFI);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    M5.Lcd.print(".");
  }
  M5.Lcd.printf("\nSuccessful Wifi connection\n");
}

// Function Receive Data From MQTT Broker
void myReceiveFunction (char* topic, byte* payload, unsigned int length){
  M5.Lcd.println("Message arrived from :");
  M5.Lcd.println(topic);
  // Convert data to string
  char* data_sensor=reinterpret_cast<char*>(payload);
  //M5.Lcd.println(data_sensor);
  
  
  //Serial1.write(data_sensor);
  // Deserialize the JSON document
  DeserializationError error = deserializeJson(doc,data_sensor);

  //serializeJson(doc, Serial1);

  // Test if parsing succeeds.
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }


  JsonArray sensors = doc["sensors"].as<JsonArray>();

  

  if(doc["station_id"]=="VALVE_0001" || doc["station_id"]=="PUMP_0001" ){

    int index=0;
    relay_json["station_id"] = doc["station_id"];
    
    if(doc["station_id"]=="PUMP_0001"){
      index=index+3;
    }

    for (JsonVariant sensor : sensors) {
        uint8_t value=(uint8_t)sensor["sensor_value"];
        M5.Lcd.print(value);
        if(relayArray[index]!=value){
          relayArray[index]=value;
          relay_json["index"]=index;
          relay_json["value"]=relayArray[index];
          serializeJson(relay_json, Serial1);
          delay(1000);
        }
        index++;   
    }
  }

  // Monitor
  
  if(doc["station_id"]=="air_0002"){

    int index_sensor=0;     
    sensors_json["station_id"]=doc["station_id"];

    for (JsonVariant sensor : sensors) {
      
        sensors_json["index"]=index_sensor;
        sensors_json["value"]=sensor["value"];

        serializeJson(sensors_json, Serial1);
        delay(1000);
        index_sensor++;   
    }
  }

}

 


void setup() {
  // Initialize M5Station. 
  M5.begin();            
  Serial.begin(115200);
  //Đặt dung lượng bộ đệm cho RX và TX
  Serial1.setTxBufferSize(SERIAL_BUFFER_SIZE);
  Serial1.setRxBufferSize(SERIAL_BUFFER_SIZE);
  Serial1.begin(115200, SERIAL_8N1, 13,14);

  // Initialize Wifi
  setupWifi();            

  // Connect to MQTT Broker
  if(mqtt.connectToMQTT()){         
    M5.Lcd.print("Successful MQTT connection\n");
  }else{
    M5.Lcd.print("Failed MQTT connection\n");
  }

  // Subscribe to VALVE
  if(mqtt.subscribe(VALVE_TOPIC)){
    M5.Lcd.print("Successful MQTT subscribing\n");
  }else{
    M5.Lcd.print("Failed MQTT subscribing\n");
  }
  // Subscribe to PUMP
  if(mqtt.subscribe(PUMP_TOPIC)){
    M5.Lcd.print("Successful MQTT subscribing\n");
  }else{
    M5.Lcd.print("Failed MQTT subscribing\n");
  }
  //Subscribe to MONITOR
  if(mqtt.subscribe(SENSOR_DATA_TOPIC)){
    M5.Lcd.print("Successful MQTT subscribing\n");
  }else{
    M5.Lcd.print("Failed MQTT subscribing\n");
  }

  // Set Receive Function 
  mqtt.setReceiveFunction(myReceiveFunction);
  // Initialize Unit_4Relay.
  if(relay.begin(&Wire, 32, 33)) {   
    M5.Lcd.printf("Successful Relay connection\n");
    relay.Init(1);  // Async = 0, Sync = 1  
  }else
  {
    M5.Lcd.printf("Failed Relay connection\n");
  }
  
  
}

void loop() {
  
  if (Serial1.available()>0){
     String receivedData = "";
    while (Serial1.available() > 0) {
      char receivedChar = (char)Serial1.read();
      receivedData += receivedChar;
    }
    // Xử lý dữ liệu nhận được ở đây
    M5.Lcd.println("Received data from Serial1: " + receivedData);
    }
    
  if (M5.BtnC.wasPressed()) {
    //Serial1.write("hello");
    
    if(serializeJson(relay_json, Serial1)) {M5.Lcd.printf("Sucessful Sending\n");}

  }

  mqtt.checkConnect();
 
 
  if (M5.BtnA.wasPressed()) {
    if(relay_id<3){ relay_id++;}
    else{relay_id=0;}
    
  }

  if (M5.BtnB.wasPressed()) {
    if(value==0){
      value=1;
    }else{
      value=0;
    }
    relay.relayWrite(relay_id,value);
    M5.Lcd.printf("Realay%d: ",relay_id);
    M5.Lcd.printf("%d\n",value);
  }
  M5.update();

}
