import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import styles from './styleSchedule';
import { Switch } from 'react-native-switch';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Task = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        console.log('isEnabled: ', isEnabled);
        if (isEnabled) setStatus('Đang chờ tưới');
        else setStatus('Chưa kích hoạt')
    }, [isEnabled]);

    const [cycle, setCycle] = useState(0);
    const [startTime, setStartTime] = useState('null');
    const [endTime, setEndTime] = useState('null');
    const [nitorValue, onChangeNitorValue] = useState('0');
    const [kaliValue, onChangeKaliValue] = useState('0');
    const [photphoValue, onChangePhotphoValue] = useState('0');
    const [status, setStatus] = useState('Chưa kích hoạt');

    return (
        <TouchableOpacity>
            <View style={styles.item}>
                {/* <View style={styles.date}>
                    <Text style={{ fontSize: 25, color: '#6CDDD0', fontWeight: 'bold' }}>2/3</Text>
                </View> */}
                <View style={styles.task}>
                    <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 10, backgroundColor: '#6CDDD0' }}>

                        <View style={{ flex: 3, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Lịch tưới</Text>
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold' }}>1</Text>
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
                        <Text>11:45</Text>
                        <Text>Kết thúc</Text>
                        <Text>12:03</Text>
                    </View>
                    <View style={styles.subtask}>
                        <Text>N P K: </Text>
                        <Text>20</Text>
                        <Text>ml</Text>
                        <Text>20</Text>
                        <Text>ml</Text>
                        <Text>20</Text>
                        <Text>ml</Text>
                    </View>
                    <View style={styles.subtask}>
                        <Text>Lặp lai: </Text>
                        <Text>{cycle}</Text>
                        <Text>ngày</Text>


                    </View>
                    <View style={styles.subtask}>

                        <Text>Trang thái: </Text>
                        <Text>{status}</Text>
                        <TouchableOpacity onPress={() => alert('Bạn thực sự muốn hủy lịch tưới')}>
                            <MaterialCommunityIcons name="table-large-remove" size={35} color="#FF8484" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Task;
