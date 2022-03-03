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




// User Orders(History) List Display(Your Orders) Page
export default function Orders({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    // to store orderID keys from the user
    const [ordersListKeys, setordersListKeys] = useState()

    //order detail modal state
    const [orderDetailsModal, setorderDetailsModal] = useState(false)
    //to store selected order_id from ordered lists
    const [selectedOrder_id, setselectedOrder_id] = useState()

    // Feedback write View
    const [feedbackView, setfeedbackView] = useState(false)

    // rataings bar
    const [ratingBar, setratingBar] = useState([1, 2, 3, 4, 5])

    //rating selected value
    const [ratingValue, setratingValue] = useState(0)

    // Review Textinput
    const [reviewValue, setreviewValue] = useState()

    //to upload feedback in database
    const uploadFeedback = (rating, review, userID, postID) => (
        database().ref(`feeds/${postID}/feedbacks/${userID}/`).set(
            {
                date: database.ServerValue.TIMESTAMP,
                rating: rating,
                review: review,
            }
        ).then(() => {
            alert("Thank's for your Feedback ❤🤗")
            setratingValue(0)
            setreviewValue()
        })
    )



    useEffect(() => {

        console.log(userDetail.orders);
        //getting keys from the orders object in User
        let array = Object.keys(userDetail.orders);
        setordersListKeys(array)
        //  console.log(array);
        // console.log(orders);

        // to get user order list
        // let data =
        //     array.filter((item1) => (
        //         Object.values(orders).map((item2) => {
        //             return item1 == item2.order_id
        //         })
        //     ))


        // console.log(data)




    }, [])

    return (
        <View style={styles.container}>

            {/* Orders List */}
            <FlatList
                data={ordersListKeys}
                keyExtractor={(item) => (item)}
                showsVerticalScrollIndicator={false}
                // ItemSeparatorComponent={
                //     () => (
                //         <View style={{ height: 10, width: "100%" }}>

                //         </View>
                //     )
                // }

                renderItem={({ item }) => (

                    <View style={{ borderWidth: 0.5, borderRadius: 10, borderColor: 'pink', marginHorizontal: 15, marginVertical: 5, paddingVertical: 10, backgroundColor: 'white' }}>

                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('PostDetailPage', { item_post_id: orders[item]['post_id'] })
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                                <View style={{ justifyContent: 'space-between', width: '75%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, paddingRight: 10 }}>{feed[orders[item]['post_id']]['title']}</Text>
                                    <View style={{ paddingTop: 7 }}>
                                        <Text style={{ color: 'grey', fontSize: 10 }}>Ordered on</Text>
                                        <Text style={{ fontSize: 12 }} >{moment(orders[item]['order_date']).format('LL')}</Text>
                                    </View>
                                </View>

                                <Image style={styles.ordersListImage} source={{ uri: feed[orders[item]['post_id']]['image'] }} />

                            </View>
                        </TouchableWithoutFeedback>

                        {/* line */}
                        <View style={styles.line}></View>

                        {/* View order details Btn */}
                        <TouchableOpacity onPress={
                            () => {
                                setselectedOrder_id(item)
                                setorderDetailsModal(true)
                            }
                        }>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ paddingHorizontal: 15, fontWeight: '300' }}>View order details</Text>
                                <SimpleLineIcon name="arrow-right" size={15} style={{ marginRight: 15 }} />
                            </View>
                        </TouchableOpacity>



                        {/* Write feedback Btn */}
                        {
                            feed[userDetail['orders'][item]]['feedbacks'] ?
                                feed[userDetail['orders'][item]]['feedbacks'][user.uid] && null
                                :
                                <>
                                    {/* line */}
                                    <View style={styles.line}></View>

                                    <TouchableWithoutFeedback onPress={
                                        () => {
                                            setratingValue(0)
                                            setreviewValue()
                                            setfeedbackView(e => !e)
                                            // setselectedOrder_id(item)
                                            // setorderDetailsModal(true)
                                        }
                                    }>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ paddingHorizontal: 15, fontWeight: '300' }}>Write Feedback</Text>
                                            <MaterialCommunityIcon name={feedbackView ? "window-close" : "pencil-box-multiple-outline"} size={20} style={{ marginRight: 15 }} />
                                        </View>
                                    </TouchableWithoutFeedback>

                                    {feedbackView &&

                                        <View style={styles.contentBackgrounds}>

                                            <Text style={{ textAlign: 'center' }}>How was your Product ? Please rate us !</Text>

                                            {/* Rating Selection */}
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 13 }}>{

                                                ratingBar.map((value) => (
                                                    <TouchableWithoutFeedback key={value} onPress={() => setratingValue(value)}>
                                                        {value <= ratingValue ?
                                                            <FontAwesome name='star' size={30} style={{ marginHorizontal: 5, color: '#FFCE45', }} />
                                                            :
                                                            <FontAwesome name='star-o' size={30} style={{ marginHorizontal: 5 }} />
                                                        }
                                                    </TouchableWithoutFeedback>
                                                ))


                                            }
                                            </View>

                                            {/* Review Input */}
                                            <TextInput
                                                placeholder="Give your Review ! Here "
                                                multiline={true}
                                                style={{ borderWidth: 1, paddingHorizontal: 15 }}
                                                onChangeText={(e) => setreviewValue(e)}
                                            />

                                            {/* Feedback Submit button */}
                                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 15 }} onPress={() => {
                                                console.log(ratingValue + reviewValue)
                                                uploadFeedback(ratingValue, reviewValue, userDetail['uid'], userDetail['orders'][item]);
                                            }}>
                                                <Text style={{ borderWidth: 1, padding: 8, backgroundColor: 'black', color: 'gold', borderRadius: 5 }}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>

                                    }

                                </>

                        }

                    </View>
                )}
            />

            {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}

            {/* Order Detail Modal */}
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