import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import styles from './styleSchedule';
import { Switch } from 'react-native-switch';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Task = (props) => {

    const [isEnabled, setIsEnabled] = useState(props.schedule.isActive);

    const [index, setIndex] = useState(props.index);

    const [status, setStatus] = useState('Chưa kích hoạt');



    useEffect(() => {
        // if (isEnabled) setStatus('Đang chờ tưới');
        // else setStatus('Chưa kích hoạt')

        props.updateIsActive(isEnabled, index);

    }, [isEnabled]);

    useEffect(() => {
        if (props.schedule.status == "RUNNING") {
            setStatus('Đang tưới')
        } else if (props.schedule.status == "DONE") {
            setStatus('Đã tưới')
        } else if (props.schedule.status == "WAITING") {
            setStatus('Đang chờ tưới')
        } else if (props.schedule.status == "SUSPENDED") {
            setStatus('Đang tạm dừng')
        }
    }, [props.schedule.status]);

    useEffect(() => {
        setIsEnabled(props.schedule.isActive)
    }, [props.schedule.isActive]);


    // const [cycle, setCycle] = useState(0);
    // const [startTime, setStartTime] = useState('null');
    // const [endTime, setEndTime] = useState('null');
    // const [nitorValue, onChangeNitorValue] = useState('0');
    // const [kaliValue, onChangeKaliValue] = useState('0');
    // const [photphoValue, onChangePhotphoValue] = useState('0');


    return (

        <View style={styles.item}>
            <View style={styles.task}>
                <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 10, backgroundColor: '#6CDDD0' }}>

                    <View style={{ flex: 3, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Lịch tưới</Text>
                        <Text style={{ paddingLeft: 10, fontWeight: 'bold' }}>{props.index + 1}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Switch
                            value={isEnabled}
                            onValueChange={() => setIsEnabled(!isEnabled)}

                            inActiveText='Tắt'
                            activeText='Bật'
                            activeTextStyle={{ fontSize: 12 }}
                            inactiveTextStyle={{ fontSize: 12 }}
                            circleSize={30}
                            barHeight={25}
                        />
                    </View>

                </View>


                <View style={styles.subtask}>
                    <Text>Bắt đầu: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{props.schedule.startTime}</Text>
                    <Text>Kết thúc</Text>
                    <Text style={{ fontWeight: 'bold' }}>{props.schedule.endTime}</Text>
                </View>
                <View style={styles.subtask}>
                    <Text>N P K: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{props.schedule.nitorValue}</Text>
                    <Text>ml</Text>
                    <Text style={{ fontWeight: 'bold' }}>{props.schedule.kaliValue}</Text>
                    <Text>ml</Text>
                    <Text style={{ fontWeight: 'bold' }}>{props.schedule.photphoValue}</Text>
                    <Text>ml</Text>
                </View>
                <View style={styles.subtask}>
                    <Text>Phân khu: </Text>
                    <Text style={{ fontWeight: 'bold' }}
                    >{props.schedule.area}</Text>
                    <Text>ngày</Text>


                </View>
                <View style={styles.subtask}>

                    <Text>Trang thái: </Text>
                    <Text>{status}</Text>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Thông báo', 'Bạn thực sự muốn hủy lịch tưới', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    ToastAndroid.showWithGravity(
                                        'Lịch tưới đã được hủy',
                                        ToastAndroid.SHORT,
                                        ToastAndroid.CENTER);
                                    props.removeSchedule(index);
                                }
                            }

                        ], { cancelable: true }
                        );

                    }}>
                        <MaterialCommunityIcons name="table-large-remove" size={35} color="#FF8484" />
                    </TouchableOpacity>

                </View>
            </View>
        </View >

    );
}

export default Task;
