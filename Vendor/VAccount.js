import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image, TextInput, ScrollView } from 'react-native'

import database from '@react-native-firebase/database'

import { AuthContext } from '../routes/Authentication/AuthProvider';
import { FeedsStoresUserContext } from '../otherPages/Context';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

let dbstores = database().ref();


function VAccount() {

    const { user, logout } = useContext(AuthContext);

    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);


    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Vendor details section */}
                <View style={{ backgroundColor: "white", padding: 20, marginBottom: 5 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0 }}>
                        <Text style={{ fontWeight: '400', fontSize: 25, color: 'pink' }}>Vendor Detail's</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => console.log("edit Profile btn clicked !")}>
                                <Feather name="edit-3" color='black' size={30} style={{ alignSelf: 'center', marginEnd: 7 }} />
                            </TouchableOpacity>
                            <MaterialIcon name="account-circle" color='pink' size={32} style={{ alignSelf: 'center' }} />
                        </View>
                    </View>


                    <View style={{ ...styles.line, borderColor: 'black', marginHorizontal: 0 }}></View>



                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>Name</Text>
                        <Text style={{ marginHorizontal: 10, flex: 10 }}>{userDetail["vendor"]["name"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>Phone</Text>
                        <Text style={{ marginHorizontal: 10, flex: 10 }}>{userDetail["vendor"]["phone"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>E-Mail</Text>
                        <Text style={{ marginHorizontal: 10, flex: 10 }}>{userDetail["vendor"]["email"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 0 }}>Address</Text>
                        <Text style={{ marginHorizontal: 0, flex: 0 }}>{userDetail["vendor"]["address1"]} , {userDetail["vendor"]["address2"]} , {userDetail["vendor"]["district"]} , {userDetail["vendor"]["state"]} - {userDetail["vendor"]["pincode"]}</Text>
                    </View>

                </View>



                {/* Shop details section */}
                <View style={{ backgroundColor: "white", padding: 20, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0, }}>
                        <Text style={{ fontWeight: '400', fontSize: 25, color: 'pink' }}>Shop Detail's</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => console.log("edit Shop btn clicked !")}>
                                <Feather name="edit-3" color='black' size={30} style={{ alignSelf: 'center', marginEnd: 10 }} />
                            </TouchableOpacity>

                            <Entypo name="shop" color="pink" size={32} style={{ alignSelf: 'center' }} />
                        </View>
                    </View>

                    <View style={{ ...styles.line, borderColor: 'black', marginHorizontal: 0 }}></View>


                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>ID</Text>
                        <Text style={{ marginHorizontal: 10, flex: 35 }}>{userDetail["shop_id"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 0 }}>Name</Text>
                        <Text style={{ marginHorizontal: 0, flex: 0 }}>{userDetail["shop_name"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', }}>Description</Text>
                        <Text style={{ marginHorizontal: 0, }}>{userDetail["shop_description"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>District</Text>
                        <Text style={{ marginHorizontal: 10, flex: 8 }}>{userDetail["shop_district"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>State</Text>
                        <Text style={{ marginHorizontal: 10, flex: 8 }}>{userDetail["shop_state"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>Pincode</Text>
                        <Text style={{ marginHorizontal: 10, flex: 8 }}>{userDetail["shop_pincode"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>Contact</Text>
                        <Text style={{ marginHorizontal: 10, flex: 8 }}>{userDetail["shop_contact"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 2 }}>E-Mail</Text>
                        <Text style={{ marginHorizontal: 10, flex: 8 }}>{userDetail["shop_email"]}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginVertical: 3 }}>
                        <Text style={{ fontWeight: 'bold', flex: 0 }}>Address</Text>
                        <Text style={{ marginHorizontal: 0, flex: 0 }}>{userDetail["shop_address1"]} , {userDetail["shop_address2"]} , {userDetail["shop_district"]} , {userDetail["shop_state"]} - {userDetail["shop_pincode"]}</Text>
                    </View>

                </View>

                <TouchableOpacity>
                    <Text style={{
                        marginVertical: 3,
                        borderWidth: 0, padding: 15,
                        borderRadius: 5,
                        textAlign: 'center',
                        fontSize: 16,
                        color: 'pink',
                        fontWeight: 'bold',
                        backgroundColor: 'white'
                    }}>Change Password</Text>
                </TouchableOpacity>

                {/* logout btn */}
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={{
                        marginVertical: 0,
                        borderWidth: 0, padding: 15,
                        borderRadius: 5,
                        textAlign: 'center',
                        fontSize: 16,
                        color: 'pink',
                        fontWeight: '400',
                        letterSpacing: 3,
                        backgroundColor: 'black'
                    }}>Logout</Text>
                </TouchableOpacity>



            </ScrollView>

        </View>
    )
}

export default VAccount



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F6',
    },

    shopImages: {
        height: 175.5,
        backgroundColor: 'white',
        resizeMode: 'cover',

    },

    line: {
        borderWidth: 0.3,
        borderColor: 'pink',
        margin: 10,
        // marginHorizontal: 10,
    }

})