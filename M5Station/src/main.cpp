#include <M5Station.h>
#include <WiFi.h>
#include "MQTT.h"
#include "Unit_4RELAY.h"
// #include "RS485_RELAY.h"
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <Wire.h>

// #define RS485_RX 1
// #define RS485_TX 3
// HardwareSerial RS485(2);

#define SSID_WIFI "OPPO K3"
#define PASS_WIFI "29072001"
#define MQTT_SERVER "mqttserver.tk"
#define USERNAME "innovation"
#define PASSWORD "Innovation_RgPQAZoA5N"
#define VALVE_TOPIC "/innovation/valvecontroller/station1"
#define PUMP_TOPIC "/innovation/pumpcontroller/station1"
#define SENSOR_DATA_TOPIC "/innovation/airmonitoring/NBIOTs"
#define SCHEDULE_TOPIC "/innovation/valvecontroller/schedulelist1"
#define BUFFER_SIZE 2048
typedef struct
{
  // Pointer to the task
  // void (*pTask)(void);
  // Delay tick untill the fucntion will be run
  int Delay;
  // Interval (ticks) between subsequent run
  uint32_t Period;
  uint8_t RunMe;
  uint8_t Cycle;
  uint8_t TaskID;
  uint8_t Area;
  uint8_t DelayStart;
  uint8_t DelayEnd;
  const char *Status;
} sTask;

typedef struct
{
  int Delay;
  uint8_t RunMe;
} rTask;

#define SCH_MAX_TASKS 10
#define RUN_MAX_TASKS 5
rTask RUN_tasks_G[RUN_MAX_TASKS];
sTask SCH_tasks_G[SCH_MAX_TASKS];

// Class 4 Relay
UNIT_4RELAY relay;

// Class RS485 Relay
// RS485_RELAY rs_relay;

// Class MyMQTT
MyMQTT mqtt(MQTT_SERVER, USERNAME, PASSWORD, BUFFER_SIZE); // Initialize MQTT Server
// Json data
StaticJsonDocument<300> sensors_json;
StaticJsonDocument<100> valve_json;
StaticJsonDocument<100> pump_json;
StaticJsonDocument<300> schedule_json;
uint8_t relayArray[8] = {0, 0, 0, 0, 0, 0, 0, 0};
bool isFirst = true;
bool isRun = false;
int countTimeout = 0;

int index_schedule = 0;

const long utcOffsetInSeconds = 7 * 3600; // Điều chỉnh múi giờ (nếu cần) UTC+7
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

// Timer Interrupt
hw_timer_t *timer = NULL;
volatile uint32_t counterTimer = 0;
/////////////////////////////////////////////////////////////////////////////////
void controllRelay(int index, bool state)
{
  relay.relayWrite(index, state);
  Serial.print("Controll Relay: ");
  Serial.print(index);
  Serial.print(" : ");
  Serial.println(state);
}
void updateStatus(String str, int Index)
{
  // Update Server
  String schedule_str;
  schedule_json["schedule_list"][Index]["status"] = str;

  if (str == "SUSPENDED" || str == "DONE")
  {
    schedule_json["schedule_list"][Index]["isActive"] = false;
  }

  serializeJson(schedule_json, schedule_str);
  const char *shedule_char1 = schedule_str.c_str();
  mqtt.publish(SCHEDULE_TOPIC, shedule_char1);
}

