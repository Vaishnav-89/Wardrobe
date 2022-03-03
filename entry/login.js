import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, TextInput, Image, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';

import Octicon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../routes/Authentication/AuthProvider';

function Login({ navigation }) {

    const [EmailID, setEmailID] = useState("");
    const [password, setPassword] = useState("");

    const [modelOpen, setModelOpen] = useState(false)

    const { login } = useContext(AuthContext);

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                {/* Forget Passweord Modal page ------------------------------------------------------------ */}


                <Modal visible={modelOpen} animationType='slide'>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.modalContainer}>
                            <MaterialIcon name='close'
                                size={29}
                                style={styles.modalClose}
                                onPress={() => setModelOpen(false)} />

                            <Text style={styles.modelTitle}>Forget Password ?</Text>

                            <Text style={{ ...styles.modalText, fontWeight: '300', fontSize: 18, color: 'brown' }}>Enter your Email ID here :</Text>
                            <Text style={{ ...styles.modalText, marginTop: 15 }}>A password reset link will be sent to your Email.</Text>

                            <View style={{ ...styles.inputcontainer, marginTop: 30, marginLeft: 30 }}>
                                <MaterialIcon style={styles.iconstyle} name={"email"} size={25} />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Email ID"
                                    keyboardType='email-address'
                                />
                            </View>

                            <View style={{ ...styles.loginbtn, alignSelf: 'center', marginTop: 50 }}>
                                <Button
                                    title="submit"
                                    color="brown"
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Login page ------------------------------------------------------------------------------ */}

                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text> Hello Aliens login !</Text>

                <View style={styles.inputcontainer}>
                    <MaterialIcon style={styles.iconstyle} name={"email"} size={25} />

                    <TextInput
                        value={EmailID}
                        style={styles.input}
                        placeholder="Email ID"
                        keyboardType='email-address'
                        onChangeText={(email) => setEmailID(email)}
                    />
                </View>

                <View style={styles.inputcontainer}>
                    <Octicon style={styles.iconstyle} name={"lock"} size={25} />
                    <TextInput
                        value={password}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry

                        onChangeText={(pass) => setPassword(pass)}
                    />
                </View>

                {/* forget password  btn */}

                <TouchableOpacity
                    style={styles.forgetpassbox}
                    onPress={() => setModelOpen(true)} >

                    <Text style={styles.forgetpasstxt}> forget password !</Text>

                </TouchableOpacity>

                {/* login password  btn */}

                <View style={styles.loginbtn}>
                    <Button
                        title="LogIn"
                        color="pink"
                        onPress={() => login(EmailID, password)}
                    />
                </View>

                {/* signup password  btn */}

                <View style={styles.signup}>
                    <Text>Don't have an account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupbtn}>SignUp</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: "27%" }}>
                    <Text>Want to become a Vendor ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'orange', fontWeight: 'bold', textDecorationLine: 'underline' }}>Register</Text>
                    </TouchableOpacity>
                    <Text> here</Text>
                </View>


            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F6',
        //flex: 1,
        //justifyContent: 'center',
        height: "100%",
        alignItems: 'center',
    },

    logo: {
        height: "15%",
        width: "75%",
        resizeMode: 'contain',
        margin: 55
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


    forgetpasstxt: {
        fontWeight: 'bold',
    },

    forgetpassbox: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20,
        marginBottom: 15
    },

    loginbtn: {
        marginTop: 10,
        width: 100,
    },

    signup: {
        flexDirection: 'row',
        marginTop: 25,
    },

    signupbtn: {
        fontWeight: 'bold'
    },

    modalContainer: {
        backgroundColor: '#F8F8F6',
        height: "100%"
    },

    modalClose: {
        alignSelf: 'center',
        marginTop: 35,

    },

    modelTitle: {
        marginLeft: 30,
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 24
    },

    modalText: {
        marginTop: 50,
        marginLeft: 30
    }


})

export default Login
