import React, { createContext, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';


import database from '@react-native-firebase/database'



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{

                user,
                setUser,

                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },

                //register user client
                register: async (email, password, username, phone, address, address2, district) => {

                    await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            console.log('User account created & signed in!');
                            uID = auth().currentUser.uid
                            database()
                                .ref('users/' + uID)
                                .set(
                                    {
                                        username: username,
                                        email_id: email,
                                        uid: uID,
                                        contact: phone,
                                        address1: address,
                                        address2: address2,
                                        district: district
                                    }
                                ).then(console.log("created data of user *****"))

                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');
                            }

                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                            }

                            console.error(error);
                        });

                },


                // register vendor func

                registerVendor: async (email, password, vendorName, phone, address, shopName, shopId, shopEmail, shopContact, district, shopstate, fullAddress, pincode, description, website) => {

                    await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            console.log('Vendor account created & signed in!');
                            uID = auth().currentUser.uid
                            // to create store in DB
                            database()
                                .ref('stores/' + shopId)
                                .set(
                                    {
                                        vendor: {
                                            name: vendorName,
                                            email_id: email,
                                            phone: phone,
                                            address: address,
                                        },
                                        shop_id: shopId,
                                        shop_name: shopName,
                                        shop_email: shopEmail,
                                        shop_contact: shopContact,
                                        shop_district: district,
                                        shop_state: shopstate,
                                        shop_address: fullAddress,
                                        shop_pincode: pincode,
                                        shop_description: description,
                                        shop_website: website,
                                        shop_creationdate: database.ServerValue.TIMESTAMP,
                                        shop_image: "",
                                        shop_subscribers: 0,
                                        // uid: uID,

                                    }
                                ).then(
                                    // to register in the vendor list
                                    database().ref('vendors/').set(
                                        {
                                            [uID]: shopId,
                                        }
                                    ).then(console.log("created data of Vender Shop *****"))
                                )
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');
                            }

                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                            }

                            console.error(error);
                        });

                },


                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};