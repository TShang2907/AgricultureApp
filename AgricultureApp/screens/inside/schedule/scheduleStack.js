import { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleSetting from './scheduleSetting';
import Schedule from './schedule';
import { useMqtt } from "../../../dataProvider";
const Stack = createNativeStackNavigator()

const payload_schedule = {
    station_id: "SCHEDULE_0001",
    station_name: "Lich tuoi",
    gps_longitude: 106.89,
    gps_latitude: 10.5,
    schedule_list: []
}

const ScheduleStack = () => {

    const { updateData, messageSchedulelist } = useMqtt();


    const [scheduleList, setScheduleList] = useState(JSON.parse(messageSchedulelist).schedule_list);
    //const [indexSchedule, setIndexSchedule] = useState(0);
    useEffect(() => {
        setScheduleList(JSON.parse(messageSchedulelist).schedule_list);
    }, [messageSchedulelist]);

    // useEffect(() => {
    //     if (scheduleList.length > 0) {
    //         setIndexSchedule(scheduleList.length)
    //     }
    // }, [scheduleList]);


    const handleAddSchedule = (schedule) => {
        console.log('Schedule Update from server', scheduleList);
        const newList = [...scheduleList, schedule];
        payload_schedule.schedule_list = newList;
        console.log('Add schedule');
        updateData(payload_schedule);
        setScheduleList(newList);
    }

    const handleIsActive = (isActive, index) => {
        if (scheduleList.length === 0) {
            console.log('Mang rong is');
        } else {
            if (isActive != scheduleList[index].isActive) {
                scheduleList[index].isActive = isActive;
                console.log('Index:', index);
                console.log('IsActive update at ScheduleStack: ', scheduleList[index].isActive);

                payload_schedule.schedule_list = scheduleList;
                console.log('Update isActive at ScheduleStack', payload_schedule);
                updateData(payload_schedule);
            }

        }
    }

    const handleRemoveSchedule = (index) => {
        if (scheduleList.length === 0) {
            console.log('Mang rong');
        } else {
            console.log('Remove: ', index);
            const newList = [...scheduleList];
            newList.splice(index, 1);

            payload_schedule.schedule_list = newList;
            console.log('Update isActive at ScheduleStack', payload_schedule);
            updateData(payload_schedule);
            setScheduleList(newList);
        }
    }

    // // Update Schedule to Server
    // useEffect(() => {
    //     if (scheduleList.length != 0) {
    //         payload_schedule.schedule_list = scheduleList;
    //         updateData(payload_schedule);
    //     }

    // }, [scheduleList]);



    return (
        <Stack.Navigator initialRouteName="Schedule">
            <Stack.Screen
                name="Schedule"
                options={{ headerShown: false }}>
                {(props) => <Schedule
                    {...props}
                    updateIsActive={handleIsActive}
                    removeSchedule={handleRemoveSchedule}

                    scheduleList={scheduleList}
                />}

            </Stack.Screen>

            <Stack.Screen
                name="ScheduleSetting"
                options={{ headerShown: false }}>
                {(props) => <ScheduleSetting
                    {...props}
                    onDataFromScheduleStack={handleAddSchedule}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ScheduleStack;