void SCH_Init()
{
  for (int i = 0; i < SCH_MAX_TASKS; i++)
  {
    SCH_tasks_G[i].Delay = -1;
    SCH_tasks_G[i].Period = 0;
    SCH_tasks_G[i].RunMe = 0;
    SCH_tasks_G[i].Cycle = 0;
    SCH_tasks_G[i].Status = "NULL";
    SCH_tasks_G[i].Area = 1;
    SCH_tasks_G[i].DelayStart = -1;
    SCH_tasks_G[i].DelayEnd = -1;
  }
}
// void RUN_Init()
// {
//   for (int i = 0; i < RUN_MAX_TASKS; i++)
//   {
//     RUN_tasks_G[i].Delay = -1;
//     RUN_tasks_G[i].RunMe = 0;
//   }
// }
// void RUN_Update()
// {
//   unsigned char Index;
//   for (Index = 0; Index < RUN_MAX_TASKS; Index++)
//   {
//     if (RUN_tasks_G[Index].Delay == 0)
//     {
//       RUN_tasks_G[Index].RunMe = 1;
//     }
//     else if (RUN_tasks_G[Index].Delay > 0)
//     {
//       RUN_tasks_G[Index].Delay -= 1;
//     }
//   }
// }
// void RUN_Add_TASK()
// {
//   RUN_tasks_G[0].Delay = 0;  // Flow1
//   RUN_tasks_G[1].Delay = 3;  // Flow2
//   RUN_tasks_G[2].Delay = 6;  // Pump1
//   RUN_tasks_G[3].Delay = 11; // Pump2
//   RUN_tasks_G[4].Delay = 16; // End
// }
// void RUN_Dispatch_Task(void)
// {
//   unsigned char Index;
//   for (Index = 0; Index < RUN_MAX_TASKS; Index++)
//   {
//     if (RUN_tasks_G[Index].RunMe > 0)
//     {
//       RUN_tasks_G[Index].RunMe = 0;
//       RUN_tasks_G[Index].Delay = -1;
//       if (Index == 4)
//       {
//         isRun = false;
//         // Update to server
//         Serial.println("DONE");
//         Serial.print("Delay: ");
//         Serial.println(SCH_tasks_G[index_schedule].Delay);

//         if (SCH_tasks_G[index_schedule].Delay != -1)
//         {
//           updateStatus("WAITING", index_schedule);
//         }
//         else
//         {
//           controllRelay(Index - 1, false);
//           updateStatus("DONE", index_schedule);
//         }
//       }
//       else
//       {
//         if (Index > 0)
//         {
//           controllRelay(Index - 1, false);
//         }
//         controllRelay(Index, true);
//         Serial.print("Controll Relay: ");
//         Serial.println(Index);
//       }
//     }
//   }
// }

// void SCH_Update()
// {
//   unsigned char Index;
//   for (Index = 0; Index < SCH_MAX_TASKS; Index++)
//   {
//     if (SCH_tasks_G[Index].Delay == 0)
//     {
//       SCH_tasks_G[Index].RunMe = 1;
//       if (SCH_tasks_G[Index].Period > 0)
//       {
//         SCH_tasks_G[Index].Delay = SCH_tasks_G[Index].Period;
//       }
//     }
//     else if (SCH_tasks_G[Index].Delay > 0)
//     {
//       SCH_tasks_G[Index].Delay -= 1;
//     }
//   }
// }

void SCH_Add_TASK()
{
  unsigned char Index = 0;
  JsonArray scheduleList = schedule_json["schedule_list"].as<JsonArray>();
  // Chờ cho phép cập nhật thời gian
  timeClient.update();
  int timeCurrent = timeClient.getHours() * 60 + timeClient.getMinutes();

  if (scheduleList.size() != 0)
  {
    for (JsonVariant schedule : scheduleList)
    {
      if (Index < SCH_MAX_TASKS)
      {

        const char *status = schedule["status"];

        if (strcmp(status, "WAITING") == 0)
        {
          String strTimeStart = schedule["startTime"];
          int colonIndex = strTimeStart.indexOf(':');
          int minute = strTimeStart.substring(0, colonIndex).toInt();
          int second = strTimeStart.substring(colonIndex + 1).toInt();
          int timeStart = minute * 60 + second;

          Serial.println("Start time: ");
          Serial.println(strTimeStart);

          int delayStart = timeStart - timeCurrent;
          if (delayStart >= 0)
          {
            // DELAY START
            SCH_tasks_G[Index].DelayStart = delayStart;
            // STATUS
            SCH_tasks_G[Index].Status = "WAITING";
            // AREA
            SCH_tasks_G[Index].Area = schedule["area"];
          }

          /////////////////////////////////////////////

          String strTimeEnd = schedule["endTime"];
          colonIndex = strTimeEnd.indexOf(':');
          minute = strTimeEnd.substring(0, colonIndex).toInt();
          second = strTimeEnd.substring(colonIndex + 1).toInt();
          int timeEnd = minute * 60 + second;

          Serial.println("End time: ");
          Serial.println(strTimeEnd);
          int delayEnd = timeEnd - timeCurrent;
          if (delayEnd >= 0)
          {
            // DELAY END
            SCH_tasks_G[Index].DelayEnd = delayEnd;
          }
        }
      }
      Index++;
    }
  }
  else
  {
    SCH_Init();
    Serial.println("Lich tuoi trong");
  }
}

