import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'


import VHome from '../VHome'
import VOrders from '../VOrders'
import VChat from '../VChat'
import VAccount from '../VAccount'


const BottomNavBar = createMaterialBottomTabNavigator();


export default function VHomePageBottomNav() {
    return (

        // this is commented for presentation to move from login screen to home screen
        // =================================
        // <NavigationContainer>
        // {/* ================================= */}



        <BottomNavBar.Navigator
            initialRouteName="VHome"
            activeColor="grey"

            //style={{ backgroundColor: 'red' }}
            // labeled={false}
            barStyle={{ backgroundColor: 'white' }}>

            <BottomNavBar.Screen name="VHome" component={VHome}
                options={{
                    title: 'Store',
                    tabBarIcon: (tabinfo) => (<Fontisto name="shopping-store" size={20} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />

            <BottomNavBar.Screen name="VOrders" component={VOrders}
                options={{

                    title: 'Orders',
                    tabBarIcon: (tabinfo) => (<MaterialCommunityIcon name="shopping-outline" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />

            <BottomNavBar.Screen name="VChat" component={VChat}

                options={{
                    title: 'Chat',
                    tabBarIcon: (tabinfo) => (<Entypo name="chat" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />

            <BottomNavBar.Screen name="VAccount" component={VAccount}
                options={{
                    title: 'Account',
                    tabBarIcon: (tabinfo) => (<MaterialCommunityIcon name="account-circle-outline" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />


        </BottomNavBar.Navigator>

        // {/* //================================= */}
        // </NavigationContainer>
        //=================================
    )
}
