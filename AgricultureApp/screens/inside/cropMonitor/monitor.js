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
    const [valueTemp, setValueTemp] = useState([0]);
    const [labelTemp, setLabelTemp] = useState([0]);
    const [valueHumi, setValueHumi] = useState([0]);

    const { isInitialized, messageMonitoring } = useMqtt();
    //const [isStart, setIsStart] = useState(isInitialized);
    const [dataSensor, setDataSensor] = useState('');

    useEffect(() => {
        if (messageMonitoring != '') {
            setDataSensor(JSON.parse(messageMonitoring));
        }
    }, [messageMonitoring]);

    useEffect(() => {
        if (dataSensor !== '') {
            console.log('Data to monitor', dataSensor);

            if (valueTemp.length == 10) {
                let tempList = [...valueTemp];
                const newList = [...scheduleList];
                tempList.splice(0, 1);
                setValueTemp(tempList)
            }
            if (labelTemp.length == 10) {
                let labelTempList = [...labelTemp];
                labelTempList.splice(0, 1);
                setLabelTemp(labelTempList)
            }
            if (valueHumi.length == 10) {
                let humiList = [...valueHumi];
                humiList.splice(0, 1);
                setValueHumi(humiList)
            }
            var timeTemp = new Date();
            setValueTemp([...valueTemp, dataSensor.sensors[0].value]);
            setValueHumi([...valueHumi, dataSensor.sensors[1].value]);
            setLabelTemp([...labelTemp, timeTemp.getHours().toString() + ':' + timeTemp.getMinutes().toString()]);

            console.log(labelTemp)
            console.log(valueTemp)

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
        labels: labelTemp.slice(-7),
        datasets: [
            {
                data: valueTemp,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2,
                // backgroundColor: 'rgba(255, 255, 255, 1)',
            },
        ],
    };

    const dataHumi = {
        labels: labelTemp.slice(-7),
        datasets: [
            {
                data: valueHumi,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2,
                // backgroundColor: 'rgba(255, 255, 255, 1)',
            },
        ],
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
                            width={300}
                            height={220}
                            yAxisSuffix=" 'C"
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                backgroundGradientFrom: '#74c79d',
                                backgroundGradientTo: '#74c79d',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 10
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
                            width={300}
                            height={220}
                            yAxisSuffix="%"
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                backgroundGradientFrom: '#57CCED',
                                backgroundGradientTo: '#57CCED',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 10
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