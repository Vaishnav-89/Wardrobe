import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Button, Image, Modal, ScrollView, TouchableOpacityBase, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper';


import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';


import { launchImageLibrary } from 'react-native-image-picker';

import { AuthContext } from '../routes/Authentication/AuthProvider';
import { FeedsStoresUserContext } from '../otherPages/Context';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


// title: `Wardrobe`,
// headerTintColor: "pink",
// headerTitleStyle: {
//     fontSize: 27,
//     fontWeight: '300'
// }

function VHome({ navigation }) {

    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);


    const [shopImgModal, setshopImgModal] = useState(false)

    const [modalOpen, setmodalOpen] = useState(false)

    const [shopItems, setshopItems] = useState([]);

    // const [feeds, setfeeds] = useState([])

    // useEffect(() => {

    //     dbstores.on('value', snapshot => {
    //         let data = snapshot.val();
    //         let array = Object.values(data);
    //         setfeeds(data);
    //         console.log(array);
    //         array.map(item => {
    //             console.log(item)
    //             console.log("=============================================")
    //         })
    //     }
    //     )



    //     // return () => {
    //     //     cleanup
    //     // }
    // }, [])


    // useEffect(() => {


    //     (async () => {

    //         const items = await feed.filter(
    //             (items) => {
    //                 return items.shop_id === userDetail.shop_id;
    //             }
    //         )
    //         setshopItems(items);
    //         console.log("use effect for shop items ---------------------------------------");
    //         console.log(items);
    //         console.log("---------------------------------------");

    //     })();



    // }, [feed])

    //text field States for post upload
    const [pTitle, setpTitle] = useState("");
    const [pCategory, setpCategory] = useState("");

    const [pPrice, setpPrice] = useState("");
    const [pDescription, setpDescription] = useState("");

    const [pSizeLabel, setpSizeLabel] = useState("")
    const [pSizeCount, setpSizeCount] = useState("")


    const [pSizes, setpSizes] = useState({});


    //post and image process States in post upload
    const [imageSource, setimageSource] = useState("")
    const [uploading, setuploading] = useState(false);
    const [transferred, settransferred] = useState(0);

    // ----- Image picking Btn function in post upload
    const pickImageHandler = () => {
        console.log("-------- Add img btn clicked ! ---------")
        launchImageLibrary({ mediaType: 'mixed', },
            response => {

                if (response.didCancel) {
                    console.log('Cancelled image picker');
                }
                else if (response.errorMessage) {
                    console.log(response.errorCode + " " + response.errorMessage)
                } else {
                    console.log(response);
                    setimageSource(response.assets[0]["uri"]);
                    console.log(imageSource);
                }
            }
        )

    }

    // addPost Btn Function in Upload Post
    const addPost = async () => {
        console.log("-------- Add post btn clicked ! ---------")

        //file nameing process
        const uploadImgUri = imageSource;
        let filename = uploadImgUri.substring(uploadImgUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        settransferred(0);
        setuploading(true);

        const task = storage().ref('feeds/' + userDetail["shop_id"] + '/' + filename).putFile(uploadImgUri);

        //set transferred state(uploading percentage)
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            settransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
        });


        //upload process in upload post
        try {

            //image upload process
            await task.then(async () => {

                console.log('Post Image uploaded to storage !');
                const imgLink = await storage().ref('feeds/' + userDetail["shop_id"] + '/' + filename).getDownloadURL();
                console.log("img link res -- " + imgLink);

                //Full post process
                const newReferenceKey = database().ref('/feeds').push();
                console.log("refffkey  -- " + newReferenceKey);

                newReferenceKey
                    .set(
                        {
                            category: pCategory,
                            image: imgLink,
                            likes: 0,
                            post_date: database.ServerValue.TIMESTAMP,
                            post_id: newReferenceKey.toString().slice(11),
                            price: pPrice,
                            product_description: pDescription,
                            shop_id: userDetail["shop_id"],
                            shop_name: userDetail["shop_name"],
                            sizes: pSizes,
                            title: pTitle,
                        }
                    )
                    .then(() => console.log("Post CREATED !"))
                // .catch((e) => console.log("----" + e))

            });

            setuploading(false);
            Alert.alert("Post Uploaded !");
            setmodalOpen(false);
            setimageSource("");
            setpTitle("");
            setpCategory("");
            setpSizes({});
            setpPrice("");
            setpDescription("");

        } catch (e) {
            console.log("catch eror --  " + e);
            setuploading(false);
            Alert.alert(e.message);

        }

    }

    //getting key from object of pSizes
    const sizeKeys = Object.keys(pSizes);


    //----------------------------------------------------------------------------------------------------------------------------

    return (

        <View style={styles.container}>


            {/* Modal to SHOP IMAGE --------------------------------------------------------------------------- */}

            <Modal visible={shopImgModal} animationType='slide' onRequestClose={() => setshopImgModal(false)} >
                <View style={styles.modalContainer}>

                    <MaterialIcon name='close'
                        size={29}
                        style={{ margin: 15 }}
                        onPress={() => setshopImgModal(false)} />

                    <Text>to add shop image</Text>

                </View>
            </Modal>


            {/* ------------------------------------------------------------------------------------------------ */}




            {/* Modal to ADD POST  --------------------------------------------------------------------------- */}

            <Modal visible={modalOpen} animationType='slide'
                onRequestClose={() => {
                    setmodalOpen(false)
                    setimageSource("");
                    setpTitle("");
                    setpCategory("");
                    setpSizes({});
                    setpPrice("");
                    setpDescription("");
                    setpSizeLabel("");
                    setpSizeCount("");
                }} >

                {/* Modal container */}
                <View style={styles.modalContainer}>

                    {/* Modal add post header */}
                    <View style={{ flexDirection: 'row', margin: 18, justifyContent: 'space-between' }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}> Add Post </Text>

                        <MaterialIcon name='close'
                            size={29}
                            style={{}}
                            onPress={() => {
                                setmodalOpen(false)
                                setimageSource("");
                                setpTitle("");
                                setpCategory("");
                                setpSizes({});
                                setpPrice("");
                                setpDescription("");
                                setpSizeLabel("");
                                setpSizeCount("");
                            }
                            }
                        />

                    </View>

                    {/* Modal content  */}
                    <ScrollView>
                        {/* Image Container */}

                        {/* <View style={{ marginHorizontal: 20, marginVertical: 10, borderWidth: 1, height: 200, width: 300, alignSelf: 'center', backgroundColor: '#eee', borderColor: 'pink' }}> </View> */}

                        <Image style={{
                            marginVertical: 10,
                            backgroundColor: 'white',
                            // borderWidth: 2,
                            // borderColor: "pink",
                            height: 200,
                            width: "80%",
                            alignSelf: 'center',
                            resizeMode: 'contain'
                        }}
                            source={{ uri: imageSource == "" ? "https://qph.fs.quoracdn.net/main-qimg-fe390999a9ab0f2bd39159e10b9a630f" : imageSource }}
                        />



                        <View style={{ width: 110, alignSelf: 'center', marginVertical: 10, marginBottom: 10 }}>
                            <Button title="Add Image" color='pink' onPress={pickImageHandler} />
                        </View>


                        {/* Inputs for product post */}
                        <View style={{ marginLeft: 20, marginRight: 10, marginTop: 2, }}>

                            <TextInput
                                value={pTitle}
                                onChangeText={t => setpTitle(t)}
                                style={{ marginVertical: 10, width: "90%", backgroundColor: 'transparent' }}
                                //   placeholder="Title"
                                label="Title"
                                underlineColor="pink"
                            />

                            <TextInput
                                value={pCategory}
                                onChangeText={t => setpCategory(t)}
                                style={{ marginVertical: 10, width: "90%", backgroundColor: 'transparent' }}
                                label="Category"
                                underlineColor="pink"

                            />

                            {/* Size Input Section */}
                            <View style={{ marginTop: 10 }}>

                                <Text style={{ fontSize: 15, color: 'grey', marginVertical: 5 }}>Size</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        value={pSizeLabel}
                                        label="Enter Size Label"
                                        style={{ width: "43%", height: 45, alignSelf: 'flex-start', marginRight: 5 }}
                                        mode='outlined'
                                        onChangeText={(inp) => setpSizeLabel(inp)}
                                    />

                                    <TextInput
                                        value={pSizeCount}
                                        label="Enter No.of Stocks"
                                        style={{ width: "49%", height: 45, alignSelf: 'flex-start' }}
                                        mode='outlined'
                                        keyboardType='number-pad'
                                        onChangeText={(inp) => setpSizeCount(inp)}
                                    />
                                </View>

                                {/* add size */}
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            //console.log(pSizeLabel + " " + pSizeCount);
                                            setpSizes((prevPSizes) => {
                                                return {

                                                    [pSizeLabel.toUpperCase()]: pSizeCount
                                                    , ...prevPSizes
                                                }
                                            })
                                            setpSizeLabel("");
                                            setpSizeCount("");
                                        }
                                    }
                                    style={styles.addSizeBtn}
                                >
                                    <Text style={{ fontSize: 12, color: 'orange', fontWeight: '500', }} >Add Size</Text>

                                </TouchableOpacity>


                                {/* displaying Size List */}
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        sizeKeys.map((key, index) => {
                                            return <View key={index} style={{
                                                flexDirection: 'row',
                                                marginRight: 10,
                                                marginVertical: 5,
                                                borderWidth: 1,
                                                alignSelf: 'flex-start',
                                                alignItems: 'center',
                                                borderStyle: 'dashed',
                                                borderRadius: 4,
                                            }}>

                                                <Text style={{ color: 'orange', fontWeight: '900', paddingLeft: 7, paddingVertical: 5 }}>{key}</Text>

                                                <Text style={{ paddingRight: 7, paddingVertical: 5 }}> - {pSizes[key]}</Text>

                                                <MaterialCommunityIcon name='window-close' size={19}
                                                    style={{ borderLeftWidth: 1, borderStyle: 'dashed', paddingVertical: 5, paddingHorizontal: 4 }}
                                                />
                                            </View>
                                        })
                                    }
                                </View>

                            </View>


                            {/* price input */}
                            <TextInput
                                value={pPrice}
                                onChangeText={t => setpPrice(t)}
                                style={{ marginTop: 0, marginVertical: 10, width: "90%", backgroundColor: 'transparent' }}
                                underlineColor="pink"

                                label="Price"
                                keyboardType='number-pad'
                            />

                            <TextInput
                                value={pDescription}
                                onChangeText={t => setpDescription(t)}
                                style={{ marginVertical: 10, width: "90%", }}
                                label="Description"
                                multiline={true}
                                mode='outlined'
                                outlineColor="pink"
                            />

                            {/* Add post btn & LOADING*/}

                            {
                                uploading ?
                                    (
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text>{transferred} % Completed !</Text>
                                            <ActivityIndicator size='large' color='black' />
                                        </View>
                                    ) :

                                    (

                                        <View style={{ width: 110, marginVertical: 10, marginBottom: 10, alignSelf: 'center' }}>
                                            <Button title="Add Post" color='pink' onPress={addPost} />
                                        </View>
                                    )

                            }



                        </View>

                    </ScrollView>
                </View>

            </Modal>


            {/* -------------------------------------------- V HOME PAGE ---------------------------------------------------- */}



            {/* shop_image */}
            <View >
                {
                    userDetail.shop_image === "" ?

                        <Image style={styles.shopImages} source={{ uri: "https://i.pinimg.com/736x/37/6f/5a/376f5a79f1dae1498ad29859fc47271c.jpg" }} />
                        :
                        <Image style={styles.shopImages} source={{ uri: userDetail.shop_image }} />
                }

            </View>


            {/* Add Shop Imaga btn */}

            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end' }} onPress={() => setshopImgModal(true)}>
                <View style={styles.addShopImage}>

                    <MaterialCommunityIcon name='image-plus' size={27} style={{ alignSelf: 'center' }} />

                    <Text style={{ padding: 10, }}>Add Shop Images</Text>

                </View>
            </TouchableOpacity>



            {/* content ----------------------------------------------------------  container */}

            <View style={{ margin: 10 }}>

                <Text style={{}}>@{userDetail.shop_id}</Text>



                {/* shop_name */}

                <Text style={styles.shopName}>{userDetail.shop_name}</Text>


                {/* subscribers & post text */}

                <View style={styles.subPostBox}>

                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.subPostTxt}>Subscribers</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 1, fontSize: 18, fontWeight: '600' }}>{userDetail.shop_subscribers}</Text>

                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.subPostTxt}>Posts</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 1, fontSize: 18, fontWeight: '600' }}>{userDetail.shop_posts}</Text>

                    </View>
                </View>

                {/* Add Post btn */}

                <TouchableOpacity style={styles.addPostBox} onPress={() => setmodalOpen(true)}>

                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="plus" size={25} />

                        <Text style={styles.addPostTxt}>Add a Post</Text>
                    </View>

                </TouchableOpacity>


                {/* Products page button */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate("VShopPosts")}>

                    <View style={{
                        flexDirection: 'row',

                        alignSelf: 'center',
                        borderWidth: 3,
                        paddingVertical: 15,
                        // paddingHorizontal: 70,
                        marginVertical: 25,
                        borderColor: 'grey',
                        // borderStyle: 'dotted',
                        borderRadius: 10,
                        backgroundColor: 'black',
                        elevation: 15,


                    }}>
                        <Text
                            style={{
                                // alignSelf: 'center',
                                // borderWidth: 3,
                                // paddingVertical: 15,
                                // paddingHorizontal: 70,
                                // marginVertical: 25,
                                // borderColor: 'grey',
                                // //borderStyle: 'dotted',
                                // borderRadius: 10,
                                fontWeight: '600',
                                fontSize: 15,
                                color: 'pink',
                                paddingLeft: 20,
                                // backgroundColor: 'black',
                                // elevation: 15,
                            }}
                        >Your Products
                        </Text>

                        <SimpleLineIcons name="arrow-right" color='pink' size={24} style={{ marginLeft: 120, marginRight: 20 }} />

                    </View>

                </TouchableWithoutFeedback>


            </View>

            {/* content ----------------------------------------------------------  container  Ends -- */}








            {/* UPPER container  && shop_posts  in flatlist */}
            {/* <FlatList
                // scrollEnabled={false}
                numColumns={2}
                data={shopItems}
                keyExtractor={(item) => item.post_id}



                // ListHeaderComponent={


                //     }


                renderItem={
                    ({ item }) => (
                        <TouchableOpacity style={{ backgroundColor: 'white', margin: 1, width: "49%", }} onPress={() => {
                            console.log("tapped")
                            navigation.push('PostDetailPage', { item_post_id: item.post_id })
                        }}>
                            <View >

                                <Image style={styles.postImage} source={{ uri: item.image }} />
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontSize: 15 }}>{item.title}</Text>
                                    <Text style={{ color: 'grey', fontSize: 13 }}>{item.shop_id}</Text>
                                    <Text style={{ marginTop: 5 }}>{'\u20B9'}{item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            />
             */}



        </View>

        // {/* </ScrollView> */}
        // </View >
    )
}

