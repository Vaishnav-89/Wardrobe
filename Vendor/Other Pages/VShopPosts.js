import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Button, Image, Modal, ScrollView, SectionList } from 'react-native'
import { FeedsStoresUserContext } from '../../otherPages/Context';


function VShopPosts({ navigation }) {



    const { feed, stores, userDetail } = React.useContext(FeedsStoresUserContext);


    const [shopItems, setshopItems] = useState([]);



    useEffect(() => {

        // (() => {
        const items = Object.values(feed).filter(
            (items) => {
                return items.shop_id === userDetail.shop_id;
            }
        )
        setshopItems(items);
        console.log("use effect for shop items ---------------------------------------");
        console.log(items);
        console.log("---------------------------------------");
        // })();

    }, [])


    return (
        <View style={styles.container}>
            <FlatList
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
                            navigation.push('VShopPostDetails', { item_post_id: item.post_id })
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
        </View>
    )
}

export default VShopPosts




const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F6'
    },

    postImage: {
        backgroundColor: 'white',
        height: 207,
        resizeMode: 'cover'
    },

})