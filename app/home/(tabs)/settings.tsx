import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation, router} from 'expo-router';
import {useEffect} from 'react';

export default function Tab() {
    const navigation = useNavigation();

    const handleLogOut = () => {
        //Log Out Logic here

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