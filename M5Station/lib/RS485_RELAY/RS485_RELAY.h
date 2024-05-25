#ifndef _RS485_RELAY_H_
#define _RS485_RELAY_H_

#include <ArduinoJson.h>
#include <Wire.h>

class RS485_RELAY
{
private:
    uint8_t **arr_relay;
    uint8_t **arr_checksum;

public:
    RS485_RELAY();
    ~RS485_RELAY();
    uint8_t *getRelay(uint8_t index, uint8_t value);
};

#endif