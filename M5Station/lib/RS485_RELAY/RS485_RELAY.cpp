#include "RS485_RELAY.h"
#define NUMS_RELAY 8

RS485_RELAY::RS485_RELAY()
{
    arr_relay = new uint8_t *[NUMS_RELAY];
    arr_relay[0] = new uint8_t[8]{0x01, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[1] = new uint8_t[8]{0x02, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[2] = new uint8_t[8]{0x03, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[3] = new uint8_t[8]{0x04, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[4] = new uint8_t[8]{0x05, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[5] = new uint8_t[8]{0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[6] = new uint8_t[8]{0x07, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};
    arr_relay[7] = new uint8_t[8]{0x08, 0x06, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x5E};

    arr_checksum = new uint8_t *[NUMS_RELAY];
    arr_checksum[0] = new uint8_t[4]{0xC9, 0x8A, 0x89, 0xCA};
    arr_checksum[1] = new uint8_t[4]{0xC9, 0xB9, 0x89, 0xF9};
    arr_checksum[2] = new uint8_t[4]{0xC8, 0x68, 0x89, 0x28};
    arr_checksum[3] = new uint8_t[4]{0xC9, 0xDF, 0x89, 0x9F};
    arr_checksum[4] = new uint8_t[4]{0xC8, 0x0E, 0x88, 0x4E};
    arr_checksum[5] = new uint8_t[4]{0xC8, 0x5B, 0x88, 0x25};
    arr_checksum[6] = new uint8_t[4]{0xC8, 0x3D, 0x88, 0x7D};
    arr_checksum[7] = new uint8_t[4]{0xC9, 0x13, 0x89, 0x53};
};

RS485_RELAY::~RS485_RELAY()
{
    // Giải phóng bộ nhớ
    for (int i = 0; i < NUMS_RELAY; ++i)
    {
        delete[] arr_relay[i];
    }
    delete[] arr_relay;

    for (int i = 0; i < NUMS_RELAY; ++i)
    {
        delete[] arr_checksum[i];
    }
    delete[] arr_checksum;
};
uint8_t *RS485_RELAY::getRelay(uint8_t index, uint8_t value)
{
    if (value == 1)
    {
        arr_relay[index][5] = 0xFF;
        arr_relay[index][6] = arr_checksum[index][0];
        arr_relay[index][7] = arr_checksum[index][1];
    }
    else
    {
        arr_relay[index][5] = 0x00;
        arr_relay[index][6] = arr_checksum[index][2];
        arr_relay[index][7] = arr_checksum[index][3];
    }
    return arr_relay[index];
}
