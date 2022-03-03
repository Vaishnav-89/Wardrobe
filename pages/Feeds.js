import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'

// import { feed } from './dummydata'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import moment from 'moment';

import { FeedsStoresUserContext } from '../otherPages/Context'
import { AuthContext } from '../routes/Authentication/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import database from '@react-native-firebase/database'



//=============================================

export default function Feed({ navigation }) {




    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const [feedbackModal, setfeedbackModal] = useState(false)
    const [feedbackPostID, setfeedbackPostID] = useState()

    // to save liked post in DB
    const LikePost = (postID, userID) => {
        database().ref(`users/${userID}/liked/`).update({
            [postID]: postID,
        }).then(() => console.log("post Liked ."));
    }

    // to Unsave liked post in DB
    const UnLikePost = (postID, userID) => {
        database().ref(`users/${userID}/liked/${postID}`).remove().then(() => console.log("post UnLiked ."));
    }

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



    return (

        <View style={styles.container}>

            {/* <Text>Aliens Home Feed Page !</Text> */}


            {/* Header Home Page */}
            <View style={{ elevation: 5, backgroundColor: 'white', height: "8%", justifyContent: 'center' }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 24,
                    color: 'pink',
                    paddingHorizontal: 18
                }}>Wardrobe</Text>
            </View>




            {/* A Single post */}

            <FlatList
                showsVerticalScrollIndicator={false}

                keyExtractor={(item) => (item.post_id)}
                data={(Object.values(feed)).sort((a, b) => b.post_date - a.post_date)}
                ItemSeparatorComponent={() => (<View style={{ height: 15, }}></View>)}


                ListHeaderComponent={
                    <View style={{ height: 70 }}>

                    </View>
                }


                renderItem={({ item }) => (

                    <View style={styles.feedPost}>

                        {/* Post Shop Name */}

                        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-start', }} onPress={() => navigation.navigate('ShopDetailNavigator', { item_shop_id: item.shop_name ? item.shop_id : item.d_id })}>

                                {/* for designer post...shop name */}
                                {
                                    item.shop_name ? <Text style={styles.feedPostShopName}>{item.shop_name}</Text>
                                        :
                                        <Text style={styles.feedPostShopName}>{item.d_name}</Text>
                                }
                            </TouchableOpacity>
                            {
                                item.d_name && <Text style={{ elevation: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center', borderRadius: 25, backgroundColor: 'black', color: 'pink', fontWeight: '500', fontStyle: 'italic' }}>Designer</Text>
                            }
                        </View>

                        {/* Image of post */}

                        <Image style={styles.feedPostImage} source={{ uri: item.image }} />


                        {/* Image below post content */}

                        <View style={styles.feedPostContents}>

                            <Text style={styles.feedPostTitle}>{item.title}</Text>

                            <View style={{ flexDirection: 'row' }}>

                                {/* lIKE BTN */}
                                {userDetail['liked'] ?

                                    userDetail['liked'][item.post_id] ?
                                        <MaterialCommunityIcon style={styles.feedPostIcon} name="heart" size={27} color="pink" onPress={() => UnLikePost(item.post_id, userDetail['uid'])} />
                                        :
                                        <MaterialCommunityIcon style={styles.feedPostIcon} name="heart-outline" size={27} color="pink" onPress={() => LikePost(item.post_id, userDetail['uid'])} />

                                    :
                                    <MaterialCommunityIcon style={styles.feedPostIcon} name="heart-outline" size={27} color="pink" onPress={() => LikePost(item.post_id, userDetail['uid'])} />

                                }


                                {/* feedback section */}
                                <MaterialIcon style={styles.feedPostIcon} name="comment" size={27} onPress={() => {
                                    // setfeedbackPostID(item.post_id)
                                    // setfeedbackModal(true)
                                    navigation.navigate('Feedback', { item_post_id: item.post_id });

                                }} />

                                <MaterialCommunityIcon style={styles.feedPostIcon} name="share-all-outline" size={27} onPress={() => console.log("Share Btn is Pressed !")} />


                                {/* Save Button */}
                                {userDetail['saved'] ?
                                    userDetail['saved'][item.post_id] ?
                                        <MaterialIcon
                                            style={{ marginLeft: 150 }}
                                            name="bookmark" size={27} color='pink'
                                            onPress={() => UnSavePost(item.post_id, userDetail['uid'])}
                                        />
                                        :
                                        <MaterialIcon
                                            style={{ marginLeft: 150 }}
                                            name="bookmark-outline" size={27} color='pink'
                                            onPress={() => SavePost(item.post_id, userDetail['uid'])}
                                        />
                                    :

                                    <MaterialIcon
                                        style={{ marginLeft: 150 }}
                                        name="bookmark-outline" size={27} color='pink'
                                        onPress={() => SavePost(item.post_id, userDetail['uid'])}
                                    />

                                }


                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                                {/* Post uploded date */}
                                <View>
                                    <Text style={{ marginBottom: 10, fontWeight: '600' }}>{item.likes} likes</Text>
                                    <Text style={{ color: 'grey', fontSize: 10 }}>{moment(item.post_date).format('LL')}</Text>
                                </View>

                                {/* View Button */}
                                <TouchableWithoutFeedback style={{}} onPress={() => { navigation.navigate('PostDetailPage', { item_post_id: item.post_id }) }}>
                                    <Text style={styles.feedPostPreviewBtn}> V I E W</Text>
                                </TouchableWithoutFeedback>

                            </View>


                        </View>
                    </View>
                )
                }
            />


            {/* =================================================================================================== */}

            {/* Feedback Modal */}
            <Modal
                visible={feedbackModal}
                animationType='fade'
                onRequestClose={() => {
                    setfeedbackModal(false)
                    setfeedbackPostID()
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
                            <Text style={{ fontWeight: '400', fontSize: 18 }}>Review's & Rating's</Text>
                            <MaterialIcon name='close'
                                size={29}
                                color='pink'
                                onPress={() => {
                                    setfeedbackModal(false)
                                    setfeedbackPostID()
                                }}
                            />
                        </View>

                        {/* {console.log((feed[feedbackPostID]['feedbacks']['user9001']['review']))}  */}
                        {

                        }

                        {/* {console.log((feed['1014']['feedbacks']['user9001']['review']))} */}
                        {/* feed['1014']['feedbacks']['user9001']['review'] */}

                        <View>{
                            Object.keys(feed).map((user_id) => (
                                user_id == '1014' ?
                                    Object.values(user_id).map((user_det) => (
                                        user_det == 'feedbacks' ?
                                            Object.values(user_det).map((user_detIns) => (


                                                <Text>{user_detIns[0]}</Text>


                                            )) : null


                                    ))
                                    : null


                            ))
                            // Object.keys(user_detIns).map(() => ( ))
                            //    <Text></Text>


                        }
                        </View>


                    </View>

                </View>

            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1
    },

    feedPost: {
        //marginVertical: 10,
        backgroundColor: 'white',
    },

    feedPostShopName: {
        // marginVertical: 20,
        // marginHorizontal: 20,
        fontSize: 15,
        fontWeight: 'bold',
        fontSize: 18
    },

    feedPostImage: {
        height: 250,
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },

    feedPostContents: {

        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        //backgroundColor: 'red'
    },

    feedPostTitle: {
        marginBottom: 10,
        fontWeight: '300',
        fontSize: 18
    },

    feedPostIcon: {
        marginRight: 20
    },

    feedPostPreviewBtn: {
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'lightgreen',
        borderWidth: 2,
        padding: 7,
        elevation: 5,
        backgroundColor: 'white',
        color: 'lightgreen',
        fontWeight: '400',
        alignSelf: 'center'

        //shadowOffset: {height: 5, width: 150 }
    },

    // ============Modal Section

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


})