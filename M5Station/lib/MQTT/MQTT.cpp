#include "MQTT.h"
bool MyMQTT::connectToMQTT()
{
    client.setServer(mqtt_server, 1883);
    return client.connect("M5_Station", username, password);
}
bool MyMQTT::subscribe(const char *feedName)
{
    return client.subscribe(feedName);
}
bool MyMQTT::publish(const char *topic, const char *payload)
{
    return client.publish(topic, payload, true);
}
void MyMQTT::checkConnect()
{
    if (!client.connected())
    {
        client.connect("M5_Station", username, password);
        delay(3000);
    }
    else
    {
        client.loop();
    }
}

void MyMQTT::setReceiveFunction(void (*receiveFunction)(char *topic, byte *message, unsigned int length))
{
    client.setCallback(receiveFunction);
}