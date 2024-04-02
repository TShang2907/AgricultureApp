import { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenTest from '../../../screenTest';
import Schedule from './schedule';
import { MqttContext } from '../../../dataProvider';
const Stack = createNativeStackNavigator()

const ScheduleStack = () => {
    const dataReceived = useContext(MqttContext);
    console.log('Data to Schedule', dataReceived);

    const [dataFromStackScreen, setDataFromStackScreen] = useState(0);

    useEffect(() => {
        console.log('Data: ', dataFromStackScreen);
    }, [dataFromStackScreen]);



    return (
        <Stack.Navigator initialRouteName="Schedule">
            <Stack.Screen
                name="Schedule"
                options={{ headerShown: false }}>
                {(props) => <Schedule
                    {...props}
                    dataFromHomeStack={dataReceived.isEnabled1}
                    onDataFromStackScreen={(data) => setDataFromStackScreen(data)}
                />}

            </Stack.Screen>

            <Stack.Screen
                name="ScreenTest"
                options={{ headerShown: false }}>
                {(props) => <ScreenTest
                    {...props}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ScheduleStack;
