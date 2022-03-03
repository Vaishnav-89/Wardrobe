import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import ShopDetailPage from '../otherPages/ShopAboutPage'

import ShopDetailProductsPage from '../otherPages/ShopProductsPage'

// import { feed, stores } from '../pages/dummydata'

import { TabBarIndicator } from 'react-native-tab-view';

import { SearchDesigners, SearchDress, SearchLocation, SearchShop } from '../otherPages/MenuPages/SearchSection';



const TopTab = createMaterialTopTabNavigator();

function MenuSearchTopTab() {

    return (

        <TopTab.Navigator

            screenOptions={
                {
                    tabBarStyle: { backgroundColor: "#FEF1E6" },
                    tabBarActiveTintColor: '#F0A500',
                    tabBarInactiveTintColor: '#E0C097',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#3F0713',

                    },
                    tabBarLabelStyle: {
                        textTransform: 'capitalize',
                        fontSize: 13.66,
                        fontWeight: '600'

                    }

                }
            }
        >


            <TopTab.Screen
                name="SearchDress"
                component={SearchDress}

                options={{
                    title: "Dress",

                    //     tabBarShowLabel: false,

                    //     tabBarActiveTintColor: '#EB92BE',
                    //     tabBarInactiveTintColor: 'grey',
                    //     tabBarShowIcon: true,
                    //     tabBarIcon: (tabinfo) => (
                    //         <Entypo
                    //             name="shop"
                    //             size={21}
                    //             color={tabinfo.focused ? '#EB92BE' : 'grey'}
                    //         />
                    //     ),
                }}
            />

            <TopTab.Screen

                name="SearchShop"
                component={SearchShop}

                options={{
                    title: "Shops",
                }}
            />

            <TopTab.Screen

                name="SearchDesigners"
                component={SearchDesigners}

                options={{
                    //     color: 'red',
                    title: `Designers`,

                    //     tabBarLabelStyle: {
                    //         fontSize: 15,
                    //         fontWeight: '500',
                    //         marginVertical: 7,
                    //     },

                    //     tabBarShowLabel: true,
                    //     tabBarActiveTintColor: '#EB92BE',
                    //     tabBarInactiveTintColor: 'grey',

                    //     tabBarShowIcon: false,
                    //     // tabBarIcon: (tabinfo) => (
                    //     //     <AntDesign
                    //     //         name="exclamationcircleo"
                    //     //         size={6}
                    //     //         color={tabinfo.focused ? '#EB92BE' : 'grey'}
                    //     //         marginVertical={25}
                    //     //     />
                    //     // )
                }}
            />

            <TopTab.Screen

                name="SearchLocation"
                component={SearchLocation}

                options={{
                    title: "Locations",
                }}
            />


        </TopTab.Navigator>


    )


}

export default MenuSearchTopTab