export default VHome



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F6'
    },


    modalContainer: {
        backgroundColor: '#F8F8F6',
        height: "100%"
    },



    shopImages: {
        height: 175.5,
        backgroundColor: 'white',
        resizeMode: 'cover',

    },

    addShopImage: {
        //position: 'absolute',
        flexDirection: 'row',
        padding: 0,
        paddingLeft: 5,
        //  borderWidth: 1,
        borderRadius: 5,
        //alignSelf: 'flex-end',
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        // top: 10,
        // right: 10
    },


    shopName: {

        //position: 'absolute',
        //   right: "3%",
        marginTop: 7,

        fontSize: 22,
        fontWeight: '300',
        fontStyle: 'italic',
        //top: 258,
        //borderWidth: 1,
        paddingTop: 22,
        paddingBottom: 10,
        paddingHorizontal: 15,
        color: 'pink',
        backgroundColor: 'rgba(41, 52, 52, 0.8)',
        borderRadius: 10,
        alignSelf: 'flex-start',
        borderStyle: 'dotted',
        borderBottomColor: 'grey',
        borderBottomWidth: 2.5,
        elevation: 25,

    },


    subPostBox: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignSelf: 'flex-end',
        marginTop: 10,
        //borderWidth: 2,
        borderRadius: 5,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // marginHorizontal: 70,
        //elevation: 2,
        //shadowColor: 'pink',
    },


    subPostTxt: {
        fontSize: 18,
        fontWeight: '400',
        color: 'pink'
    },

    addPostBox: {
        borderWidth: 2,
        marginTop: 20,
        paddingHorizontal: "25%",
        paddingVertical: "15%",
        alignSelf: 'center',
        borderRadius: 25,
        borderStyle: 'solid'
    },

    addPostTxt: {
        fontSize: 18,
        fontWeight: '300',
        alignSelf: 'center',
        marginHorizontal: 10
    },

    postImage: {
        backgroundColor: 'white',
        height: 250,
        resizeMode: 'contain'
    },

    line: {
        borderWidth: 0.4,
        borderColor: 'pink',
        margin: 10,
    },

    addSizeBtn: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 5,
        padding: 7,
        backgroundColor: 'black',
        elevation: 1,
        marginBottom: 15
    },



})