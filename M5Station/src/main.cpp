#include <M5Station.h>
#include <WiFi.h>
#include "MQTT.h"
#include "Unit_4RELAY.h"
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define SSID_WIFI "HUYNH NGOC"
#define PASS_WIFI "HN200912@"
#define MQTT_SERVER "mqttserver.tk"
#define USERNAME "innovation"
#define PASSWORD "Innovation_RgPQAZoA5N"
#define VALVE_TOPIC "/innovation/valvecontroller/station"
#define PUMP_TOPIC "/innovation/pumpcontroller/station"
#define SENSOR_DATA_TOPIC "/innovation/airmonitoring/NBIOTs"
#define SCHEDULE_TOPIC "/innovation/valvecontroller/schedulelist"
#define BUFFER_SIZE 2048
// Class 4 Relay
UNIT_4RELAY relay;
// Class MyMQTT
MyMQTT mqtt(MQTT_SERVER, USERNAME, PASSWORD, BUFFER_SIZE); // Initialize MQTT Server
// Json data
StaticJsonDocument<300> doc;
StaticJsonDocument<300> sensors_json;
StaticJsonDocument<100> valve_json;
StaticJsonDocument<100> pump_json;
uint8_t relayArray[8] = {0, 0, 0, 0, 0, 0, 0, 0};
bool isFirst = true;
bool isSchedule = false;
unsigned long countTime = 0;
TaskHandle_t schedule = NULL;
const long utcOffsetInSeconds = 7 * 3600; // Điều chỉnh múi giờ (nếu cần) UTC+7
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);
/////////////////////////////////////////////////////////////////////////////////

// Setup wifi
void setupWifi()
{
  M5.Lcd.printf("Connecting to %s", SSID_WIFI);
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(SSID_WIFI, PASS_WIFI);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    M5.Lcd.print(".");
  }
  M5.Lcd.printf("\nSuccessful Wifi connection\n");
}
// task
void taskSchedule(void *pvParameters)
{
  TickType_t xLastWakeTime;
  const TickType_t xFrequency = 1000 / portTICK_PERIOD_MS; // Độ trễ giữa các lần thực thi (5000ms)
  xLastWakeTime = xTaskGetTickCount();                     // Lấy thời gian hiện tại

  // Lấy thời gian hiện tại và in ra
  timeClient.update();
  unsigned long timeCurrent = timeClient.getHours() * 60 + timeClient.getMinutes();
  Serial.print("Current time: ");
  Serial.println(timeCurrent);

  // Lấy thời gian bắt đầu
  String strTimeStart = doc["schedule_list"][0]["startTime"];

  unsigned long timeStart = strTimeStart.substring(0, 2).toInt() * 60 + strTimeStart.substring(3).toInt();
  Serial.println("Start time: ");
  Serial.println(timeStart);

  countTime = timeCurrent - timeStart;
  while (countTime > 0)
  {
    Serial.println("Count time: ");
    Serial.println(countTime);
    vTaskDelay(xFrequency);
    (countTime)--;
  }
  isSchedule = true;
  vTaskDelete(schedule);
}
// Function Receive Data From MQTT Broker
void myReceiveFunction(char *topic, byte *payload, unsigned int length)
{
  M5.Lcd.println(topic);
  // isSchedule = true;
  //  Convert data to string
  char *data_sensor = reinterpret_cast<char *>(payload);
  //  Deserialize the JSON document
  DeserializationError error = deserializeJson(doc, data_sensor);
  // Test if parsing succeeds.
  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  JsonArray sensors = doc["sensors"].as<JsonArray>();

  if (doc["station_id"] == "VALVE_0001")
  {

    deserializeJson(valve_json, data_sensor);
    if (isFirst == false)
    {
      serializeJson(valve_json, Serial1);
    }
  }
  else if (doc["station_id"] == "PUMP_0001")
  {
    deserializeJson(pump_json, data_sensor);
    if (isFirst == false)
    {
      serializeJson(pump_json, Serial1);
    }
  }
  else if (doc["station_id"] == "air_0002")
  {

    deserializeJson(sensors_json, data_sensor);
    if (isFirst == false)
    {
      serializeJson(sensors_json, Serial1);
    }
  }
  else if (doc["station_id"] == "SCHEDULE_0001")
  {
    xTaskCreatePinnedToCore(taskSchedule, "taskSchedule", 4096, NULL, 1, &schedule, 0);
  }
}

