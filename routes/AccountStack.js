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
import Account from '../pages/account';
import Orders from '../otherPages/orders';
import Saved from '../otherPages/Saved';


const Stack = createNativeStackNavigator();


// Account Stack 
export default function AccountStack() {

    return (

        <Stack.Navigator>

            {/* Account Main display Page */}
            <Stack.Screen name="AccountMain" component={Account}
                options={{
                    headerShown: false,
                }}

            />

            {/* User Orders(History of orders) Page */}
            <Stack.Screen name="Orders" component={Orders}
                options={{
                    headerTintColor: "pink",
                    headerShadowVisible: false,
                    //     //headerShown: false,

                    //     // this is written for presentation to move from login screen to home screen 
                    //     //..comment it after presentation
                    //     //=================================
                    //     headerBackVisible: false,
                    //     //=================================

                    //     title: 'Wardrobe',

                    //     headerTitleStyle: {
                    //         fontSize: 27,
                    //         fontWeight: '300'
                    //     }
                }}

            />


            <Stack.Screen name="Saved"
                component={Saved}

                options={{

                    title: 'Saved Collections',
                    //headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: "pink",

                }}
            />

            {/* <Stack.Screen name="ShopDetailNavigator"
                component={ShopDetailTopTabs}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerTintColor: 'black',
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
