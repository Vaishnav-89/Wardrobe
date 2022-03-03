import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, TouchableOpacityBase } from 'react-native'

import { FeedsStoresUserContext } from '../otherPages/Context';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

import { AuthContext } from '../routes/Authentication/AuthProvider';


export default function Account({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);

    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: 'pink', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>

                <MaterialCommunityIcon name="account-circle" size={75} color='white' style={{ margin: 0 }} />
                <TouchableOpacity onPress={() => console.log('account edit btn clicked!')} style={{ top: 10, right: 20, position: 'absolute' }}>
                    <MaterialIcon name="edit" size={20} color='pink'
                        style={{ padding: 5, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 15, }} />
                </TouchableOpacity>


                <Text style={styles.infoTxt}>{userDetail.username}</Text>

                <Text style={styles.infoTxt}>{userDetail.contact}</Text>

                <Text style={styles.infoTxt}>{userDetail.email_id}</Text>

                <Text style={styles.infoTxt}>{userDetail.address1},{userDetail.address2},{userDetail.district},{userDetail.state} - {userDetail.pincode}</Text>

            </View>

            <View style={styles.AccOptBtnOutline}>

                {/* orders button */}
                <TouchableOpacity style={{ ...styles.AccOptBtn, }} onPress={() => navigation.navigate('Orders')}>
                    <Text style={styles.AccOptBtnTxt}>Your Orders</Text>
                    <SimpleLineIcon name="arrow-right" color='pink' size={18} style={{ alignSelf: 'center', }} />
                </TouchableOpacity>

                <View style={styles.line}></View>

                {/* Wishlist button */}
                <TouchableOpacity style={styles.AccOptBtn} onPress={() => navigation.navigate('Saved')}>
                    <Text style={styles.AccOptBtnTxt}>Your WishList</Text>
                    <SimpleLineIcon name="arrow-right" color='pink' size={18} style={{ alignSelf: 'center', }} />
                </TouchableOpacity>


            </View>

            <View style={styles.AccOptBtnOutline}>
                <TouchableOpacity style={styles.AccOptBtn}>
                    <Text style={styles.AccOptBtnTxt}>Change Password</Text>
                    <SimpleLineIcon name="arrow-right" color='pink' size={18} style={{ alignSelf: 'center', }} />
                </TouchableOpacity>




                <TouchableOpacity
                    style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        //borderWidth: 1,
                        borderBottomLeftRadius: 3,
                        borderBottomRightRadius: 3,
                        marginHorizontal: 0,
                        paddingHorizontal: 13,
                        paddingVertical: 18,
                        backgroundColor: 'black',

                    }}
                    onPress={() => logout()}>
                    <Text style={{ ...styles.AccOptBtnTxt, color: 'white', }}>Logout</Text>
                    <MaterialIcon name="logout" color='pink' size={18} style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1,
        // paddingVertical: 10,
        //  paddingHorizontal: 20
    },

    infoTxt: {
        marginVertical: 1,
        fontSize: 15,
        fontWeight: '500'
        //marginHorizontal: 10
    },

    AccOptBtnOutline: {
        marginHorizontal: 20,
        marginVertical: 25,
        borderWidth: 1,
        borderRadius: 5,

    },

    AccOptBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderRadius: 5,
        paddingHorizontal: 13,
        paddingVertical: 18,

    },

    AccOptBtnTxt: {
        fontSize: 18,
        fontWeight: '300',
    },

    line: {
        borderWidth: 0.2,
        // borderColor: 'pink',
    }

})