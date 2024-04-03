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
        //setDataFromScheduleSetting(schedule);
    }


    //const [dataFromScheduleSetting, setDataFromScheduleSetting] = useState();



    return (
        <Stack.Navigator initialRouteName="Schedule">
            <Stack.Screen
                name="Schedule"
                options={{ headerShown: false }}>
                {(props) => <Schedule
                    {...props}
                    //dataFromScheduleStack={dataFromScheduleSetting}
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
