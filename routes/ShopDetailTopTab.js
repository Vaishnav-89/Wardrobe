import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import ShopDetailPage from '../otherPages/ShopAboutPage'

import ShopDetailProductsPage from '../otherPages/ShopProductsPage'

// import { feed, stores } from '../pages/dummydata'

import { ShopIdContext, FeedsStoresUserContext } from '../otherPages/Context'
import { TabBarIndicator } from 'react-native-tab-view';



//=============================================================================================================

const TopTab = createMaterialTopTabNavigator();

function ShopDetailTopTabs({ route }) {

    const { feed, stores } = React.useContext(FeedsStoresUserContext);

    return (

        <ShopIdContext.Provider value={route.params.item_shop_id}>

            <TopTab.Navigator
                initialRouteName="Details"

                screenOptions={
                    {
                        tabBarIndicatorStyle: {
                            backgroundColor: 'pink',
                        },

                    }
                }

            >

                <TopTab.Screen

                    name="Details"
                    component={ShopDetailPage}
                    options={{
                        color: 'red',
                        title: "ABOUT",
                        tabBarLabelStyle: {
                            fontSize: 15,
                            fontWeight: '500',
                            marginVertical: 7,
                        },

                        tabBarShowLabel: true,
                        tabBarActiveTintColor: '#EB92BE',
                        tabBarInactiveTintColor: 'grey',

                        tabBarShowIcon: false,
                        // tabBarIcon: (tabinfo) => (
                        //     <AntDesign
                        //         name="exclamationcircleo"
                        //         size={6}
                        //         color={tabinfo.focused ? '#EB92BE' : 'grey'}
                        //         marginVertical={25}
                        //     />
                        // )


                    }}

                />

                <TopTab.Screen
                    name="Products"
                    component={ShopDetailProductsPage}

                    options={{
                        title: "Products",
                        tabBarShowLabel: false,

                        tabBarActiveTintColor: '#EB92BE',
                        tabBarInactiveTintColor: 'grey',
                        tabBarShowIcon: true,
                        tabBarIcon: (tabinfo) => (
                            <Entypo
                                name="shop"
                                size={21}
                                color={tabinfo.focused ? '#EB92BE' : 'grey'}
                            />
                        ),


                    }}
                />

            </TopTab.Navigator>

        </ShopIdContext.Provider>
    )


}

export default ShopDetailTopTabs

