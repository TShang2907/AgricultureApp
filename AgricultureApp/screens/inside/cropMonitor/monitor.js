import Paho from "paho-mqtt";
import { useState, useEffect, useContext } from "react";
import { Modal, Text, Animated, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TabRouter, useNavigation } from '@react-navigation/native';
import { useMqtt } from "../../../dataProvider";



import styles from './styleMonitor';


export default function Monitor() {
    const navigation = useNavigation();
    const translateX = new Animated.Value(-400);
    const [isMenuVisible, setMenuVisible] = useState(false);
    // const [nitro, setNitro] = useState(0);
    // const [photpho, setPhotpho] = useState(0);
    // const [kali, setKali] = useState(0);
    // const [elec, setElec] = useState(0);
    // const [pH, setPH] = useState(0);

    const [labelTemp, setLabelTemp] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [valueTemp, setValueTemp] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueHumi, setValueHumi] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueTemp2, setValueTemp2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueHumi2, setValueHumi2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueEC, setValueEC] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valuePH, setValuePH] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueNito, setValueNito] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valuePhotpho, setValuePhotpho] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [valueKali, setValueKali] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);



    const [predictTemp, setPredictTemp] = useState([30.8, 31.9, 33.0, 34.2, 35.3, 33.3, 34.3, 35.7, 35.8])
    const [predictHumi, setPredictHumi] = useState([72.5, 65.0, 61.7, 61.3, 63.0, 59.3, 54.2, 53.1, 51.3])
    const [predictTemp2, setPredictTemp2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictHumi2, setPredictHumi2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictEC, setPredictEC] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictPH, setPredictPH] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictNito, setPredictNito] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictPhotpho, setPredictPhotpho] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictKali, setPredictKali] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const { sensorData, predictionData } = useMqtt();

    //const [dataSensor, setDataSensor] = useState('');



    // useEffect(() => {
    //     if (messageMonitoring != '') {
    //         setDataSensor(JSON.parse(messageMonitoring));
    //     }
    // }, [messageMonitoring]);

    useEffect(() => {
        if (sensorData.length > 0) {
            console.log("Data sensor:", sensorData);


            setValueTemp(sensorData[1]);
            setValueHumi(sensorData[2]);

            setValueTemp2(sensorData[3]);
            setValueHumi2(sensorData[4])

            setValuePH(sensorData[5])
            setValueEC(sensorData[6])
            setValueNito(sensorData[7])
            setValuePhotpho(sensorData[8])
            setValueKali(sensorData[9])



        }
    }, [sensorData]);

    useEffect(() => {
        if (predictionData.length > 0) {
            console.log("Prediction Data:", predictionData);

            const ArrayTime = predictionData[0].map((item) => {
                const dateTimePart = item.split(" ");
                const timeString = dateTimePart[1];
                const timePart = timeString.split(":");
                return `${timePart[0]}:${timePart[1]}`;
            });

            setLabelTemp(ArrayTime);

            setPredictTemp(predictionData[1]);
            setPredictHumi(predictionData[2]);

            setPredictTemp2(predictionData[3]);
            setPredictHumi2(predictionData[4]);

            setPredictPH(predictionData[5]);
            setPredictEC(predictionData[6]);
            setPredictNito(predictionData[7]);
            setPredictPhotpho(predictionData[8]);
            setPredictKali(predictionData[9]);


        }
    }, [predictionData]);

    // useEffect(() => {
    //     if (dataSensor !== '') {
    //         console.log('Data to monitor', dataSensor);
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


    // setPH(dataSensor.sensors[4].value)
    // setElec(dataSensor.sensors[5].value)
    // setNitro(dataSensor.sensors[6].value)
    // setPhotpho(dataSensor.sensors[7].value)
    // setKali(dataSensor.sensors[8].value)

    //     }
    // }, [dataSensor]);

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
    const dataTemp2 = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueTemp2,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 4,

            },
            {
                data: predictTemp2,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 4,
            }
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },

    };

    const dataHumi2 = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueHumi2,
                color: (opacity = 1) => `rgba(255, 255, 255,${opacity})`,
                strokeWidth: 3,

            },

            {
                data: predictHumi2,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 3,

            },
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },
    };

    const dataPH = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valuePH,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 4,

            },
            {
                data: predictPH,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 4,
            }
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },

    };

    const dataEC = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueEC,
                color: (opacity = 1) => `rgba(255, 255, 255,${opacity})`,
                strokeWidth: 3,

            },

            {
                data: predictEC,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 3,

            },
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },
    };

    const dataNito = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueNito,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 4,

            },
            {
                data: predictNito,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 4,
            }
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },

    };

    const dataPhotpho = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valuePhotpho,
                color: (opacity = 1) => `rgba(255, 255, 255,${opacity})`,
                strokeWidth: 3,

            },

            {
                data: predictPhotpho,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 3,

            },
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },
    };

    const dataKali = {
        labels: labelTemp.slice(-9),
        datasets: [
            {
                data: valueKali,
                color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                strokeWidth: 4,

            },
            {
                data: predictKali,
                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})`,
                strokeWidth: 4,
            }
        ],
        labelStyle: {
            color: 'white', // Màu chữ
            fontSize: 3,   // Kích thước chữ
        },

    };

    const renderDotContent = ({ x, y, index, indexData }) => {

        return (
            <Text style={{ position: 'absolute', top: y - 17, left: x, color: 'white', fontSize: 9 }}>{indexData.toFixed(1)}</Text>
        );
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

            <ScrollView style={styles.body}>


                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataTemp}
                            width={370}
                            height={250}
                            yAxisSuffix="°C"
                            yAxisInterval={30}
                            fromZero={true}
                            //renderDotContent={renderDotContent}


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
                                marginHorizontal: 20,
                                borderRadius: 17
                            }}
                        />
                        <View style={styles.tempChart}>
                            <Text style={styles.nhietDo}>Nhiệt độ không khí</Text>
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
                            fromZero={true}
                            //renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Độ ẩm không khí</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataTemp2}
                            width={370}
                            height={250}
                            yAxisSuffix="°C"
                            yAxisInterval={1}
                            fromZero={true}
                            //renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Nhiệt độ đất</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataHumi2}
                            width={370}
                            height={250}
                            yAxisSuffix="%"
                            yAxisInterval={1}
                            fromZero={true}
                            //renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Độ ẩm đất</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataPH}
                            width={370}
                            height={250}
                            yAxisSuffix="PH"
                            yAxisInterval={1}
                            fromZero={true}
                            renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>PH</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataEC}
                            width={370}
                            height={250}
                            yAxisSuffix="%"
                            yAxisInterval={1}
                            fromZero={true}
                            renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>EC</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataNito}
                            width={370}
                            height={250}
                            yAxisSuffix="PH"
                            yAxisInterval={1}
                            fromZero={true}
                            renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Nito</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataPhotpho}
                            width={370}
                            height={250}
                            yAxisSuffix="%"
                            yAxisInterval={1}
                            fromZero={true}
                            renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Photpho</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.monitorLinechartBgArea}>
                    <View style={styles.monitorLinechartBg}>
                        <LineChart
                            data={dataKali}
                            width={370}
                            height={250}
                            yAxisSuffix="PH"
                            yAxisInterval={1}
                            fromZero={true}
                            renderDotContent={renderDotContent}
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
                            <Text style={styles.nhietDo}>Kali</Text>
                        </View>
                    </View>
                </View>
            </ScrollView >

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

        </View >
    );
}