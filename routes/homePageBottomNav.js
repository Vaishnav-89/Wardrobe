import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Menu from '../pages/menu'
import Chat from '../pages/chat'
import Account from '../pages/account'
import MenuStack from './MenuStack'
import Feed from '../pages/Feeds'
import AccountStack from './AccountStack'
import FeedStack from './FeedStack'


const BottomNavBar = createMaterialBottomTabNavigator();


// Bottom Nvigation Bar
export default function HomePageBottomNav() {
    return (

        // this is commented for presentation to move from login screen to home screen
        // =================================
        // <NavigationContainer>
        // {/* ================================= */}



        <BottomNavBar.Navigator
            initialRouteName="Feed"
            activeColor="grey"


            //style={{ backgroundColor: 'red' }}
            // labeled={false}
            barStyle={{ backgroundColor: 'white' }}>

            <BottomNavBar.Screen name="Feed" component={FeedStack}

                options={{
                    //  tabBarActiveTintColor: 'pink',
                    tabBarIcon: (tabinfo) => (<Foundation name="home" size={24} color={tabinfo.focused ? 'pink' : 'black'} />),
                }}
            />

            <BottomNavBar.Screen name="Menu" component={MenuStack}
                options={{
                    tabBarIcon: (tabinfo) => (<MaterialIcon name="menu" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />

            <BottomNavBar.Screen name="Chat" component={Chat}

                options={{

                    tabBarIcon: (tabinfo) => (<Entypo name="chat" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />

            <BottomNavBar.Screen name="Account" component={AccountStack}
                options={{
                    tabBarIcon: (tabinfo) => (<MaterialCommunityIcon name="account-circle-outline" size={24} color={tabinfo.focused ? 'pink' : 'black'} />)
                }} />


        </BottomNavBar.Navigator>

        // {/* //================================= */}
        // </NavigationContainer>
        //=================================
    )
}
