import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/outside/login';
import Register from '../screens/outside/register';
import Monitor from '../screens/inside/cropMonitor/monitor';
import Controller from '../screens/inside/controller/controller'
import MqttProvider from '../dataProvider'
import ScreenTest from '../screenTest'
import Schedule from '../screens/inside/schedule/schedule';
const Stack = createNativeStackNavigator()
export default function AppNavigation() {
    return (

        <NavigationContainer>
            <MqttProvider>
                <Stack.Navigator initialRouteName="Monitor">

                    <Stack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                        component={Login}
                    />

                    <Stack.Screen
                        name="Register"
                        options={{ headerShown: false }}
                        component={Register}
                    />
                    <Stack.Screen
                        name="Monitor"
                        options={{ headerShown: false }}
                        component={Monitor}
                    />
                    <Stack.Screen
                        name="Controller"
                        options={{ headerShown: false }}
                        component={Controller}
                    />
                    <Stack.Screen
                        name="ScreenTest"
                        options={{ headerShown: false }}
                        component={ScreenTest}
                    />
                    <Stack.Screen
                        name="Schedule"
                        options={{ headerShown: false }}
                        component={Schedule}
                    />
                </Stack.Navigator>
            </MqttProvider>
        </NavigationContainer>

    );
}
