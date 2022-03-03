import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback } from 'react-native'


import Ionicons from 'react-native-vector-icons/Ionicons'


// import { feed } from './dummydata';

import { FeedsStoresUserContext } from '../otherPages/Context'




{/* Main MENU Page ------------------------ */ }
export default function Menu({ navigation }) {

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);



    return (
        <View style={styles.container}>


            {/* SearchBoxBtn */}
            <View style={{ flexDirection: 'row', paddingVertical: 38, marginBottom: 2, paddingHorizontal: 10, backgroundColor: '#FEF1E6', elevation: 4 }}>

                {/* Navigate to original search box Page */}
                <TouchableOpacity onPress={() => navigation.navigate("MenuSearch")} style={{ marginTop: 7, width: "100%" }}>

                    <Text style={styles.searchBoxForTap}>Search</Text>

                    <Ionicons
                        name="md-search"
                        size={24}
                        style={{ position: 'absolute', right: 36, top: 7 }}
                    />

                </TouchableOpacity>

            </View>


            <View>

                {/* Men and Women Categroy Btn */}

                <View style={{ flexDirection: 'row', height: "50%", justifyContent: 'space-between' }}>

                    {/* Navigate to Single Category Page */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuCategoryPage', { database: "feed", searchFilterKey: 'Men' })}>
                        <View style={{ height: "100%", width: "49.9%" }}>
                            <Text style={styles.CategoryText}>Men's Fashion</Text>
                            <Image style={styles.CategoryImage} source={require('../assets/men_modal1.jpeg')} />
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Navigate to Single Category Page */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuCategoryPage', { database: "feed", searchFilterKey: 'Women' })}>
                        <View style={{ height: "100%", width: "49.9%" }}>
                            <Text style={styles.CategoryText}>Women's Fashion</Text>
                            <Image style={styles.CategoryImage} source={{ uri: "https://assets.myntassets.com/f_webp,fl_progressive/h_1440,q_70,w_1080/v1/assets/images/productimage/2019/6/10/027bc8c5-c343-49d4-bdc6-bb9687ef03ab1560139075957-1.jpg" }} />
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <View style={{ height: "40%", paddingVertical: "0.3%", justifyContent: 'space-between' }}>

                    {/* Designer Category */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuCategoryPage', { database: "Designers" })}>
                        <View style={{ height: '49.7%' }}>
                            <Text style={styles.CategoryText}>Designers</Text>
                            <Image style={styles.CategoryImage} source={require('../assets/designer_cover3.jpeg')} />
                        </View>
                    </TouchableWithoutFeedback>


                    {/*Store Category */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MenuCategoryPage', { database: "Stores" })}>
                        <View style={{ height: '49.7%' }}>
                            <Text style={{
                                ...styles.CategoryText, left: "0%", right: null,
                                borderTopLeftRadius: null,
                                borderBottomLeftRadius: null,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }}>Shops</Text>
                            <Image style={styles.CategoryImage} source={require('../assets/store_cover.jpg')} />
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F6',
        height: "100%",

    },

    searchBoxForTap: {

        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 6,
        color: 'grey',

        height: 40,
        //fontSize: 15,
        //width: "100%",
        padding: 10,
        paddingRight: 43,
        marginHorizontal: 20,
    },

    CategoryBoxBtn: {


    },

    CategoryImage: {
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
        // backgroundColor: 'grey'
    },

    CategoryText: {
        position: 'absolute',
        // top: 245,
        bottom: "7%",
        right: "0%",
        color: 'pink',
        fontStyle: 'italic',
        elevation: 1,
        shadowColor: 'transparent',
        //borderWidth: 2,
        // borderColor: 'white',
        padding: 10,
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },


})