// Message from Display
char *returnMessage()
{
  static char receivedData[20];

  // Kiểm tra dữ liệu được trả về từ UART
  int i = 0;
  while (Serial1.available() > 0 && i < sizeof(receivedData) - 1)
  {
    receivedData[i++] = Serial1.read(); // Đọc dữ liệu từ UART và ghi vào mảng kí tự
  }
  receivedData[i] = '\0'; // Kết thúc chuỗi kí tự

  return receivedData; // Trả về con trỏ đến mảng kí tự
}

// task2
void task2(void *pvParameters)
{
  while (true)
  {
    Serial.print("Task2");
    Serial.println(millis());
    delay(1000);
  }
}

//////////////////////////////////////////////////

void setup()
{
  // Initialize M5Station.
  M5.begin();
  // task

  // xTaskCreatePinnedToCore(task2, "task2", 4096, NULL, 1, NULL, 0);
  //  Setup UART 1
  Serial1.begin(115200, SERIAL_8N1, 13, 14);

  // Initialize Wifi
  setupWifi();

  // Bắt đầu lấy thời gian từ máy chủ NTP
  timeClient.begin();

  // Connect to MQTT Broker
  if (mqtt.connectToMQTT())
  {
    M5.Lcd.print("Successful MQTT connection\n");
  }
  else
  {
    M5.Lcd.print("Failed MQTT connection\n");
  }

  // Subscribe to VALVE
  mqtt.subscribe(VALVE_TOPIC);
  // Subscribe to PUMP
  mqtt.subscribe(PUMP_TOPIC);
  // Subscribe to MONITOR
  mqtt.subscribe(SENSOR_DATA_TOPIC);
  // Subscribe to SCHEDULE_TOPIC
  mqtt.subscribe(SCHEDULE_TOPIC);

  // Set Receive Function Mqtt
  mqtt.setReceiveFunction(myReceiveFunction);

  // Initialize Unit_4Relay.
  if (relay.begin(&Wire, 32, 33))
  {
    M5.Lcd.printf("Successful Relay connection\n");
    relay.Init(1); // Async = 0, Sync = 1
  }
  else
  {
    M5.Lcd.printf("Failed Relay connection\n");
  }
}

/////////////////////////////////////////////////////////

void loop()
{
  char *receiveMessage = returnMessage();
  if (isFirst == true)
  {
    if (strcmp(receiveMessage, "START") == 0)
    {
      M5.Lcd.println("Returned message: " + String(receiveMessage));
      serializeJson(valve_json, Serial1);
    }
    else if (strcmp(receiveMessage, "OK_VALVE") == 0)
    {
      M5.Lcd.println("Returned message: " + String(receiveMessage));
      serializeJson(pump_json, Serial1);
    }
    else if (strcmp(receiveMessage, "OK_PUMP") == 0)
    {
      M5.Lcd.println("Returned message: " + String(receiveMessage));
      serializeJson(sensors_json, Serial1);
    }
    else if (strcmp(receiveMessage, "OK_SENSOR") == 0)
    {
      M5.Lcd.println("Returned message: " + String(receiveMessage));
      isFirst = false;
    }
  }

  mqtt.checkConnect(); // Check connected mqtt
  // M5.update(); // Update state button
  // if (M5.BtnA.wasPressed())
  // {
  //   serializeJson(doc, Serial1);
  //   M5.Lcd.println("Send data successfully");
  // }
  if (isSchedule)
  {
    Serial.print("Relay\n");
    isSchedule = false;
  }

  // Serial.println(millis());
  // delay(2000);
}
