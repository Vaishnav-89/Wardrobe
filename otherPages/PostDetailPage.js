import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, ViewBase, Button, TouchableWithoutFeedback } from 'react-native'

import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



import moment from 'moment';

// import { feed } from '../pages/dummydata'
import database from '@react-native-firebase/database'

import { FeedsStoresUserContext } from '../otherPages/Context'


function PostDetailPage({ route, navigation }) {


    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const { item_post_id } = route.params;

    // rataings bar
    const [ratingBar, setratingBar] = useState([1, 2, 3, 4, 5])

    //rating selected value
    const [ratingValue, setratingValue] = useState(0)

    // Review Textinput
    const [reviewValue, setreviewValue] = useState()

    // to upload feedback in DB
    const uploadFeedback = (rating, review, userID) => (
        database().ref(`feeds/${item_post_id}/feedbacks/${userID}/`).set(
            {
                date: database.ServerValue.TIMESTAMP,
                rating: rating,
                review: review,
            }
        ).then(() => alert("Thank's for your Feedback ❤🤗"))
    )

    // to save post in DB
    const SavePost = (postID, UserID) => {
        database().ref(`users/${UserID}/saved/`).update({
            [postID]: postID,
        }).then(() => console.log('post saved .'))
    }

    // to Unsave post in DB
    const UnSavePost = (postID, UserID) => {
        database().ref(`users/${UserID}/saved/${postID}`).remove().then(() => console.log('post Unsaved .'))
    }



    //modal sections
    const [selectSizeBuyModal, setselectSizeBuyModal] = useState(false)
    const [sizeHighlight, setsizeHighlight] = useState()

    return (


        <View style={styles.container}>

            {/* Product Detail Screen */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={false}

            // style={{ flexGrow: 1 }}
            //</View> 
            // contentContainerStyle={{
            //     //flex: 1,
            //     flexGrow: 1,

            //     //  height: "100%"
            //     //width: "100%",
            //     // maxHeight: "150%",

            // }}
            >

                {/* <View style={{
                    //height: "100%" ,
                    flex: 1
                }}> */}

                {/* image of product */}
                <View style={{
                    paddingTop: 10,

                    backgroundColor: 'white'
                }}>
                    <Image style={styles.postImage} source={{ uri: feed[item_post_id]["image"] }} />
                </View>

                {/* Container of product details */}
                <View style={styles.postDetailContentContainer1}>


                    <View style={styles.contentBackgrounds}>


                        {/* Product title */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 28, flex: 1 }}>{feed[item_post_id]["title"]}</Text>

                            {/* Save btn */}
                            <>
                                {userDetail['saved'] ?
                                    userDetail['saved'][item_post_id] ?
                                        <MaterialIcon
                                            style={{}}
                                            name="bookmark" size={27} color='pink'
                                            onPress={() => UnSavePost(item_post_id, userDetail['uid'])}
                                        />
                                        :
                                        <MaterialIcon
                                            style={{}}
                                            name="bookmark-outline" size={27} color='pink'
                                            onPress={() => SavePost(item_post_id, userDetail['uid'])}
                                        />
                                    :
                                    <MaterialIcon
                                        style={{}}
                                        name="bookmark-outline" size={27} color='pink'
                                        onPress={() => SavePost(item_post_id, userDetail['uid'])}
                                    />
                                }
                            </>
                        </View>


                        {/* Product Likes*/}
                        <Text style={styles.likes}>{feed[item_post_id]["likes"]} likes</Text>


                        {/* Product price  & Buy Button*/}
                        {/* <View style={{ marginVertical: 20, flexDirection: 'row-reverse', justifyContent: 'space-between' }}> */}
                        {/* <Text style={styles.productPrize}>{'\u20B9'} {postDetail["price"]}</Text> */}

                        {/* Product Buy Button */}
                        {feed[item_post_id]['d_id'] ? null :
                            <TouchableOpacity onPress={() => setselectSizeBuyModal(true)}>
                                <View style={{ alignSelf: 'flex-end', marginVertical: 3, flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', paddingVertical: 6, backgroundColor: 'black', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '400', color: 'pink', paddingRight: 10 }}>
                                        Buy @
                                    </Text>
                                    <Text style={{ color: '#F6F7D4', fontSize: 20, fontWeight: '500', }}>{'\u20B9'} {feed[item_post_id]["price"]}</Text>
                                </View>
                            </TouchableOpacity>
                        }

                        {/* </View> */}

                    </View>

                    {/* Sizes List */}
                    {feed[item_post_id]['sizes'] ?

                        <View style={styles.contentBackgrounds}>
                            {/* size title */}
                            <Text style={{ fontSize: 18, color: '#4B6587', fontWeight: '600', paddingBottom: 10 }}>Size</Text>

                            {/*size lists */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    Object.entries(feed[item_post_id]['sizes']).map((item) => {
                                        return <View key={item[0]} style={{
                                            ...styles.postDetailSizesList, borderStyle: (item[1]) != 0 ? 'solid' : 'dashed',
                                            borderColor: (item[1]) != 0 ? 'pink' : 'grey',
                                        }}>
                                            <Text style=
                                                {{
                                                    color: (item[1]) != 0 ? 'black' : 'grey',
                                                    fontWeight: 'normal',
                                                }}
                                            >{item[0]}</Text>
                                        </View>
                                    })
                                }
                            </View>

                        </View>

                        : null}

                    {/* Product Description */}
                    <View style={styles.contentBackgrounds}>
                        <Text style={{ paddingTop: 0, fontSize: 18, color: '#4B6587', fontWeight: '600', }}>Description</Text>
                        <Text style={{ marginVertical: 10 }}>{feed[item_post_id][feed[item_post_id]['d_id'] ? "d_description" : "product_description"]}</Text>
                    </View>

                    {/* Feedback Section */}
                    <View>
                        {/* Write Feedbacks Section */}
                        {
                            Object.values(userDetail['orders']).find((postID) => {
                                return (
                                    item_post_id == postID
                                        ?
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

                        {/* User Feedbacks  title & list */}
                        <View style={{ ...styles.contentBackgrounds, marginBottom: 0 }}>
                            <Text style={{ fontWeight: '600', color: '#4B6587', fontSize: 18 }}>{feed[item_post_id]['feedbacks'] ? "Review's & Rating's" : "No Review's yet !"}</Text>
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


                    {/* Product Shop Owner */}
                    <View style={{ ...styles.contentBackgrounds, marginTop: 5, marginBottom: 0 }}>

                        <TouchableOpacity style={{ alignSelf: 'flex-start', }} onPress={() => navigation.navigate('ShopDetailNavigator', { item_shop_id: feed[item_post_id][feed[item_post_id]['d_id'] ? "d_id" : "shop_id"] })}>
                            <View style={{ flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
                                {
                                    feed[item_post_id]['d_id'] ?
                                        <Entypo name="scissors" size={25} color='#E0C097' style={{ marginRight: 8, elevation: 5 }} />
                                        :
                                        <Fontisto name="shopping-store" size={18} style={{ color: '#E0C097', marginRight: 8, }} />
                                }
                                <Text style={styles.postShopName}>{feed[item_post_id][feed[item_post_id]['d_id'] ? "d_name" : "shop_name"]}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Post creation date */}
                        <Text style={{ color: 'grey', fontSize: 10 }}>{moment(feed[item_post_id]["post_date"]).format('LL')}</Text>

                    </View>

                </View>
                {/* </View> */}



            </ScrollView >


            {/* ---------------------------- Modal to Select SIZE & BUY Product --------------------------------------------------------------------------- */}

            {
                feed[item_post_id]['d_id'] ? null :
                    <Modal
                        visible={selectSizeBuyModal}
                        animationType='fade'
                        onRequestClose={() => {
                            setselectSizeBuyModal(false)
                            setsizeHighlight()
                        }}
                        presentationStyle='overFullScreen'
                        transparent={true}
                    >
                        {/* Modal Whole container */}
                        <View style={styles.modalContainer}>

                            {/* Modal Content Starts */}
                            <View style={styles.modalMainContent}>

                                {/* Modal Header */}
                                <View style={styles.modalHeader}>
                                    <Text style={{ fontWeight: '400', fontSize: 18 }}>Select  Size</Text>
                                    <MaterialIcon name='close'
                                        size={29}
                                        color='pink'
                                        onPress={() => {
                                            setselectSizeBuyModal(false)
                                            setsizeHighlight()
                                        }} />
                                </View>


                                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>

                                    {/* Product Shop Name and Title*/}
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{feed[item_post_id]['shop_name']}</Text>
                                    <Text style={{ color: 'grey', fontSize: 10 }}>@{feed[item_post_id]['shop_id']}</Text>
                                    <Text style={{ paddingVertical: 10, fontSize: 15 }}>{feed[item_post_id]['title']}</Text>

                                    {/* Size to Select */}
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 4 }}>
                                        {

                                            Object.entries(feed[item_post_id]['sizes']).map((item) => {
                                                return <TouchableOpacity key={item[0]}
                                                    onPress={() => setsizeHighlight(item[0])}
                                                >

                                                    <View style={{
                                                        ...styles.postDetailSizesList,
                                                        ...styles.modalSizeList,
                                                        borderWidth: sizeHighlight == item[0] ? 1.3 : 1,
                                                        borderStyle: (item[1]) != 0 ? 'solid' : sizeHighlight == item[0] ? 'solid' : 'dashed',
                                                        borderColor: (item[1]) != 0 ? sizeHighlight == item[0] ? 'orange' : 'pink' : 'grey',
                                                    }}>
                                                        <Text style=
                                                            {{
                                                                color: (item[1]) != 0 ? 'black' : 'grey',
                                                                fontWeight: sizeHighlight == item[0] ? '500' : 'normal',
                                                            }}
                                                        >{item[0]}</Text>
                                                    </View></TouchableOpacity>
                                            })
                                        }
                                    </View>

                                    {
                                        sizeHighlight == undefined
                                            ? null :
                                            <>
                                                {console.log(sizeHighlight + " - " + feed[item_post_id]['sizes'][sizeHighlight])}

                                                {/* Stock Info */}
                                                {feed[item_post_id]['sizes'][sizeHighlight] != 0 ?
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15, alignSelf: 'center', marginTop: 0, marginBottom: 12.6, }}>{'\u20B9'} {feed[item_post_id]['price']}</Text>
                                                    :
                                                    <Text style={{ color: 'red', fontWeight: '300', alignSelf: 'center', marginTop: 0, marginBottom: 14, }}>Out of Stock ! 😕</Text>
                                                }

                                                {/* Proceed to Buy("Continue") Btn */}
                                                <Button title='continue'
                                                    color='pink' disabled={feed[item_post_id]['sizes'][sizeHighlight] == 0 ? true : false}
                                                    onPress={() => {
                                                        navigation.navigate('PaymentConfirmation', { item_post_id: item_post_id, order_size: sizeHighlight })
                                                        setselectSizeBuyModal(false)
                                                        setsizeHighlight()
                                                    }}
                                                />
                                            </>

                                    }

                                </View>

                            </View>

                        </View>

                    </Modal>
            }

            {/* ------------------------------------------------------------------------------------------------------ */}


        </View >


    )
}

export default PostDetailPage

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F6',
        // height: "100%",
        //flexGrow: 1,
        flex: 1,

    },

    postImage: {
        height: 250,
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
        marginRight: 25,
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