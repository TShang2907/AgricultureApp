import paho.mqtt.client as mqtt
import time
# username: servermonitoring
# Pass: ServerMonitoring_wQ1Z3Q5n64
# Topic: /server/monitoring/
# host: mqttserver.tk
# port: 1883
MQTT_SERVER = "mqttserver.tk"
MQTT_PORT = 1883
MQTT_USERNAME = "innovation"
MQTT_PASSWORD = "Innovation_RgPQAZoA5N"
MQTT_TOPIC_SUB_AIR = "/innovation/airmonitoring/NBIOTs"
MQTT_TOPIC_AI="/innovation/valvecontroller/ai"
recvCallBack = None

class MQTTHelper:

    def mqtt_connected(self, client, userdata, flags, rc):
        print("Connected succesfully!!")
        # client.subscribe(self.MQTT_TOPIC_SUB_SOIL)
        # client.subscribe(self.MQTT_TOPIC_SUB_WATER)
        client.subscribe(MQTT_TOPIC_SUB_AIR)
        # client.subscribe(self.MQTT_TOPIC_SMART_HOME)

        #client.subscribe(self.MQTT_TOPIC_SERVER)

        client.subscribe(MQTT_TOPIC_AI)
        #client.subscribe(self.MQTT_TOPIC_SUB_PUMP)

        
    def mqtt_subscribed(self, client, userdata, mid, granted_qos):
        print("Subscribed to Topic!!!")


    def mqtt_recv_message(self, client, userdata, message):
        self.recvCallBack(message.payload.decode("utf-8"))

    def __init__(self):

        self.mqttClient = mqtt.Client()
        self.mqttClient.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
        self.mqttClient.connect(MQTT_SERVER, int(MQTT_PORT), 60)

        # Register mqtt events
        self.mqttClient.on_connect = self.mqtt_connected
        self.mqttClient.on_subscribe = self.mqtt_subscribed
        self.mqttClient.on_message = self.mqtt_recv_message

        self.mqttClient.loop_start()

    def setRecvCallBack(self, func):
        self.recvCallBack = func

    def publish(self, topic, message):
        self.mqttClient.publish(topic, str(message), retain=True)


mqtt=MQTTHelper()
# Định nghĩa một hàm xử lý để nhận các thông điệp từ máy chủ MQTT
def receive_callback(message):
    print("Received: ", message)
    #mqtt.publish(MQTT_TOPIC_AI,"hello")

# Gọi phương thức setRecvCallBack để gán hàm xử lý cho việc nhận thông điệp
mqtt.setRecvCallBack(receive_callback)
#mqtt.start_listening()

# # Do other things or keep the program running

while True:
    # mqtt.publish(MQTT_TOPIC_AI,"hello")
    # time.sleep(3)
    pass