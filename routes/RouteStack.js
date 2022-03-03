import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from '../pages/Feeds';
import PostDetailPage from '../otherPages/PostDetailPage';
import ShopDetailTopTabs from './ShopDetailTopTab';
import SearchLocationList from '../otherPages/MenuPages/SearchLocationList';
import { FeedsStoresUserContext } from '../otherPages/Context';
import PaymentConfirmation from '../otherPages/PaymentConfirmation';
import HomePageBottomNav from './homePageBottomNav';


const Stack = createNativeStackNavigator();

export default function RouteStack() {

    return (

        <Stack.Navigator>

            <Stack.Screen name="HomePageBottomNav" component={HomePageBottomNav}
                options={{
                    headerShown: false,

                    // this is written for presentation to move from login screen to home screen 
                    //..comment it after presentation
                    //=================================
                    //headerBackVisible: false,
                    //=================================


                }}

            />

            <Stack.Screen name="PostDetailPage"
                component={PostDetailPage}

                options={{
                  
                    title: '',
                    //headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'black',

                }}
            />

            <Stack.Screen name="ShopDetailNavigator"
                component={ShopDetailTopTabs}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'black',
                    headerShown: false,

                }}

            />

            <Stack.Screen name="PaymentConfirmation"
                component={PaymentConfirmation}
                options={{
                    title: 'Order Summary',
                    //headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'pink',
                    //  headerShown: false,

                }}

            />

        </Stack.Navigator>

    )
}
