import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

// import { feed, stores } from '../pages/dummydata'

import { ShopIdContext, FeedsStoresUserContext } from './Context'


function ShopDetailPage() {

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const item_vendor_id = React.useContext(ShopIdContext);

    //const { item_shop_id } = route.params;

    // const [vendorDetail, setvendorDetail] = useState({});


    // useEffect(() => {
    //     const store = Object.values(stores).find(
    //         (store) => {
    //             return store.shop_id === item_vendor_id;
    //         }
    //     )
    //     setvendorDetail(store);

    // }, [])

    const [subscribeText, setsubscribeText] = useState("SUBSCRIBE")
    const [isSubscribed, setisSubscribed] = useState(false)

    const subscriptionbtn = () => {
        console.log('sub')
        if (isSubscribed) {
            setisSubscribed(false)
            setsubscribeText("SUBSCRIBE")
        } else {
            setisSubscribed(true)
            setsubscribeText("UNSUBSCRIBE")
        }
    }

    //===================================





    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >


                {/* shop_picture */}

                {stores[item_vendor_id] ?
                    <>{
                        stores[item_vendor_id]["shop_image"] === "" ?

                            <Image style={styles.shopImages} source={{ uri: "https://i.pinimg.com/736x/37/6f/5a/376f5a79f1dae1498ad29859fc47271c.jpg" }} />
                            :
                            <Image style={styles.shopImages} source={{ uri: stores[item_vendor_id]["shop_image"] }} />
                    }

                    </>
                    :
                    <>
                        {designers[item_vendor_id]["d_image"] === "" ?

                            <Image style={styles.shopImages} source={{ uri: "https://media.istockphoto.com/illustrations/sewing-doodles-illustration-id176023117" }} />
                            :
                            <Image style={styles.shopImages} source={{ uri: designers[item_vendor_id]["d_image"] }} />

                        }
                    </>
                }



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 15, }}>

                    {/* Designer Profile pic & tag */}
                    <View style={{ width: "30%", }}>

                        {designers[item_vendor_id] &&

                            <View style={{ top: -30, }}>

                                <View style={{
                                    height: 130, borderRadius: 5, borderWidth: 3, backgroundColor: 'white', borderColor: 'pink', alignItems: 'center'
                                }}>
                                    {designers[item_vendor_id]["d_image"] === "" ?

                                        <Image style={styles.designerProfileImage} source={{ uri: "https://static.vecteezy.com/system/resources/previews/002/534/006/large_2x/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg" }} />
                                        :
                                        <Image style={styles.designerProfileImage} source={{ uri: designers[item_vendor_id]['designer']["image"] }} />

                                    }
                                </View>

                                <Text style={styles.designerTag}>
                                    Designer
                                </Text>
                            </View>
                        }
                    </View>

                    {/* shop_name & ID*/}
                    <View style={{ width: '70%', top: -10, }}>
                        <Text style={styles.shopName}>{stores[item_vendor_id] ? stores[item_vendor_id]["shop_name"] : designers[item_vendor_id]["d_name"]}</Text>
                        <Text style={styles.shopId}>@{stores[item_vendor_id] ? stores[item_vendor_id]["shop_id"] : designers[item_vendor_id]["d_id"]}</Text>
                    </View>

                </View>



                {/* <View style={{ marginHorizontal: 15 }}> */}

                {/* shop_detail_container */}
                {/* container */}
                <View style={{ marginVertical: 0 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 7 }}>
                        {/* subscribtion btn */}
                        <TouchableOpacity onPress={subscriptionbtn} style={styles.subscribeBtn}>
                            <Text style={{
                                ...styles.subscribeText,
                                color: isSubscribed ? 'grey' : 'red',
                                borderColor: isSubscribed ? 'grey' : 'red',
                            }}>
                                {subscribeText}</Text>
                        </TouchableOpacity>

                        {/* Chat btn */}

                        <TouchableOpacity style={styles.subscribeBtn}>
                            <Text style={{
                                ...styles.subscribeText,
                                color: 'green',
                                borderColor: 'green',
                            }}>
                                Chat
                            </Text>
                        </TouchableOpacity>



                        {/* Hire btn */}
                        {designers[item_vendor_id] &&
                            <TouchableOpacity style={styles.subscribeBtn}>
                                <Text style={{
                                    ...styles.subscribeText,
                                    color: 'blue',
                                    borderColor: 'blue',
                                }}>
                                    Hire
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>

                    {/* about description */}
                    <View style={{ ...styles.contentBackgrounds, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold', }}>About  </Text>
                            <Text style={{ color: '#EB92BE', fontWeight: 'bold', fontSize: 18 }}>{stores[item_vendor_id] ? stores[item_vendor_id]["shop_name"] : designers[item_vendor_id]["d_name"]},</Text>
                        </View>

                        <Text style={{ marginVertical: 7, lineHeight: 17.5 }}>{stores[item_vendor_id] ? stores[item_vendor_id]["shop_description"] : designers[item_vendor_id]["d_description"]}</Text>
                    </View>

                    {/* swipe container */}
                    {/* <View style={styles.swipeContainer}>
                            <MaterialCommunityIcons name="gesture-swipe-left" size={24} style={{ marginHorizontal: 10 }} />
                            <Text style={{ fontWeight: 'bold', }}>SWIPE LEFT</Text>
                            <Text style={{ fontWeight: '300', marginLeft: 10, }}>to View our Products</Text>
                        </View> */}


                    {/* designer Experience & No.of Works */}
                    {designers[item_vendor_id] &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ ...styles.contentBackgrounds, alignSelf: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '600', marginRight: 20, color: '#EB92BE', fontSize: 16 }}>Experience</Text>
                                    <Text style={{ fontWeight: '600', fontSize: 18 }}>{designers[item_vendor_id]["d_experience"] == 0 ? "Fresher" : designers[item_vendor_id]["d_experience"]}</Text>
                                    <Text style={{ fontStyle: 'italic', marginLeft: 5 }}>{designers[item_vendor_id]["d_experience"] == 0 ? null : "years"}</Text>
                                </View>
                            </View>

                            <View style={{ ...styles.contentBackgrounds, alignSelf: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: '600', marginRight: 20, color: '#EB92BE', fontSize: 16 }}>Hired</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{designers[item_vendor_id]["d_works"] == 0 ? "-" : designers[item_vendor_id]["d_works"]}</Text>
                                    <Text style={{ fontStyle: 'italic', marginLeft: 5 }}>{designers[item_vendor_id]["d_works"] == 0 ? null : "times"}</Text>

                                </View>
                            </View>
                        </View>

                    }


                    {/* shop_address */}
                    <View style={styles.contentBackgrounds}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            {/* <Entypo name="address" size={18} style={{ marginRight: 8 }} /> */}
                            <Text style={{ fontWeight: "600", fontSize: 16 }}>Address</Text>
                        </View>

                        <Text style={{ marginVertical: 7, marginStart: 25 }}>{stores[item_vendor_id] ? stores[item_vendor_id]["shop_district"] + " , " + stores[item_vendor_id]["shop_state"]
                            :
                            designers[item_vendor_id]["designer"]['district'] + " , " + designers[item_vendor_id]["designer"]['state']}
                        </Text>
                    </View>


                    {/* <View style={styles.line}></View> */}

                    {/* <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Entypo name="old-phone" size={18} style={{ marginRight: 8 }} />
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Contact  : </Text>
                            <Text style={{ marginHorizontal: 7 }}>{stores[item_vendor_id]["shop_contact"]}</Text>
                        </View> */}

                </View>


                {/* </View> */}

                {/* ======================================================================= */}


            </ScrollView>
        </View>
    )
}

