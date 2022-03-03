import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, StyleSheet, Image } from 'react-native'

import database from '@react-native-firebase/database'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { AuthContext } from '../routes/Authentication/AuthProvider';
import { FeedsStoresUserContext } from '../otherPages/Context';

import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

let dbstores = database().ref();


function VOrders({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const { feed, userDetail, orders } = React.useContext(FeedsStoresUserContext);

    const [ordersListKeys, setordersListKeys] = useState()

    //modal state
    const [orderDetailsModal, setorderDetailsModal] = useState(false)
    //to store selected order_id from ordered lists
    const [selectedOrder_id, setselectedOrder_id] = useState()


    useEffect(() => {

        console.log(userDetail.orders);
        //getting keys from the orders object in User
        let array = Object.keys(userDetail.orders);
        setordersListKeys(array)

    }, [])

    return (
        <View style={styles.container}>

            {/* Orders List */}
            <FlatList
                data={ordersListKeys}
                keyExtractor={(item) => (item)}

                renderItem={({ item }) => (

                    <View style={{ borderWidth: 0, elevation: 3, borderRadius: 3, marginHorizontal: 15, marginVertical: 5, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white' }}>

                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('VShopPostDetails', { item_post_id: orders[item]['post_id'] })
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                <Image style={styles.ordersListImage} source={{ uri: feed[orders[item]['post_id']]['image'] }} />

                                <View style={{ width: "75%", marginLeft: 15 }}>
                                    <Text style={{ fontWeight: '500', fontSize: 16, paddingRight: 10 }}>{feed[orders[item]['post_id']]['title']}</Text>

                                    <Text style={{ fontSize: 13, fontWeight: '300' }}>Size - {orders[item]['size']}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '300' }}>Quantity - {orders[item]['quantity']}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '300' }}>Amount - {'\u20B9'}{orders[item]['total_amount']}</Text>

                                    <View style={{ paddingTop: 7 }}>
                                        <Text style={{ color: 'grey', fontSize: 10 }}>Ordered on</Text>
                                        <Text style={{ fontSize: 12 }} >{moment(orders[item]['order_date']).format('LL')}</Text>
                                    </View>
                                </View>


                            </View>
                        </TouchableWithoutFeedback>

                        {/* line */}
                        {/* <View style={styles.line}></View> */}

                        {/* View order details Btn
                        <TouchableOpacity onPress={
                            () => {
                                setselectedOrder_id(item)
                                setorderDetailsModal(true)
                            }
                        }>
                            <Text style={{ paddingHorizontal: 15, fontWeight: '300' }}>View order details</Text>
                        </TouchableOpacity> */}

                    </View>
                )}
            />

            {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}

            <Modal
                visible={orderDetailsModal}
                animationType='slide'
                onRequestClose={() => {
                    setorderDetailsModal(false)

                }}
            >

                {/* modal Cotainer */}
                <View style={styles.modalContainer}>

                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: 'pink' }}>Order Details</Text>
                        <MaterialIcon name='close'
                            size={29}
                            color='pink'
                            onPress={() => {
                                setorderDetailsModal(false)

                            }} />

                    </View>

                    {/* Modal Content */}
                    <ScrollView>

                        {
                            selectedOrder_id == undefined ? null :
                                <View style={{}}>

                                    {/* post Title */}
                                    <View style={{ backgroundColor: 'white', padding: 10, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{feed[orders[selectedOrder_id]['post_id']]['title']}</Text>
                                    </View>

                                    {/* post image */}
                                    <View style={{ backgroundColor: 'white', padding: 10, }}>
                                        <Image style={{ ...styles.ordersListImage, height: 200, width: '100%', }} source={{ uri: feed[orders[selectedOrder_id]['post_id']]['image'] }} />
                                    </View>

                                    {/* post_Shop Name & ID */}
                                    <View>

                                        <View style={styles.orderDetailsRowsContainer}>

                                            <TouchableOpacity style={{ alignSelf: 'flex-start', }} onPress={
                                                () => {
                                                    setorderDetailsModal(false)
                                                    navigation.navigate('ShopDetailNavigator', { item_shop_id: orders[selectedOrder_id]['shop_id'] })
                                                }
                                            }>
                                                <View style={{ flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
                                                    <Fontisto name="shopping-store" size={20} style={{ color: 'grey', marginRight: 8, }} />
                                                    <Text style={styles.postShopName}>{stores[orders[selectedOrder_id]['shop_id']]['shop_name']}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                    <View style={styles.orderDetailsRowsContainer}>

                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Ordered Date</Text>
                                            <Text style={{}}>{moment(orders[selectedOrder_id]['order_date']).format('LL')}</Text>
                                        </View>

                                        <View style={styles.line}></View>

                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Order ID</Text>
                                            <Text style={{}}>{orders[selectedOrder_id]['order_id']}</Text>
                                        </View>
                                    </View>



                                    <View style={styles.orderDetailsRowsContainer}>
                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Size</Text>
                                            <Text style={{}}>{orders[selectedOrder_id]['size']}</Text>
                                        </View>

                                        <View style={styles.line}></View>

                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Price</Text>
                                            <Text style={{}}>{'\u20B9'}{orders[selectedOrder_id]['price']}</Text>
                                        </View>
                                    </View>


                                    <View style={styles.orderDetailsRowsContainer}>
                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Quantity</Text>
                                            <Text style={{}}>{orders[selectedOrder_id]['quantity']}</Text>
                                        </View>

                                        <View style={styles.line}></View>

                                        <View style={styles.orderDetailsRows}>
                                            <Text style={styles.orderDetailsRowsHeading}>Total Amount</Text>
                                            <Text style={{}}>{'\u20B9'}{orders[selectedOrder_id]['total_amount']}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.orderDetailsRowsContainer}>
                                        <Text style={styles.orderDetailsRowsHeading}>Delivery Address</Text>
                                        <Text style={{ paddingTop: 5 }}>{orders[selectedOrder_id]['delivery_address']}</Text>

                                    </View>

                                </View>
                        }

                    </ScrollView>

                </View>

            </Modal>

        </View>
    )
}

export default VOrders



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F6'
    },

    ordersListImage: {
        width: '25%',
        height: 100,
        backgroundColor: 'white',
        resizeMode: 'cover',
        alignSelf: 'center',

    },

    line: {
        borderWidth: 0.4,
        borderColor: 'pink',
        margin: 10,
    }

})