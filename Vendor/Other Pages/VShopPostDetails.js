import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'

import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


import moment from 'moment';

// import { feed } from '../pages/dummydata'


import { FeedsStoresUserContext } from '../../otherPages/Context'
import { FlatList } from 'react-native-gesture-handler';


function VShopPostDetails({ route, navigation }) {


    const { feed } = React.useContext(FeedsStoresUserContext);

    const { item_post_id } = route.params;



    useEffect(() => {


    }, [])




    return (


        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}

            >
                {/* {console.log(postDetail)} */}

                {/* image of product */}
                <View style={{

                    paddingTop: 2,

                    backgroundColor: 'white'
                }}>
                    <Image style={styles.postImage} source={{ uri: feed[item_post_id]["image"] }} />
                </View>


                {/* Container of product details */}
                <View style={styles.postDetailContentContainer1}>


                    <View style={styles.contentBackgrounds}>

                        {/* Product title */}
                        <Text style={{ fontWeight: 'bold', fontSize: 28, }}>{feed[item_post_id]["title"]}</Text>

                        {/* Product Likes & price */}
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Text style={styles.likes}>{feed[item_post_id]["likes"]} likes</Text>
                            <Text style={styles.productPrize}>{'\u20B9'} {feed[item_post_id]["price"]}</Text>

                        </View>

                    </View>


                    {/*  Sizes List */}
                    <View style={styles.contentBackgrounds}>

                        <Text style={{ fontSize: 22, color: '#4B6587', fontWeight: '400', paddingBottom: 10 }}>Size</Text>


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
                                        >{item[0]} - {item[1]}</Text>
                                    </View>
                                })
                            }
                        </View>


                    </View>


                    <View style={styles.contentBackgrounds}>

                        {/* Product Description */}
                        <Text style={{ paddingTop: 5, fontSize: 22, color: '#4B6587', fontWeight: '400', }}>Description</Text>
                        <Text style={{ marginVertical: 10 }}>{feed[item_post_id]["product_description"]}</Text>

                    </View>


                    <View style={{ ...styles.contentBackgrounds, marginBottom: 2 }}>

                        {/* Product Shop Owner */}
                        <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                            <Fontisto name="shopping-store" size={18} style={{ color: '#AAAAAA', marginRight: 8, marginVertical: 5 }} />
                            <Text style={styles.postShopName}>{feed[item_post_id]["shop_name"]}</Text>
                        </View>

                        {/* Post creation date */}
                        <Text style={{ color: 'grey', fontSize: 10 }}>{moment(feed[item_post_id]["post_date"]).format('LL')}</Text>

                    </View>

                </View>


            </ScrollView>

        </View>


    )
}

export default VShopPostDetails

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F6',
        // height: "100%",
        //flexGrow: 1,
        flex: 1
    },

    postImage: {
        height: 250,
        backgroundColor: 'white',
        resizeMode: 'contain',
        // marginTop: 50,

    },

    postDetailContentContainer1: {

        // marginBottom: 5
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
        marginVertical: 8,
        color: 'pink',
        fontStyle: 'italic',
        textShadowColor: '#FFEDDA',
        textShadowRadius: 8
    },

    productPrize: {
        fontSize: 19,
        color: '#F6F7D4',
        marginRight: 10,
        fontWeight: '700',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderColor: '#4B6587',
        borderStyle: 'solid',
        backgroundColor: 'black',
    },

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

})