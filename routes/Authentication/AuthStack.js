import React from 'react'
import { View } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../entry/login';
import Signup from '../../entry/signup';
import Register from '../../entry/registerVendor';




export default function AuthStack() {
    const Stack = createNativeStackNavigator();

    return (
        // <NavigationContainer>


        <Stack.Navigator>

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="Register" component={Register} />


            {/* <Stack.Screen name="Home" component={HomePageBottomNav}
                //this is written for presentation to move from login screen to home screen
                //..comment it after presentation
                //=================================
                //options={{
                //: false,
                //=================================
                //}} 
                /> */}

        </Stack.Navigator>


        // </NavigationContainer>
    )
}
