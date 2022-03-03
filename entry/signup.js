import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { AuthContext } from '../routes/Authentication/AuthProvider'

export default function Signup({ navigation }) {

    const { register } = useContext(AuthContext)


    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [address2, setaddress2] = useState("")
    const [district, setdistrict] = useState("")
    const [password, setpassword] = useState("")
    const [rePassword, setrePassword] = useState("")

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>

                    <Text>Welcome Aliens ! Register here</Text>

                    {/* Username input box */}
                    <View style={styles.inputcontainer}>
                        <AntDesign style={styles.iconstyle} name={"user"} size={25} />
                        <TextInput
                            value={username}
                            onChangeText={(name) => setusername(name)}
                            style={styles.input}
                            placeholder="Enter Username"
                        />
                    </View>


                    {/* mailID input box */}
                    <View style={styles.inputcontainer}>
                        <MaterialIcon style={styles.iconstyle} name={"email"} size={25} />
                        <TextInput
                            value={email}
                            onChangeText={(mail) => setemail(mail)}
                            style={styles.input}
                            placeholder="Enter Email ID"
                        />
                    </View>


                    {/* phone input box */}
                    <View style={styles.inputcontainer}>
                        <Feather style={styles.iconstyle} name={"phone"} size={25} />
                        <TextInput
                            value={phone}
                            onChangeText={(phn) => setphone(phn)}
                            style={styles.input}
                            placeholder="Enter Phone No."
                        />
                    </View>


                    {/* Address1 input box */}
                    <View style={styles.inputcontainer}>
                        <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                        <TextInput
                            value={address}
                            onChangeText={(add) => setaddress(add)}
                            style={styles.input}
                            placeholder="Enter Door No."
                        />
                    </View>

                    {/* Address2 input box */}
                    <View style={styles.inputcontainer}>
                        <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                        <TextInput
                            value={address2}
                            onChangeText={(add) => setaddress2(add)}
                            style={styles.input}
                            placeholder="Enter Street"
                        />
                    </View>

                    {/* district input box */}
                    <View style={styles.inputcontainer}>
                        <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                        <TextInput
                            value={district}
                            onChangeText={(add) => setdistrict(add)}
                            style={styles.input}
                            placeholder="Enter District"
                        />
                    </View>




                    {/* Password input box */}
                    <View style={styles.inputcontainer}>
                        <MaterialCommunityIcon style={styles.iconstyle} name={"form-textbox-password"} size={25} />
                        <TextInput
                            value={password}
                            onChangeText={(pass) => setpassword(pass)}
                            style={styles.input}
                            placeholder="Enter Password"
                        />
                    </View>


                    {/* Re Enter Password input box */}
                    <View style={styles.inputcontainer}>
                        <MaterialCommunityIcon style={styles.iconstyle} name={"form-textbox-password"} size={25} />
                        <TextInput
                            value={rePassword}
                            onChangeText={(rpass) => setrePassword(rpass)}
                            style={styles.input}
                            placeholder="RE - Enter Password"
                            secureTextEntry
                        />
                    </View>


                    {/* SIGN up btn */}
                    <View style={styles.signupbtn}>
                        <Button
                            title="signup"
                            color="pink"
                            onPress={() => register(email, password, username, phone, address, address2, district)}
                        />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({



    container: {
        backgroundColor: '#F8F8F6',
        justifyContent: 'center',
        height: "100%",
        alignItems: 'center',
        paddingVertical: 15,
    },

    inputcontainer: {
        flexDirection: 'row',
        margin: 20,
    },

    iconstyle: {
        marginRight: 20,
        marginTop: 10
    },

    input: {
        borderColor: 'pink',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        width: "75%",
        padding: 10,
    },

    signupbtn: {
        marginTop: 20,
        width: 100,
    },

});