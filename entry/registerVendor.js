import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'

import { AuthContext } from '../routes/Authentication/AuthProvider'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Register({ navigation }) {

    const { registerVendor } = useContext(AuthContext)

    // vendor details
    const [vendorName, setvendorName] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [password, setpassword] = useState("")
    const [rePassword, setrePassword] = useState("")

    //------------------------------------------


    //Dropdown states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([
        { label: 'Store', value: 'store' },
        { label: 'Designer', value: 'designer' },

    ]);


    //------------------------------------------

    //  store details

    const [shopName, setshopName] = useState("")
    const [shopId, setshopId] = useState("")
    const [shopEmail, setshopEmail] = useState("")
    const [shopContact, setshopContact] = useState("")
    const [fullAddress, setfullAddress] = useState("")
    const [pincode, setpincode] = useState("")
    const [district, setdistrict] = useState("")
    const [shopstate, setshopstate] = useState("")
    const [description, setdescription] = useState("")
    const [website, setwebsite] = useState("")


    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={styles.container}>

                <ScrollView>

                    <View style={{ alignItems: 'center', }}>

                        <Text style={{ padding: 10 }}>Hello Vendor ! Register here</Text>

                        {/* drop down */}
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}

                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}

                            containerStyle={{ width: '50%', }}
                            listMode="SCROLLVIEW"

                            listItemLabelStyle={{
                                color: "#000"
                            }}

                            selectedItemLabelStyle={{
                                fontWeight: "bold"
                            }}

                            labelStyle={{
                                fontWeight: "bold",
                                color: 'black',

                            }}

                            textStyle={{
                                fontSize: 15,
                                color: 'white'
                            }}

                            dropDownDirection="BOTTOM"

                            placeholder="Select an Role"

                            placeholderStyle={{
                                color: "black",
                                fontWeight: "bold"
                            }}
                            // items={[
                            //     { label: 'Item 1', value: 'item1' },
                            //     { label: 'Item 2', value: 'item2' },
                            // ]}
                            // defaultValue="item1"
                            // containerStyle={{ width: '50%' }}
                            style={{ backgroundColor: 'pink', elevation: 3, }}
                            // dropDownStyle={{ backgroundColor: '#ffffftg' }}
                            onChangeValue={() => console.log(value)}
                        />

                        <View style={styles.line}></View>

                    </View>

                    {/* shop details -------------------------------------------------------------------------------------------------------*/}

                    {
                        value == null ? <View style={{ height: 100 }}></View>
                            :

                            value == "store" ?
                                <View>
                                    {/* Shop Vendor details --------------------------------------------------------------------------------------- */}

                                    <View>
                                        {/* Vendor name input box */}
                                        <View style={styles.inputcontainer}>
                                            <AntDesign style={styles.iconstyle} name={"user"} size={25} />
                                            <TextInput
                                                value={vendorName}
                                                onChangeText={(name) => setvendorName(name)}
                                                style={styles.input}
                                                placeholder="Enter Vendor name"
                                            />
                                        </View>


                                        {/* mailID input box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialIcon style={styles.iconstyle} name={"email"} size={25} />
                                            <TextInput
                                                value={email}
                                                onChangeText={(mail) => setemail(mail)}
                                                style={styles.input}
                                                placeholder="Enter Vendor Email ID"
                                            />
                                        </View>


                                        {/* phone input box */}
                                        <View style={styles.inputcontainer}>
                                            <Feather style={styles.iconstyle} name={"phone"} size={25} />
                                            <TextInput
                                                value={phone}
                                                onChangeText={(phn) => setphone(phn)}
                                                style={styles.input}
                                                placeholder="Enter Vendor Phone No."
                                            />
                                        </View>


                                        {/* Address input box */}
                                        <View style={styles.inputcontainer}>
                                            <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                                            <TextInput
                                                value={address}
                                                onChangeText={(add) => setaddress(add)}
                                                style={styles.input}
                                                placeholder="Enter Vendor Address"
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

                                        {/* Line */}
                                        <View style={styles.line}></View>

                                    </View>


                                    <View style={{ marginVertical: 10, }}>

                                        {/* Shop_name input box */}
                                        <View style={styles.inputcontainer}>
                                            <Fontisto style={styles.iconstyle} name={"shopping-store"} size={25} />
                                            <TextInput
                                                value={shopName}
                                                onChangeText={(add) => setshopName(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Shop Name"
                                            />
                                        </View>

                                        {/* Shop_id input box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialCommunityIcon style={styles.iconstyle} name={"identifier"} size={25} />
                                            <TextInput
                                                value={shopId}
                                                onChangeText={(add) => setshopId(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Shop ID"
                                            />
                                        </View>

                                        {/* shop mail box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialIcon style={styles.iconstyle} name={"email"} size={25} />
                                            <TextInput
                                                value={shopEmail}
                                                onChangeText={(mail) => setshopEmail(mail)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Shop Email ID"
                                            />
                                        </View>

                                        {/* Shop_contact input box */}
                                        <View style={styles.inputcontainer}>
                                            <Entypo style={styles.iconstyle} name={"old-phone"} size={25} />
                                            <TextInput
                                                value={shopContact}
                                                onChangeText={(add) => setshopContact(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Contact"
                                            />
                                        </View>

                                        {/* Shop_District input box */}
                                        <View style={styles.inputcontainer}>
                                            <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                                            <TextInput
                                                value={district}
                                                onChangeText={(add) => setdistrict(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter District"
                                            />
                                        </View>

                                        {/* Shop_state input box */}
                                        <View style={styles.inputcontainer}>
                                            <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                                            <TextInput
                                                value={shopstate}
                                                onChangeText={(add) => setshopstate(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter State"
                                            />
                                        </View>


                                        {/* Shop_Address input box */}
                                        <View style={styles.inputcontainer}>
                                            <FontAwesome style={styles.iconstyle} name={"address-card-o"} size={25} />
                                            <TextInput
                                                value={fullAddress}
                                                onChangeText={(add) => setfullAddress(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Full Address"
                                            />
                                        </View>


                                        {/* Shop_pincode input box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialIcon style={styles.iconstyle} name={"pin-drop"} size={25} />
                                            <TextInput
                                                value={pincode}
                                                onChangeText={(add) => setpincode(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Pincode"
                                            />
                                        </View>


                                        {/* Shop_description input box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialCommunityIcon style={styles.iconstyle} name={"text"} size={25} />
                                            <TextInput
                                                value={description}
                                                onChangeText={(add) => setdescription(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Shop Description"
                                            />
                                        </View>


                                        {/* Shop_website input box */}
                                        <View style={styles.inputcontainer}>
                                            <MaterialCommunityIcon style={styles.iconstyle} name={"web"} size={25} />
                                            <TextInput
                                                value={website}
                                                onChangeText={(add) => setwebsite(add)}
                                                style={{ ...styles.input, borderColor: 'orange' }}
                                                placeholder="Enter Website"
                                            />
                                        </View>

                                        {/* Register btn */}
                                        <TouchableOpacity
                                            style={styles.registerbtn}
                                            onPress={
                                                () => registerVendor(email, password, vendorName, phone, address, shopName, shopId, shopEmail, shopContact, district, shopstate, fullAddress, pincode, description, website)
                                            }
                                        ><Text style={{ borderWidth: 1, textAlign: 'center', padding: 10, borderRadius: 5, color: 'pink', backgroundColor: 'black', fontWeight: '500', letterSpacing: 0.5 }}>
                                                REGISTER</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                                :

                                <View>

                                    <Text>Designer</Text>

                                </View>
                    }




                </ScrollView>

            </View>

        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({



    container: {
        backgroundColor: '#F8F8F6',
        //  justifyContent: 'center',
        flex: 1,
        //paddingVertical: 20


    },

    inputcontainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        alignItems: 'center',
    },

    iconstyle: {
        // marginRight: 20,
        width: '20%',
        alignSelf: 'center'
    },

    input: {
        borderColor: 'pink',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        width: "80%",
        padding: 10,
    },

    registerbtn: {
        marginVertical: 20,
        width: 100,

        alignSelf: 'center'
    },

    line: {
        borderBottomWidth: 0.7,
        borderColor: 'grey',
        marginVertical: 20,
        alignSelf: 'center',
        width: "85%"
    }

});