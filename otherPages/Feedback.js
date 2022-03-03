import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Modal, ViewBase, Button, TextInput, TouchableWithoutFeedback, } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'


import moment from 'moment';

// import { feed } from '../pages/dummydata'
import database from '@react-native-firebase/database'

import { FeedsStoresUserContext } from './Context'


function Feedback({ route, navigation }, props) {


    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const { item_post_id } = route.params;

    // rataings bar
    const [ratingBar, setratingBar] = useState([1, 2, 3, 4, 5])

    //rating selected value
    const [ratingValue, setratingValue] = useState(0)

    // Review Textinput
    const [reviewValue, setreviewValue] = useState()


    const uploadFeedback = (rating, review, userID) => (
        database().ref(`feeds/${item_post_id}/feedbacks/${userID}/`).set(
            {
                date: database.ServerValue.TIMESTAMP,
                rating: rating,
                review: review,
            }
        ).then(() => alert("Thank's for your Feedback ❤🤗"))
    )

    return (


        <View style={styles.container}>

            {/* product info */}
            <View style={styles.contentBackgrounds}>
                <Text style={{ fontWeight: '600', }}>{feed[item_post_id][feed[item_post_id]['shop_id'] ? 'shop_name' : 'd_name']}</Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>{feed[item_post_id][feed[item_post_id]['shop_id'] ? 'shop_id' : 'd_id']}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                    <Image style={styles.FeedbackPImage} source={{ uri: feed[item_post_id]['image'] }} />


                    <View style={{ marginLeft: 15, flexShrink: 1 }}>
                        <Text style={{ fontWeight: '600' }}>{feed[item_post_id]['title']}</Text>
                        {feed[item_post_id]['d_id'] ?
                            <Text style={{ fontStyle: 'italic' }}>Designed</Text>
                            :
                            <Text style={{ marginTop: 3 }}>{'\u20B9'} {feed[item_post_id]['price']}</Text>
                        }
                    </View>

                </View>

            </View>

            {/*Feedbacks Section */}
            {
                Object.values(userDetail['orders']).find((postID) => {
                    return (
                        item_post_id == postID ?
                         feed[item_post_id]['feedbacks'] ?
                            // !Object.keys(
                            !feed[item_post_id]['feedbacks'][userDetail['uid']]
                            //  ).find((user_key) => user_key == userDetail['uid'])
                            :
                            true

                            :
                            false
                    )
                })

                    ?

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
                            uploadFeedback(ratingValue, reviewValue, userDetail['uid']);
                        }}>
                            <Text style={{ borderWidth: 1, padding: 8, backgroundColor: 'black', color: 'gold', borderRadius: 5 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    :
                    null
            }

            {/* Feedbacks  title & list */}
            <View style={{ ...styles.contentBackgrounds, marginBottom: 0 }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>{feed[item_post_id]['feedbacks'] ? "Review's & Rating's" : "No Review's yet !"}</Text>
            </View>


            <ScrollView>
                {
                    feed[item_post_id]['feedbacks'] &&
                    Object.keys(feed[item_post_id]['feedbacks']).map((user_id_feedback) => (


                        <View key={user_id_feedback} style={{ ...styles.contentBackgrounds, marginBottom: 1 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <Text style={{ borderWidth: 1, padding: 5, fontWeight: 'bold', fontSize: 15, alignSelf: 'flex-start', borderRadius: 5, color: 'pink', backgroundColor: 'black' }}>{feed[item_post_id]['feedbacks'][user_id_feedback]['rating']} ⭐</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'grey' }}>{moment(feed[item_post_id]['feedbacks'][user_id_feedback]['date']).format('LL')}</Text>
                                    {userDetail['uid'] == user_id_feedback &&
                                        <>
                                            <Text> | </Text>
                                            <Text style={{ color: 'grey' }}>by you</Text>
                                        </>
                                    }
                                </View>
                            </View>

                            <Text style={{ marginTop: 15, marginBottom: 5 }}>{feed[item_post_id]['feedbacks'][user_id_feedback]['review']}</Text>


                        </View>


                    ))

                }
            </ScrollView>



        </View>


    )
}

export default Feedback

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F6',
        // height: "100%",
        //flexGrow: 1,
        flex: 1,

    },

    FeedbackPImage: {
        height: 70,
        width: "25%",
        backgroundColor: 'white',
        resizeMode: 'contain',
        // marginTop: 50,

    },

    postDetailContentContainer1: {
        //  paddingHorizontal: 20,
        //  paddingVertical: 20,
        //  backgroundColor: 'white',
        //marginBottom: 0
    },

    contentBackgrounds: {
        backgroundColor: 'white',
        marginBottom: 7,
        paddingVertical: 15,
        paddingHorizontal: 15
    },

    likes: {

        fontWeight: '300',
        fontSize: 15,
        color: 'pink',
        fontStyle: 'italic',
        textShadowColor: '#FFEDDA',
        textShadowRadius: 8
    },

    // productPrize: {
    //     fontSize: 19,
    //     color: '#F6F7D4',
    //     marginRight: 10,
    //     fontWeight: '700',
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     paddingVertical: 5,
    //     paddingHorizontal: 7,
    //     borderColor: '#4B6587',
    //     borderStyle: 'solid',
    //     backgroundColor: 'black',
    // },

    postShopName: {
        fontSize: 20,
        color: 'pink',
        textShadowColor: '#FFEDDA',
        textShadowRadius: 8
    },


    postDetailSizesList: {

        flexDirection: 'row',
        marginHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        // borderStyle: (postDetail['sizes'][item]) != 0 ? 'solid' : 'dashed',
        // borderColor: (postDetail['sizes'][item]) != 0 ? 'pink' : 'grey',
        borderRadius: 2,
        paddingHorizontal: 7,
        paddingVertical: 10,
        minWidth: 55,
        justifyContent: 'center'

    },


    //modal section----------
    modalContainer: {
        // marginTop: 'auto',
        // height: "50%",
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalMainContent:
    {
        backgroundColor: '#F8F8F6',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    modalHeader:
    {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    modalSizeList:
    {
        marginLeft: 0,
        marginRight: 25,
    },


})