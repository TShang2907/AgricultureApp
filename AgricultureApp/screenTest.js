import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function ScreenTest({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("date");
    const [text_date, setText_date] = useState("null");
    const [start_time, setText_time] = useState("null");
    const [end_time, setEnd_time] = useState("null");

    const onChange = (e, selectedDate) => {

        setShow(false);
        const currentDate = selectedDate || date
        setDate(currentDate);


        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

        setText_date(fDate);
        setText_time(fTime);
        console.log(fDate);
        console.log(fTime);

    };
    const showMode = (modeToShow) => {

        setShow(true);
        setMode(modeToShow);
    }




    return (

        <View style={styles.container}>
            <Image
                blurRadius={70}
                style={styles.backgroundImage}
                source={require('./images/bg.png')}
            />
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingLeft: 20 }}>Lập Lịch</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.task}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#6CDDD0' }}>Lịch tưới 1</Text>
                        <View style={styles.subtask}>
                            <Text>Ngày bắt đầu: </Text>
                            <Button title={text_date} onPress={() => showMode("date")}></Button>
                        </View>
                        <View style={styles.subtask}>
                            <Text>Bắt đầu: </Text>
                            <Button title={start_time} onPress={() => showMode("time")}></Button>
                            <Text>Kết thúc</Text>
                            <Button title={end_time} onPress={() => showMode("time")}></Button>
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
                        </View>

                    </View>



                    {show && (
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />)
                    }
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
        flexDirection: 'row'
    },
    body: {
        flex: 13,
    },
    task: {
        backgroundColor: '#C4FCE8'
    },
    subtask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingLeft: 20,
        paddingRight: 10
    }
})