export default ShopDetailPage

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

    designerProfileImage: {
        height: "100%",
        width: "100%",
        //   alignSelf: 'center',
        resizeMode: 'contain',
        // backgroundColor: 'white',


        //   borderColor: 'red'
    },


    designerTag: {
        marginTop: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5, textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'black', color: 'pink',
        fontWeight: '500', fontStyle: 'italic',
        //alignSelf: 'flex-start',
        // top: 10, left: 10
    },

    shopName: {

        // position: 'absolute',
        //right: "3%",
        alignSelf: 'flex-end',
        fontSize: 22,
        fontWeight: '300',
        fontStyle: 'italic',
        // top: 164,
        //  top: -40,
        //borderWidth: 1,
        paddingTop: 22,
        paddingBottom: 10,
        paddingHorizontal: 15,
        color: 'pink',
        backgroundColor: 'rgba(41, 52, 52, 0.8)',
        borderRadius: 15,
    },

    shopId: {
        alignSelf: 'flex-end',
        marginTop: 3,
        fontWeight: 'bold'
        //marginRight: 15
    },

    subscribeBtn: {
        alignSelf: 'flex-start',
        width: 117,
    },

    subscribeText: {
        padding: 10,
        //paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 5,
        textAlign: 'center'
    },

    swipeContainer: {
        flexDirection: 'row',
        // borderTopWidth: 2,
        // borderBottomWidth: 2,
        borderRadius: 5,
        alignSelf: 'center',

        padding: 10,
        borderColor: 'rgba(41, 52, 52, 0.8)',
        //paddingHorizontal: 50,
        marginVertical: 15,
    },

    contentBackgrounds: {
        backgroundColor: 'white',
        marginBottom: 7,
        paddingVertical: 15,
        paddingHorizontal: 15
    },


    line: {
        borderBottomWidth: 0.5,
        borderColor: 'pink',
        margin: 10,
    }

})