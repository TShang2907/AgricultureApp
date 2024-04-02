import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
    },
    date: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    task: {
        flex: 5,
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


export default styles;
