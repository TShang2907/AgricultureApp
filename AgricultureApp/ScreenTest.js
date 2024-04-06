import React, { useContext } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { useMqtt } from './dataProvider';

const ScreenTest = () => {
    const { updateData } = useMqtt();

    return (
        <View style={styles.container}>
            <Button title='Send data' onPress={updateData}></Button>
        </View>
    );
}

export default ScreenTest;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});