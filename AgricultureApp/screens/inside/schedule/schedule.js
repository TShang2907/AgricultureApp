import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, useColorScheme, Image } from 'react-native';

import Task from './task';
import { MaterialIcons } from '@expo/vector-icons';


export default function Schedule({ navigation, scheduleList, updateIsActive, removeSchedule }) {

    //console.log('Data from ScheduleStack:', dataFromScheduleStack);

    //console.log('ScheduleList: ', scheduleList);



    const [isActive, setIsActive] = useState(false);
    const [index, setIndex] = useState(0);

    const handlUpdateIsActive = (isActive, index) => {
        setIsActive(isActive);
        setIndex(index);
    };
    const handleRemoveSchedule = (index) => {
        removeSchedule(index);
    }

    useEffect(() => {
        updateIsActive(isActive, index);

    }, [isActive, index]);

    return (

        <View style={styles.container}>
            <Image
                blurRadius={70}
                style={styles.backgroundImage}
                source={require('../../../images/bg1.jpg')}
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Lịch Tưới</Text>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        {
                            scheduleList.map((item, index) => {
                                return <Task key={index} schedule={item} index={index} updateIsActive={handlUpdateIsActive} removeSchedule={handleRemoveSchedule} />
                            })

                        }
                    </ScrollView>
                </View>
                <View style={styles.bottom}>

                </View>

                <View style={styles.bottom}>
                    <View style={styles.button}>

                        <TouchableOpacity onPress={() => navigation.navigate('ScheduleSetting')}>
                            <MaterialIcons name="add-circle" size={70} color="#008037" />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1, // Đặt zIndex thấp hơn để ảnh nền chìm sau
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 13,
    },
    bottom: {
        flex: 1.5,
    },
    button: {
        position: 'absolute',
        right: 15,
        bottom: 120
    }


});
