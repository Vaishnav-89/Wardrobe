import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView } from 'react-native'

import moment from 'moment';

import { FeedsStoresUserContext } from './Context';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

import { AuthContext } from '../routes/Authentication/AuthProvider';
import database from '@react-native-firebase/database'
import { array } from 'yup';




// User Saved Posts - List Display Page
export default function Saved({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    // to store saved PostID (keys) from the user
    const [savedListKeys, setsavedListKeys] = useState()

    useEffect(() => {

        if (userDetail['saved']) {
            console.log(userDetail.saved);
            //getting keys from the orders object in User
            let array = Object.keys(userDetail.saved);
            setsavedListKeys(array)
        }

    }, [userDetail.saved])

    return (
        <View style={styles.container}>

            {/* Saved List */}
            <FlatList
                data={savedListKeys}
                keyExtractor={(item) => (item)}
                showsVerticalScrollIndicator={false}
                numColumns={3}


                renderItem={({ item }) => (

                    <View style={{}}>

                        <TouchableOpacity style={{ borderBottomWidth: 1, borderRightWidth: 1, borderColor: 'grey' }} onPress={() => {
                            navigation.navigate('PostDetailPage', { item_post_id: item })
                        }}>
                            <Image style={{ height: 198.4, width: 118, resizeMode: 'cover', }} source={{ uri: feed[item]['image'] }} />


                        </TouchableOpacity>


                    </View>
                )}
            />

            {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1,
        //marginVertical: 10,
    },

    ordersListImage: {
        height: 80,
        width: "25%",
        resizeMode: 'contain',
        backgroundColor: 'white'
    },


    modalContainer: {
        // marginTop: 'auto',
        // height: "50%",
        backgroundColor: '#F8F8F6',
        flex: 1,
        // justifyContent: 'flex-end',
    },



    modalHeader:
    {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: 'grey',
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    orderDetailsRowsContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 2
    },

    orderDetailsRows: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    orderDetailsRowsHeading: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },

    postShopName: {
        fontSize: 20,
        color: 'pink',
        textShadowColor: '#FFEDDA',
        textShadowRadius: 8
    },

    contentBackgrounds: {
        backgroundColor: 'white',
        marginBottom: 7,
        paddingVertical: 15,
        paddingHorizontal: 15
    },


    line: {
        borderBottomWidth: 0.3,
        borderColor: 'pink',
        marginVertical: 10,
    },

})