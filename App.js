import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import database from '@react-native-firebase/database'
import { FeedsStoresUserContext } from './otherPages/Context'

import Providers from './routes/Authentication/index';

let feedsRef = database().ref('/feeds');
let storesRef = database().ref('/stores');





export default function App() {

  // getting feeds and stores data from firebase ---------------**************----------------

  // const [feed, setfeed] = useState([])
  // const [stores, setstores] = useState([])

  // useEffect(() => {

  //   feedsRef.on('value', snapshot => {
  //     let data = snapshot.val();
  //     let array = Object.values(data);
  //     setfeed(array);
  //     console.log(array)
  //   })

  //   storesRef.on('value', snapshot => {
  //     let data = snapshot.val();
  //     let array = Object.values(data);
  //     setstores(array);
  //     console.log(array)
  //   })

  // }, [])

  //----------*********************************---------------------------------------------------

  return (

    <Providers />

    // <FeedsStoresContext.Provider value={{ feed, stores }}>
    // </FeedsStoresContext.Provider>


  )
}



