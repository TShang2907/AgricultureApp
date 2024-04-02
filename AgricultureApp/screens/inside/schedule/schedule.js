import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, useColorScheme, Image } from 'react-native';

import Task from './task';
import { MaterialIcons } from '@expo/vector-icons';


export default function Schedule({ navigation, dataFromHomeStack, onDataFromStackScreen }) {

    console.log('From Schedule Stack', dataFromHomeStack);

    const [data, setData] = useState(0);

    const handleData = () => {
        setData(data + 1);

    };

    useEffect(() => {
        console.log("Send");
        onDataFromStackScreen(data);
    }, [data]);



    return (

        <View style={styles.container}>
            <Image
                blurRadius={70}
                style={styles.backgroundImage}
                source={require('../../../images/bg.png')}
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Lịch Tưới</Text>
                </View>
                <View style={styles.body}>
                    <ScrollView>
                        <Task />
                    </ScrollView>
                </View>
                <View style={styles.bottom}>

                </View>

                <View style={styles.bottom}>
                    <View style={styles.button}>

                        <TouchableOpacity onPress={() => navigation.navigate('ScreenTest')}>
                            <MaterialIcons name="playlist-add" size={60} color="white" />
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
        resizeMode: 'cover',
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
        right: 20,
        bottom: 90
    }


});
