import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation, router} from 'expo-router';
import {useEffect} from 'react';
import { logout } from '../../../services/Auth.service';

export default function Tab() {
    const handleLogOut = async () => {
        logout();
        
        //This clears navigation history and goes back to the first screen 
        if (router.canDismiss()) router.dismissAll();
    };
    return (
        <View style={styles.container}>
            <Text>Tab [Settings]</Text>
            <Button title="Logout" onPress={handleLogOut}/>
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