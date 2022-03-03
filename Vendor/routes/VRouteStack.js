import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VShopPostDetails from '../Other Pages/VShopPostDetails';
import VShopPosts from '../Other Pages/VShopPosts';
import VHomePageBottomNav from './VHomePageBottomNav';




const Stack = createNativeStackNavigator();

export default function VRouteStack() {

    return (

        <Stack.Navigator>

            <Stack.Screen name="VHomePageBottomNav" component={VHomePageBottomNav}
                options={{
                    headerShown: false,

                    // this is written for presentation to move from login screen to home screen 
                    //..comment it after presentation
                    //=================================
                    //headerBackVisible: false,
                    //=================================


                }}

            />


            <Stack.Screen name="VShopPosts"
                component={VShopPosts}

                options={{
                    title: "Posts",
                    //headerTransparent: true,
                    //headerShadowVisible: false,
                    headerTintColor: 'pink',


                }}
            />



            <Stack.Screen name="VShopPostDetails"
                component={VShopPostDetails}

                options={{
                    title: "Post Detail",
                    //headerTransparent: true,
                    //headerShadowVisible: false,
                    headerTintColor: 'pink',


                }}
            />

        </Stack.Navigator>

    )
}
