import Paho from "paho-mqtt";
import { useState, useEffect, useContext } from "react";
import { Modal, Text, Animated, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { useMqtt } from "../../../dataProvider";
import { theme } from '../../../theme/index';

import styles from './styleMonitor';


export default function Monitor() {
    const navigation = useNavigation();
    const translateX = new Animated.Value(-400);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [nitro, setNitro] = useState(0);
    const [photpho, setPhotpho] = useState(0);
    const [kali, setKali] = useState(0);
    const [elec, setElec] = useState(0);
    const [pH, setPH] = useState(0);

    const [valueTemp, setValueTemp] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [labelTemp, setLabelTemp] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [valueHumi, setValueHumi] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictTemp, setPredictTemp] = useState([30.8, 31.9, 33.0, 34.2, 35.3, 33.3, 34.3, 35.7, 35.8])
    const [predictHumi, setPredictHumi] = useState([72.5, 65.0, 61.7, 61.3, 63.0, 59.3, 54.2, 53.1, 51.3])

    const { messageMonitoring, sensorData, predictionData } = useMqtt();
    const [dataSensor, setDataSensor] = useState('');



    useEffect(() => {
        if (messageMonitoring != '') {
            setDataSensor(JSON.parse(messageMonitoring));
        }
    }, [messageMonitoring]);

    useEffect(() => {
        if (sensorData.length > 0) {
            console.log("Data sensor:", sensorData);
            const ArrayTime = sensorData[0].map((item) => {
                const dateTimePart = item.split(" ");
                const timeString = dateTimePart[1];
                const timePart = timeString.split(":");
                return `${timePart[0]}:${timePart[1]}`;
            });

            setLabelTemp(ArrayTime);
            setValueTemp(sensorData[1]);
            setValueHumi(sensorData[2]);
        }
    }, [sensorData]);

    useEffect(() => {
        if (predictionData.length > 0) {
            console.log("Prediction Data:", predictionData);

            setPredictTemp(predictionData[1]);
            setPredictHumi(predictionData[2]);
        }
    }, [predictionData]);

    useEffect(() => {
        if (dataSensor !== '') {
            console.log('Data to monitor', dataSensor);
            // var timeTemp = new Date();


            // let tempList = [...valueTemp, dataSensor.sensors[0].value];
            // tempList.splice(0, 1);

            // setValueTemp(tempList);

            // let labelTempList = [...labelTemp, timeTemp.getHours().toString() + ':' + timeTemp.getMinutes().toString()];
            // labelTempList.splice(0, 1);

            // setLabelTemp(labelTempList)

            // let humiList = [...valueHumi, dataSensor.sensors[1].value];
            // humiList.splice(0, 1);

            // setValueHumi(humiList)


            //setValueTemp([...valueTemp, dataSensor.sensors[0].value]);
            //setValueHumi([...valueHumi, dataSensor.sensors[1].value]);
            //setLabelTemp([...labelTemp, timeTemp.getHours().toString() + ':' + timeTemp.getMinutes().toString()]);


            setPH(dataSensor.sensors[4].value)
            setElec(dataSensor.sensors[5].value)
            setNitro(dataSensor.sensors[6].value)
            setPhotpho(dataSensor.sensors[7].value)
            setKali(dataSensor.sensors[8].value)

        }
    }, [dataSensor]);

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };



    const handleLogout = () => {
        // client.disconnect()
        navigation.navigate('Login')
    }

    const handleChangeScreen = () => {
        // await client.disconnect()

        navigation.navigate('Controller')
    }
    const handleChangeScreen1 = () => {
        // await client.disconnect()

        navigation.navigate('ScreenTest')
    }


    // handleChangeScreen().then(navigation.navigate('Controller'))

    const dataTemp = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueTemp,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 4,

            },
            {
                data: predictTemp,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 4,
            }
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },

    };

    const dataHumi = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueHumi,
                color: (opacity = 1) => `rgba(255, 255, 255,${opacity})`,
                strokeWidth: 3,

            },

            {
                data: predictHumi,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 3,

            },
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },
    };

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isMenuVisible ? 0 : -400,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isMenuVisible]);

    return (
        <View style={styles.container}>
            <Image
                blurRadius={70}
                style={styles.backgroundImage}
                source={require('../../../images/bg.png')}
            />
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIconArea} onPress={openMenu}>
                    <Image
                        style={styles.menuIcon}
                        source={require('../../../images/Logo4.png')}
                    />
                </TouchableOpacity>
                <View style={styles.theoDoiCayTrongArea}>
                    <Text style={styles.theoDoiCayTrong}>Theo Dõi Cây Trồng</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataTemp}
                            width={370}
                            height={250}
                            yAxisSuffix="°C"
                            yAxisInterval={1}
                            // renderDotContent={({ x, y, index, value }) => (
                            //     <Text
                            //         key={index}
                            //         x={x}
                            //         y={y}
                            //         fontWeight="bold"
                            //         fontSize="14"
                            //         fill="black"
                            //         alignmentBaseline="middle"
                            //         textAnchor="middle">
                            //         {value}
                            //     </Text>
                            // )}
                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                backgroundGradientFrom: '#74c79d',
                                backgroundGradientTo: '#74c79d',
                                decimalPlaces: 2,

                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,

                                style: {
                                    borderRadius: 20
                                },

                            }}

                            bezier
                            style={{
                                marginVertical: 12,
                                marginHorizontal: 10,
                                borderRadius: 17
                            }}
                        />
                        <View style={styles.tempChart}>
                            <Text style={styles.nhietDo}>Nhiệt độ</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataHumi}
                            width={370}
                            height={250}
                            yAxisSuffix="%"
                            yAxisInterval={1}
                            // getDotColor={(dataPoint, dataPointIndex) => {
                            //     // Áp dụng điều kiện cho mỗi dãy dữ liệu
                            //     if (dataPointIndex > 5) {
                            //         // Dãy dữ liệu đầu tiên
                            //         return 'red';
                            //     } else {
                            //         return 'yellow';
                            //     }
                            // }}

                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backgroundGradientFrom: '#57CCED',
                                backgroundGradientTo: '#57CCED',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 20
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 12,
                                marginHorizontal: 10,
                                borderRadius: 17
                            }}
                        />
                        <View style={styles.tempChart}>
                            <Text style={styles.nhietDo}>Độ ẩm</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        <View style={styles.soilArea}>
                            <View style={styles.nitrogenArea}>
                                <Text style={styles.soilText}>Nitrogen</Text>
                                <Text style={styles.soilText}>{nitro} mg/kg </Text>
                            </View>
                            <View style={styles.photphorusArea}>
                                <Text style={styles.soilText}>Photphorus</Text>
                                <Text style={styles.soilText}>{photpho} mg/kg</Text>
                            </View>
                            <View style={styles.kaliArea}>
                                <Text style={styles.soilText}>Kali</Text>
                                <Text style={styles.soilText}>{kali} mg/kg</Text>
                            </View>
                            <View style={styles.elecConducArea}>
                                <Text style={styles.soilText}>Electrical Conductivity</Text>
                                <Text style={styles.soilText}>{elec} us/cm</Text>
                            </View>
                            <View style={styles.potenHydroArea}>
                                <Text style={styles.soilText}>Potential Hydrogen</Text>
                                <Text style={styles.soilText}>{pH} pH</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <Modal visible={isMenuVisible} transparent>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* Nửa trái của Modal */}
                    <View style={{ flex: 2, backgroundColor: '#116979' }}>
                        <View style={styles.pageListArea}>
                            <TouchableOpacity style={styles.pageListComponent} onPress={closeMenu}>
                                <Text style={styles.pageListText}>Theo dõi cây trồng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pageListComponent} onPress={handleChangeScreen}>
                                <Text style={styles.pageListText}>Điều khiển công tắc</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.logoutArea}>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.pageListText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Nửa phải của Modal */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                        onPress={closeMenu}
                    />
                </View>
            </Modal>

        </View>
    );
}