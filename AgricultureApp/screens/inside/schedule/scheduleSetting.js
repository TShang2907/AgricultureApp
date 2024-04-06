import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ScheduleSetting({ navigation, onDataFromScheduleStack }) {

    const [date, setDate] = useState(new Date());
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [start_time, setStart_time] = useState('Null');
    const [end_time, setEnd_time] = useState('Null');
    const [cycle, setCycle] = useState('0');
    const [nitorValue, setNitorValue] = useState('0');
    const [kaliValue, setKaliValue] = useState('0');
    const [photphoValue, setPhotphoValue] = useState('0');
    const [isActive, setIsActive] = useState(true);
    const schedule = {
        startTime: start_time,
        endTime: end_time,
        nitorValue: nitorValue,
        kaliValue: kaliValue,
        photphoValue: photphoValue,
        cycle: cycle,
        isActive: isActive
    }
    // const [dataToPass, setDataToPass] = useState({
    //     startTime: start_time,
    //     endTime: end_time,
    //     nitorValue: nitorValue,
    //     kaliValue: kaliValue,
    //     photphoValue: photphoValue,
    //     cycle: cycle,
    //     isActive: isActive
    // })

    const sendSchedule = () => {
        // setDataToPass({
        //     startTime: start_time,
        //     endTime: end_time,
        //     nitorValue: nitorValue,
        //     kaliValue: kaliValue,
        //     photphoValue: photphoValue,
        //     cycle: cycle,
        //     isActive: true
        // });
        alert('Lịch tưới đã được kích hoạt và lưu lại');
        schedule.startTime = start_time;
        schedule.endTime = end_time;
        schedule.nitorValue = nitorValue;
        schedule.kaliValue = kaliValue;
        schedule.photphoValue = photphoValue;
        schedule.cycle = cycle;
        schedule.isActive = isActive;

        console.log("Send From ScheduleSetting to ScheduleStack");
        onDataFromScheduleStack(schedule);

        //navigation.navigate('Schedule');
    }

    // useEffect(() => {
    //     if (dataToPass.startTime != 'Null' && dataToPass.endTime != 'Null') {
    //         console.log("Send From ScheduleSetting to ScheduleStack");
    //         onDataFromScheduleStack(dataToPass);
    //     }
    // }, [dataToPass]);

    const onChange1 = (e, selectedDate) => {

        setShow1(false);
        const currentDate = selectedDate || date
        setDate(currentDate);


        let tempDate = new Date(currentDate);

        let fTime1 = tempDate.getHours() + ':' + tempDate.getMinutes();



        setStart_time(fTime1);

        console.log(fTime1);

    };
    const onChange2 = (e, selectedDate) => {

        setShow2(false);
        const currentDate = selectedDate || date
        setDate(currentDate);


        let tempDate = new Date(currentDate);

        let fTime2 = tempDate.getHours() + ':' + tempDate.getMinutes();



        setEnd_time(fTime2);

        console.log(fTime2);

    };

    const showStart = () => {
        setShow1(true);
    }
    const showEnd = () => {
        setShow2(true);
    }



    return (

        <View style={styles.container}>
            <Image
                blurRadius={70}
                style={styles.backgroundImage}
                source={require('../../../images/bg.png')}
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
                        <Text style={{ paddingVertical: 10, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#6CDDD0' }}>Lịch tưới</Text>

                        <View style={styles.subtask}>
                            <Text>Bắt đầu: </Text>
                            <TouchableOpacity onPress={() => showStart()}>
                                <Text style={styles.inputTime}>{start_time}</Text>
                            </TouchableOpacity>
                            <Text>Kết thúc</Text>
                            <TouchableOpacity onPress={() => showEnd()}>
                                <Text style={styles.inputTime}>{end_time}</Text>
                            </TouchableOpacity >

                        </View>

                        <View style={styles.subtask}>
                            <Text>N P K: </Text>
                            <TextInput style={styles.input}
                                onChangeText={setNitorValue}
                                value={nitorValue}

                                keyboardType="numeric"
                            />
                            <Text>ml</Text>
                            <TextInput style={styles.input}
                                onChangeText={setKaliValue}
                                value={kaliValue}

                                keyboardType="numeric"
                            />
                            <Text>ml</Text>
                            <TextInput style={styles.input}
                                onChangeText={setPhotphoValue}
                                value={photphoValue}

                                keyboardType="numeric"
                            />
                            <Text>ml</Text>
                        </View>
                        <View style={styles.subtask}>
                            <Text>Lặp lại: </Text>
                            <TextInput style={styles.input}
                                onChangeText={setCycle}
                                value={cycle}

                                keyboardType="numeric"
                            />
                            <Text>lần</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ paddingVertical: 10, color: 'white', fontSize: 15 }}>Hủy</Text>
                            </View>
                            <TouchableOpacity onPress={sendSchedule} style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }} >

                                <Text style={{ color: 'white', fontSize: 15 }}>Lưu lại</Text>

                            </TouchableOpacity>


                            {/* <Button title='Hủy' color='red' />
 

                            <Button title='Lưu' color='green' /> */}

                        </View>

                    </View>

                    {show1 && (
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            is24Hour={true}
                            onChange={onChange1}
                        />)
                    }
                    {show2 && (
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            is24Hour={true}
                            onChange={onChange2}
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
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 10
    },
    input: {
        width: 50, // Độ rộng của Picker
        height: 30, // Độ cao của Picker
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#2196f3',
        textAlign: 'center',
        borderRadius: 5
    },
    inputTime: {
        width: 70, // Độ rộng của Picker
        height: 30, // Độ cao của Picker
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#2196f3',
        textAlign: 'center',
        borderRadius: 5
    },
})


{/* <DropDownPicker
items={nitorValue}
open={isOpen}
setOpen={() => setIsOpen(!isOpen)}
value={currentValue}
setValue={(val) => setCurrentValue(val)}
maxHeight={200}
autoScroll
placeholder='0'
containerStyle={{ width: 80, height: 2 }}
textStyle={{
    fontSize: 15
}}

>
</DropDownPicker> */}