void SCH_Update_TASK()
{
  unsigned char Index;

  for (Index = 0; Index < SCH_MAX_TASKS; Index++)
  {
    const char *status = SCH_tasks_G[Index].Status;

    if (SCH_tasks_G[Index].DelayStart == 0)
    {
      if (isRun == false)
      {
        SCH_tasks_G[Index].DelayStart = -1;
        SCH_tasks_G[Index].Status = "RUNNING";
        SCH_tasks_G[Index].RunMe = 1;
        index_schedule = Index;
        isRun = true;
      }
      else
      {
        SCH_tasks_G[index_schedule].DelayEnd = -1;
        SCH_tasks_G[index_schedule].Status = "SUSPENDED";

        SCH_tasks_G[Index].DelayStart = -1;
        SCH_tasks_G[Index].Status = "RUNNING";
        SCH_tasks_G[Index].RunMe = 1;
      }
    }
    else if (strcmp(status, "WAITING") == 0)
    {
      SCH_tasks_G[Index].DelayStart = SCH_tasks_G[Index].DelayStart - 1;
    }

    //
    if (SCH_tasks_G[Index].DelayEnd == 0)
    {
      SCH_tasks_G[Index].DelayEnd = -1;
      SCH_tasks_G[Index].Status = "DONE";
      SCH_tasks_G[Index].RunMe = 1;
      isRun = false;
    }
    else if (strcmp(status, "RUNNING") == 0 || strcmp(status, "WAITING") == 0)
    {
      SCH_tasks_G[Index].DelayEnd = SCH_tasks_G[Index].DelayEnd - 1;
    }
  }
}

//////////////////
void SCH_Run_TASK()
{
  unsigned char Index;

  for (Index = 0; Index < SCH_MAX_TASKS; Index++)
  {
    if (SCH_tasks_G[Index].RunMe == 1)
    {
      // thưc thi
      SCH_tasks_G[Index].RunMe = 0;

      if (strcmp(SCH_tasks_G[Index].Status, "DONE") == 0)
      {
        isRun = false;
        controllRelay(SCH_tasks_G[Index].Area - 1, false);
        updateStatus(SCH_tasks_G[Index].Status, Index);
      }
      else if (strcmp(SCH_tasks_G[Index].Status, "RUNNING") == 0)
      {
        updateStatus(SCH_tasks_G[Index].Status, Index);

        if (index_schedule != Index)
        {
          updateStatus(SCH_tasks_G[index_schedule].Status, index_schedule);
          controllRelay(SCH_tasks_G[index_schedule].Area - 1, false);
          controllRelay(SCH_tasks_G[Index].Area - 1, true);

          index_schedule = Index;
        }
        else
        {
          controllRelay(SCH_tasks_G[Index].Area - 1, true);
        }
      }
    }
  }
}
// void SCH_Add_TASK() // void (*pFunction)(),
// {
//   unsigned char Index = 0;
//   JsonArray scheduleList = schedule_json["schedule_list"].as<JsonArray>();
//   // Chờ cho phép cập nhật thời gian
//   timeClient.update();
//   int timeCurrent = timeClient.getHours() * 60 + timeClient.getMinutes();
//   Serial.print("Current time: ");
//   Serial.print(timeClient.getHours());
//   Serial.print(":");
//   Serial.println(timeClient.getMinutes());

