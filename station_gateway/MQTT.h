#ifndef _MQTT_H_
#define _MQTT_H_
#include <PubSubClient.h>
#include <WiFi.h>

class MyMQTT
{
  private:
      const char* mqtt_server;
      const char*  username;
      const char* password;
      uint16_t buffer_size;
      WiFiClient espClient;
      PubSubClient client;

  public:
    MyMQTT(const char* mqtt_server, const char* username, const char* password, uint16_t buffer_size) : mqtt_server(mqtt_server), username(username), password(password), buffer_size(buffer_size), client(espClient)
    {
      client.setBufferSize(buffer_size);
    };

    bool connectToMQTT();
    bool subscribe(const char* topic);
    bool publish(const char* topic, const char* payload);
    void checkConnect();
    void setReceiveFunction(void (*receiveFucntion)(char *topic, byte *message, unsigned int length));
    //bool reconnect();
};
#endif