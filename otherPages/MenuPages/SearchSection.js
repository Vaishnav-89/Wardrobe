import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { SearchResultContext } from '../Context';
// import { stores } from '../../pages/dummydata';


import { FeedsStoresUserContext } from '../Context'



// Individual Search filer functions
export function SearchDress({ navigation }) {

    const { filteredData, filteredDataShop, filteredDataDesigners, filteredDataLocation } = React.useContext(SearchResultContext)

    return (
        <View style={styles.container}>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => (item.post_id)}


                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => (navigation.navigate('PostDetailPage', { item_post_id: item.post_id }))}>
                        <View style={styles.searchResultContainer}>
                            <Ionicons name="shirt" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                            <View style={{ marginLeft: 10, }}>
                                <Text style={styles.searchResultTile}>{item.title}</Text>
                                <Text style={{ color: 'grey', fontSize: 13 }}>{item.shop_id}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

            />

        </View>
    )
}

export function SearchShop({ navigation }) {

    const { filteredData, filteredDataShop, filteredDataDesigners, filteredDataLocation } = React.useContext(SearchResultContext)
    return (
        <View style={styles.container}>

            <FlatList
                data={filteredDataShop}
                keyExtractor={(item) => (item.shop_id)}
                // ItemSeparatorComponent={
                //     () => (
                //         <View style={{ height: 10, backgroundColor: 'grey', width: "100%" }}>

                //         </View>
                //     )
                // }

                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => (navigation.navigate('ShopDetailNavigator', { item_shop_id: item.shop_id }))}>
                        <View style={styles.searchResultContainer}>

                            <Entypo name="shop" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                            <View style={{ marginLeft: 10, }}>
                                <Text style={styles.searchResultTile}>{item.shop_name}</Text>
                                <Text style={{ color: 'grey', fontSize: 13 }}>{item.shop_id}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

            />

        </View>
    )
}


export function SearchDesigners({ navigation }) {

    const { feed, stores } = React.useContext(FeedsStoresUserContext);

    const { filteredData, filteredDataShop, filteredDataDesigners, filteredDataLocation } = React.useContext(SearchResultContext)


    return (
        <View style={styles.container}>

            <FlatList
                data={filteredDataDesigners}
                keyExtractor={(item) => (item.d_id)}
                ItemSeparatorComponent={
                    () => (
                        <View style={{ height: 0.5, backgroundColor: 'grey', width: "100%" }}>

                        </View>
                    )
                }

                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => (navigation.navigate('ShopDetailNavigator', { item_shop_id: item.d_id }))}>
                        <View style={styles.searchResultContainer}>

                            <Entypo name="scissors" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                            <View style={{ marginLeft: 10, }}>
                                <Text style={styles.searchResultTile}>{item.d_name}</Text>
                                <Text style={{ color: 'grey', fontSize: 13 }}>{item.d_id}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                )}

            />

        </View>
    )
}


export function SearchLocation({ navigation }) {

    const { filteredData, filteredDataShop, filteredDataDesigners, filteredDataLocation } = React.useContext(SearchResultContext)
    return (
        <View style={styles.container}>

            <FlatList
                data={filteredDataLocation}
                keyExtractor={(item) => (item.shop_id)}


                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => navigation.push('SearchLocationList', { location_district: item.shop_district })}>

                        <View style={styles.searchResultContainer}>

                            <Entypo name="location" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                            <View style={{ marginLeft: 10, }}>
                                <Text style={styles.searchResultTile}>{item.shop_district}</Text>
                                <Text style={{ color: 'grey', fontSize: 13 }}>{item.shop_state}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1
    },

    searchResultContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 1,
        paddingHorizontal: 10,
        height: 90,
        alignItems: 'center'
    },

    searchResultTile: {
        fontSize: 17,
        fontWeight: '600'
    }


})