//   if (scheduleList.size() != 0)
//   {
//     for (JsonVariant schedule : scheduleList)
//     {
//       if (Index < SCH_MAX_TASKS)
//       {
//         String str;
//         const char *status = schedule["status"];
//         serializeJson(schedule, str);
//         Serial.println(str);
//         if (strcmp(status, "WAITING") == 0)
//         {
//           String strTimeStart = schedule["startTime"];
//           Serial.println("Start time: ");
//           int colonIndex = strTimeStart.indexOf(':');
//           int minute = strTimeStart.substring(0, colonIndex).toInt();
//           int second = strTimeStart.substring(colonIndex + 1).toInt();
//           int timeStart = minute * 60 + second;
//           Serial.println(strTimeStart);

//           int delay = timeStart - timeCurrent;
//           uint8_t cycle = (uint8_t)schedule["cycle"];
//           // DELAY & CYCLE
//           if (SCH_tasks_G[Index].Delay == -1)
//           {
//             if (delay <= 0)
//             {
//               SCH_tasks_G[Index].Delay = 5 + delay;
//             }
//             else
//             {
//               SCH_tasks_G[Index].Delay = delay;
//             }

//             SCH_tasks_G[Index].Cycle = cycle;
//           }
//           // PERIOD
//           if (cycle > 0)
//           {
//             SCH_tasks_G[Index].Period = 5;
//           }
//           // STATUS
//           SCH_tasks_G[Index].Status = schedule["status"];
//         }
//         Index++;
//       }
//     }
//   }
//   else
//   {
//     Serial.println("Lich tuoi trong");
//   }
// }

// void SCH_Dispatch_Tasks(void)
// {
//   unsigned char Index;
//   // RUN
//   if (isRun)
//   {
//     RUN_Dispatch_Task();
//   }
//   else
//   {
//     for (Index = 0; Index < SCH_MAX_TASKS; Index++)
//     {

//       if (SCH_tasks_G[Index].RunMe > 0)
//       {
//         // Flag RUN ON
//         isRun = true;
//         RUN_Add_TASK();
//         index_schedule = Index;
//         SCH_tasks_G[Index].RunMe = 0;

//         // Update status to server
//         updateStatus("RUNNING", Index);
//         if (SCH_tasks_G[Index].Period == 0)
//         {
//           SCH_tasks_G[Index].Delay = -1;
//         }
//         else
//         {
//           if (SCH_tasks_G[Index].Cycle == 0)
//           {
//             SCH_tasks_G[Index].Delay = -1;
//           }
//           else
//           {
//             SCH_tasks_G[Index].Cycle -= 1;
//           }
//         }

//         break;
//       }
//     }
//   }
// }

