import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import ShopDetailPage from './ShopAboutPage'

// import { feed, stores } from '../pages/dummydata'

import { ShopIdContext, FeedsStoresUserContext } from './Context';

function ShopDetailProductsPage({ navigation }) {

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const item_vendor_id = React.useContext(ShopIdContext);

    const [itemList, setitemList] = useState([]);

    useEffect(() => {
        const items = Object.values(feed).filter(
            (items) => {

                return designers[item_vendor_id] ?

                    items.d_id === item_vendor_id
                    :
                    items.shop_id === item_vendor_id

            }
        )
        setitemList(items);

    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}

                data={itemList}
                keyExtractor={(item) => item.post_id}




                renderItem={
                    ({ item }) => (
                        <TouchableOpacity style={{ backgroundColor: 'white', margin: 1, width: "49%", }} onPress={() => {
                            console.log("tapped")
                            navigation.push('PostDetailPage', { item_post_id: item.post_id })
                        }}>
                            <View >

                                <Image style={styles.postImage} source={{ uri: item.image }} />
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontSize: 15 }}>{item.title}</Text>
                                    <Text style={{ color: 'grey', fontSize: 13 }}>{designers[item_vendor_id] ? item.d_id : item.shop_id}</Text>
                                    <Text style={{ marginTop: 5 }}>{designers[item_vendor_id] ? null : `\u20B9 ${item.price}`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    )

}

export default ShopDetailProductsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F6'
    },

    postImage: {
        backgroundColor: 'white',
        height: 250,
        resizeMode: 'contain'
    },

})