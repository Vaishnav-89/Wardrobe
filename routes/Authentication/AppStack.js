import React, { useEffect, useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import VHome from '../../Vendor/VHome';


import database from '@react-native-firebase/database'
import { FeedsStoresUserContext } from '../../otherPages/Context'
import { AuthContext } from './AuthProvider';
import VHomePageBottomNav from '../../Vendor/routes/VHomePageBottomNav';
import RouteStack from '../RouteStack';
import VRouteStack from '../../Vendor/routes/VRouteStack';

let feedsRef = database().ref('/feeds');
let storesRef = database().ref('/stores');
let ordersRef = database().ref('/orders');
let designersRef = database().ref('/designers');


const Stack = createNativeStackNavigator();

const AppStack = () => {

    const { user, logout } = useContext(AuthContext);

    let usersRef = database().ref('/users/' + user.uid);

    //to check wheather the vendor exists in the vendor list(DB)
    let isExist = database().ref('/vendors/' + user.uid);

    const [isVendor, setisVendor] = useState(null);



    // getting feeds and stores data from firebase ---------------**************----------------

    const [feed, setfeed] = useState([])
    const [stores, setstores] = useState([])
    const [designers, setdesigners] = useState()
    const [userDetail, setuserDetail] = useState({})
    const [orders, setorders] = useState([])

    const [loading, setloading] = useState(true)

    useEffect(() => {

        // (
        //     async () => {

        //         await 

        isExist.once('value', snapshot => {
            if (snapshot.exists()) {


                feedsRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setfeed(data);
                    let array = Object.values(data);
                    console.log("Feeds data --- ");
                    console.log(data)
                    // console.log(Object.keys(data))
                })

                storesRef.child(snapshot.val()).on('value', snapshot => {
                    let data = snapshot.val();
                    // let array = Object.values(data);
                    setuserDetail(data);
                    console.log("user data --- ");
                    console.log(data)
                })

                ordersRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setorders(data);
                    console.log("Orders data --- ");
                    console.log(data);
                })

                setisVendor(true);
                setloading(false)

            } else {

                feedsRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setfeed(data);
                    console.log("Feeds data --- ");
                    // let array = Object.values(data);
                    console.log(data)
                })

                storesRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setstores(data);
                    let array = Object.values(data);
                    console.log("Stores data --- ");
                    console.log(array)
                })

                designersRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setdesigners(data)
                    console.log("Designers data --- ");
                    console.log(data)

                })

                usersRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setuserDetail(data);
                    // let array = Object.values(data);
                    console.log("user data --- ");
                    console.log(data)
                })

                ordersRef.on('value', snapshot => {
                    let data = snapshot.val();
                    setorders(data);
                    console.log("Orders data --- ");
                    console.log(data);
                })


                setisVendor(false);
                setloading(false)
            }
        });





        //     }
        // )();


    }, [])

    //----------*********************************---------------------------------------------------




    return (

        loading ?

            <View style={{ height: "100%" }}>
                <Image style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: 'cover',
                    // margin: 55
                }} source={require('../../assets/splashscreen.jpg')} />
            </View>

            :

            <>
                {
                    isVendor ?

                        <FeedsStoresUserContext.Provider value={{ feed, userDetail, orders }}>

                            <VRouteStack />

                        </FeedsStoresUserContext.Provider>

                        :

                        <FeedsStoresUserContext.Provider value={{ feed, stores, userDetail, orders, designers }}>

                            <RouteStack />

                        </FeedsStoresUserContext.Provider>
                }


                {/* the down comment is from utube */}
                {/* <Stack.Navigator>


                <Stack.Screen name='Home' component={HomePageBottomNav}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen name='Home' component={Firebase_connection} /> 
                for example to sigup and see the home page

            </Stack.Navigator> */}

            </>
    );
}

export default AppStack;