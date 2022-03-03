import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'

import database from '@react-native-firebase/database'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { AuthContext } from '../routes/Authentication/AuthProvider';
import { FeedsStoresUserContext } from '../otherPages/Context';

let dbstores = database().ref();


function VChat() {

    const { user, logout } = useContext(AuthContext);

    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);


    return (
        <View style={styles.container}>

            <Text>Chat page</Text>



        </View>
    )
}

export default VChat



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F6'
    },

    shopImages: {
        height: 175.5,
        backgroundColor: 'white',
        resizeMode: 'cover',

    },

    line: {
        borderWidth: 0.4,
        borderColor: 'pink',
        margin: 10,
    }

})