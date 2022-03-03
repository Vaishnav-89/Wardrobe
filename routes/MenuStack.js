import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Wrapper } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MenuSearch from '../otherPages/MenuSearch';
import Menu from '../pages/menu';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { feed } from './dummydata';
import PostDetailPage from '../otherPages/PostDetailPage';
import ShopDetailTopTabs from './ShopDetailTopTab';

import SearchLocationList from '../otherPages/MenuPages/SearchLocationList';
import MenuCategory from '../otherPages/MenuPages/MenuCategory';
import PaymentConfirmation from '../otherPages/PaymentConfirmation';



const Stack = createNativeStackNavigator();



function MenuStack() {
    return (
        <Stack.Navigator >

            {/* Full Menu Page  */}
            <Stack.Screen name="MenuMain" component={Menu}
                options={{
                    title: '',
                    // headerTransparent: true,
                    // headerShadowVisible: false,
                    // headerTintColor: 'black',
                    headerShown: false

                }}

            />

            {/* Menu Single Category Page */}
            <Stack.Screen name="MenuCategoryPage"
                component={MenuCategory}
                options={{
                    //     // title: '',
                    //     //  headerTransparent: true,
                    //     //  headerShadowVisible: false,
                    //     headerTintColor: 'black',
                    headerShown: false,
                }}
            />



            {/* Original Search Box */}
            <Stack.Screen name="MenuSearch" component={MenuSearch}

                options={{
                    // title: '',
                    // headerTransparent: true,
                    // headerShadowVisible: false,
                    headerShown: false
                }}

            />

            {/* Searched Location Selected Result List Page */}
            <Stack.Screen name="SearchLocationList"
                component={SearchLocationList}
                options={{
                    title: '',
                    //  headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'black',
                    headerTintColor: 'pink',
                }}

            />




            {/* <Stack.Screen name="PostDetailPage"
                component={PostDetailPage}

                options={{
                    title: '',
                    // headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'pink',


                }}
            />

            <Stack.Screen name="ShopDetailNavigator"
                component={ShopDetailTopTabs}
                options={{
                    // title: '',
                    // headerTransparent: true,
                    // headerShadowVisible: false,
                    // headerTintColor: 'black',
                    headerShown: false,

                }}

            /> */}

            {/* <Stack.Screen name="PaymentConfirmation"
                component={PaymentConfirmation}
                options={{
                    title: 'Order Summary',
                    //headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'pink',
                    //  headerShown: false,

                }}
            /> */}

        </Stack.Navigator>


    )
}

export default MenuStack