void IRAM_ATTR timerCallback()
{
  counterTimer++; // Tăng biến đếm mỗi lần Timer 1 được kích hoạt

  if (counterTimer % 5 == 0)
  {
    SCH_Update_TASK();
  }

  // if (isRun)
  // {
  //   RUN_Update();
  // }
}

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
// Function Receive Data From MQTT Broker
void myReceiveFunction(char *topic, byte *payload, unsigned int length)
{
  M5.Lcd.println(topic);
  // isSchedule = true;
  //  Convert data to string
  char *data_sensor = reinterpret_cast<char *>(payload);
  //  Deserialize the JSON document
  StaticJsonDocument<300> doc;
  DeserializationError error = deserializeJson(doc, data_sensor);
  // Test if parsing succeeds.
  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  if (doc["station_id"] == "VALVE_0001" && isRun == false)
  {
    deserializeJson(valve_json, data_sensor);
    JsonArray sensors = valve_json["sensors"].as<JsonArray>();
    int index = 0;
    // Upadate relayArray
    for (JsonVariant sensor : sensors)
    {
      uint8_t value = (uint8_t)sensor["sensor_value"];

      if (relayArray[index] != value)
      {
        relayArray[index] = value;
        // Controll Realay 0,1
        if (index < 2)
        {
          // relay.relayWrite(index, value);
          controllRelay(index, value);
          Serial.print("Valve ");
          Serial.print(index);
          Serial.print(": ");
          Serial.println(value);
        }
      }
      index++;
    }

    // Send data to display
    if (isFirst == false)
    {
      serializeJson(valve_json, Serial1);
    }
  }
  else if (doc["station_id"] == "PUMP_0001" && isRun == false)
  {
    deserializeJson(pump_json, data_sensor);
    JsonArray sensors = pump_json["sensors"].as<JsonArray>();
    int index = 3;
    // Upadate relayArray
    for (JsonVariant sensor : sensors)
    {
      uint8_t value = (uint8_t)sensor["sensor_value"];

      if (relayArray[index] != value)
      {
        relayArray[index] = value;
        // Controll Realay 2,3
        if (index > 5)
        {
          // relay.relayWrite(index - 4, value);
          controllRelay(index - 4, value);
          Serial.print("Pump ");
          Serial.print(index - 4);
          Serial.print(": ");
          Serial.println(value);
        }
      }
      index++;
    }

    // Send data to display
    if (isFirst == false)
    {
      serializeJson(pump_json, Serial1);
    }
  }
  else if (doc["station_id"] == "air_0002")
  {

    deserializeJson(sensors_json, data_sensor);
    String str;
    serializeJson(sensors_json, str);
    Serial.println(str);
    if (isFirst == false)
    {
      serializeJson(sensors_json, Serial1);
    }
  }
  else if (doc["station_id"] == "SCHEDULE_0001")
  {
    deserializeJson(schedule_json, data_sensor);
    String str;
    serializeJson(schedule_json, str);
    Serial.println(str);
    SCH_Add_TASK();

    if (isFirst == false)
    {
      serializeJson(schedule_json, Serial1);
    }
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

//////////////////////////////////////////////////

void setup()
{
  // Initialize M5Station.
  M5.begin();
  // task

  // xTaskCreatePinnedToCore(task2, "task2", 4096, NULL, 1, NULL, 0);
  //  Setup UART 1
  Serial1.begin(115200, SERIAL_8N1, 13, 14);

  // Initialize RS485
  // RS485.begin(9600, SERIAL_8N1, RS485_RX, RS485_TX);

  // Initialize Wifi
  setupWifi();

  // Bắt đầu lấy thời gian từ máy chủ NTP
  timeClient.begin();

  // TIMER
  // Khởi tạo Timer với prescaler là 80 000 và chế độ chia sẻ
  timer = timerBegin(0, 8000, true); // (80MHz/8000 = 80kHz=80000Hz) --> 1 Tick = 0.1ms
  // Cài đặt timer interrupt và gắn hàm callback
  timerAttachInterrupt(timer, &timerCallback, true);
  // Đặt thời gian interval cho timer (ở đây là 1 giây)
  timerAlarmWrite(timer, 10000, true); // 1 giây = 10 000* 0.1ms
  // Bắt đầu timer
  timerAlarmEnable(timer);

  // Schedule
  SCH_Init();

  // RUN Task
  // RUN_Init();

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
      serializeJson(schedule_json, Serial1);
    }
    else if (strcmp(receiveMessage, "OK_SCHEDULE") == 0)
    {
      M5.Lcd.println("Returned message: " + String(receiveMessage));
      isFirst = false;
    }
  }

  mqtt.checkConnect(); // Check connected mqtt

  // SCH_Dispatch_Tasks();
  SCH_Run_TASK();
}
