import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'

import { Snackbar } from 'react-native-paper';

import { StackActions } from '@react-navigation/native';

import { FeedsStoresUserContext } from './Context';

import RazorpayCheckout from 'react-native-razorpay';

import database from '@react-native-firebase/database'
import DropDownPicker from 'react-native-dropdown-picker';


export default function PaymentConfirmation({ route, navigation }) {

    const { item_post_id, order_size } = route.params;

    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);

    //total amt state
    const [totalAmt, settotalAmt] = useState(feed[item_post_id]['price'])

    // console.log("!!!!!!");
    // console.log(postDetail);




    const makePayment = (title, price, mail, phn, nme) => {

        var options = {
            description: 'Payment for - ' + title,
            //image: require('../assets/razorpay_logo.jpg'),
            currency: 'INR',
            key: 'rzp_test_uWFfulytiWY5NT',
            amount: parseInt(price) + '00',
            name: 'Wardrobe',
            // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.

            prefill: {
                email: mail,
                contact: phn,
                name: nme
            },
            theme: { color: '#378787' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success

            navigation.dispatch(StackActions.popToTop());

            alert(`Order Placed !`);

            const newReference = database().ref(`orders/`).push();

            newReference
                .set({
                    order_id: newReference.key,
                    payment_id: data.razorpay_payment_id,
                    shop_id: feed[item_post_id]['shop_id'],
                    // shop_name: postDetail['shop_name'],
                    post_id: item_post_id,
                    // post_title: postDetail['title'],
                    // post_image: postDetail['image'],
                    quantity: value,
                    size: order_size,
                    price: price / value,
                    total_amount: price,
                    delivery_address: `${userDetail.address1},${userDetail.address2},${userDetail.district},${userDetail.state} - ${userDetail.pincode}`,
                    order_date: database.ServerValue.TIMESTAMP,
                })
                .then(() => {
                    // to upload order_id in stores and user in DB
                    database().ref(`users/${userDetail.uid}/orders/`).update({
                        [newReference.key]: item_post_id,
                    });

                    database().ref(`stores/${feed[item_post_id]['shop_id']}/orders/`).update({
                        [newReference.key]: newReference.key,
                    });
                    console.log('Order Data uploaded.')
                })
                ;

        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.description}`);
        });

    }


    //Dropdown states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },

    ]);




    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.contentBackgrounds}>

                    {/* User Deliver Address Display */}
                    <Text style={{ fontWeight: '400', fontSize: 18, marginBottom: 5 }}>{userDetail.username} </Text>
                    <Text style={{}}>{userDetail.address1},{userDetail.address2},{userDetail.district},{userDetail.state} - {userDetail.pincode}</Text>
                    <Text style={{ marginTop: 3, }}>{userDetail.contact} </Text>

                    {/* change delivery address btn */}
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', borderRadius: 5, padding: 10, backgroundColor: 'pink', color: 'white', textAlign: 'center', marginTop: 25, marginBottom: 7 }}>
                            Change Delivery Address
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentBackgrounds}>

                    {/* Order Bill Section */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>

                        {/* Product details */}
                        <View style={{ paddingHorizontal: 0, width: '75%' }} >

                            <Text style={{ paddingBottom: 7, fontSize: 17, }}>{feed[item_post_id]['title']}</Text>

                            <Text style={{ color: 'grey' }}>Size : {order_size}</Text>

                            {/* P_price */}
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 2 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600' }}>{'\u20B9'} </Text>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{feed[item_post_id]['price']}</Text>
                            </View>

                            <Text>{feed[item_post_id]['sizes'][order_size]}</Text>

                        </View>
                        {/* <Text>{feed[0]['sizes'][order_size].data}</Text> */}

                        {/* Product Image */}
                        <View style={{ width: '25%' }}>
                            <Image style={styles.postImage} source={{ uri: feed[item_post_id]["image"] }} />
                        </View>

                    </View>

                    {/* Product shop name & ID */}
                    <Text style={{ fontWeight: '500', fontSize: 16, color: 'pink' }}>{feed[item_post_id]['shop_name']}</Text>
                    <Text style={{ color: 'grey', fontSize: 10 }}>@{feed[item_post_id]['shop_id']}</Text>

                </View>


                {/* Quantity */}
                <View style={{ ...styles.contentBackgrounds, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                    <Text style={{ fontSize: 18, fontWeight: '400' }}>Quantity</Text>

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}

                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{ width: '22%', }}
                        listMode="SCROLLVIEW"
                        labelStyle={{
                            fontWeight: "bold",
                            color: 'pink'
                        }}
                        // items={[
                        //     { label: 'Item 1', value: 'item1' },
                        //     { label: 'Item 2', value: 'item2' },
                        // ]}
                        // defaultValue="item1"
                        // containerStyle={{ width: '50%' }}
                        // // style={{ backgroundColor: '#fafafa' }}
                        // // dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeValue={() => settotalAmt(feed[item_post_id]['price'] * value)}
                    />
                </View>



                {/* Price Details */}
                <View style={{ ...styles.contentBackgrounds, marginBottom: 0 }}>

                    <Text style={{ fontWeight: '400', fontSize: 17, color: 'pink' }}>Price Details</Text>

                    <View style={styles.line}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                        <Text>Price (1 item)</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>{'\u20B9'}{feed[item_post_id]['price']}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Quantity</Text>
                        <Text style={{ color: 'black', fontSize: 16 }}>x {value}</Text>
                    </View>

                    <View style={{ ...styles.line, borderStyle: 'dashed', }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Total Amount</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{'\u20B9'}{totalAmt}</Text>
                    </View>


                    <View style={styles.line}></View>

                </View>

                {/* Pay Button */}
                <TouchableWithoutFeedback onPress={() => makePayment(feed[item_post_id]['title'], totalAmt, userDetail['email_id'], userDetail['contact'], userDetail['username'])}>

                    <View style={{
                        width: '100%',
                        borderWidth: 3,
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        borderColor: 'grey',
                        // borderRadius: 10,
                        backgroundColor: 'black',
                        elevation: 15,
                    }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: 17,
                                color: 'pink',
                            }}
                        >
                            Pay  {'\u20B9'}{totalAmt}
                        </Text>

                    </View>

                </TouchableWithoutFeedback>

            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1,
    },

    contentBackgrounds: {
        backgroundColor: 'white',
        marginBottom: 7,
        paddingVertical: 15,
        paddingHorizontal: 20
    },

    postImage: {
        height: 100,
        //  width: 100,
        // backgroundColor: 'white',
        resizeMode: 'center',
        // marginTop: 50,

    },

    line: {
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginVertical: 15,
        width: '100%',
    },

})