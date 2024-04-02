import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Switch } from 'react-native';
import styles from './styleSchedule';

const Task = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <View style={styles.date}>
                    <Text style={{ fontSize: 25, color: '#6CDDD0', fontWeight: 'bold' }}>2/3</Text>
                </View>
                <View style={styles.task}>
                    <Text style={{ paddingVertical: 5, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#6CDDD0' }}>Lịch tưới 1</Text>
                    <View style={styles.subtask}>
                        <Text>Bắt đầu: </Text>
                        <Text>11:45</Text>
                        <Text>Kết thúc</Text>
                        <Text>12:03</Text>
                    </View>
                    <View style={styles.subtask}>
                        <Text>N P K: </Text>
                        <Text>20ml</Text>
                        <Text>10ml</Text>
                        <Text>20ml</Text>
                    </View>
                    <View style={styles.subtask}>
                        <Text>Lặp lai: </Text>
                        <Text>15 phút</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </View>
                    <View style={styles.subtask}>

                        <Text>Trang thái: </Text>
                        <Text>Đang tưới</Text>
                        <Button title='Hủy'></Button>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Task;
