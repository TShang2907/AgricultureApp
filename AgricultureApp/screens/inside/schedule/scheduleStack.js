import { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleSetting from './scheduleSetting';
import Schedule from './schedule';
import { MqttContext } from '../../../dataProvider';
const Stack = createNativeStackNavigator()

const ScheduleStack = () => {
    const dataReceived = useContext(MqttContext);
    console.log('Data to Schedule', dataReceived);


    const [scheduleList, setScheduleList] = useState([]);

    const handleAddSchedule = (schedule) => {
        setScheduleList([...scheduleList, schedule]);
    }



    const handleIsActive = (isActive, index) => {
        if (scheduleList.length === 0) {
            console.log('Mang rong');
        } else {
            scheduleList[index].isActive = isActive;
            console.log('Index:', index);
            console.log('IsActive update at ScheduleStack: ', scheduleList[index].isActive);
            dataReceived.updateSchedule(scheduleList);
        }
    }

    const handleRemoveSchedule = (index) => {
        if (scheduleList.length === 0) {
            console.log('Mang rong');
        } else {
            const newList = [...scheduleList];
            newList.splice(index, 1);
            setScheduleList(newList);
            console.log('Remove: ', index);
        }
    }

    useEffect(() => {
        dataReceived.updateSchedule(scheduleList);
    }, [scheduleList]);

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
                    onDataFromScheduleStack={handleAddSchedule}//(data) => setDataFromScheduleSetting(data)}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ScheduleStack;
