import {View, Text, StyleSheet, Button} from 'react-native';

import {useEffect} from 'react';
import { router } from 'expo-router';

export default function Tab() {


    return (
        <View style={styles.container}>
            <Text>Tab [Home]</Text>
            {/* <Button title="Logout" onPress={handleLogOut}/> */}
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