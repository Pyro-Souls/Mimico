import {View, Text, StyleSheet, Button} from 'react-native';

import {useEffect} from 'react';
import { router } from 'expo-router';

import useStore from '../../../providers/store';

export default function Tab() {
    const { user } = useStore();

    return (
        <View style={styles.container}>
            <Text>Tab [Home]</Text>
            <Text>Current user logged in:{user.email}{user.username}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});