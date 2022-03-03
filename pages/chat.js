import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { AuthContext } from '../routes/Authentication/AuthProvider';

export default function Chat() {

    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center' }}>
                This is Chat Page !
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6'
    },
})