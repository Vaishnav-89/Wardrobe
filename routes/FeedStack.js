import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from '../pages/Feeds';
import Feedback from '../otherPages/Feedback';



const Stack = createNativeStackNavigator();


// Account Stack 
export default function FeedStack() {

    return (

        <Stack.Navigator>

            {/* Account Main display Page */}
            <Stack.Screen name="FeedMain" component={Feed}
                options={{
                    headerShown: false,
                }}

            />


            <Stack.Screen name="Feedback" component={Feedback}
                options={{
                    animation: 'slide_from_bottom',
                    //presentation: '',
                    headerTintColor: "pink",
                    // headerShadowVisible: false,
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




        </Stack.Navigator>

    )
}
