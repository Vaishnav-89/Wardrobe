import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
// import { feed } from '../../pages/dummydata';


import { FeedsStoresUserContext } from '../Context'



function MenuCategory({ route, navigation }) {

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const { database, searchFilterKey } = route.params;

    const [filteredCategory, setFilteredCategory] = useState([]);


    useEffect(() => {

        const CategoryData =

            database == 'feed' ?

                Object.values(feed).filter((item) => {
                    return item.category.toLowerCase() === (searchFilterKey.toLowerCase());
                })
                :
                database == 'Designers' ? Object.entries(designers) : Object.entries(stores)


        // searchText == "" ? setFilteredDataDress([]) : 
        setFilteredCategory(CategoryData);

        // { console.log("------------------------------------------------------------------------ Category search") }


        setFilteredData(CategoryData);
        // return () => {
        //     cleanup
        // }

    }, [])


    // search keyword state
    const [query, setQuery] = useState("");

    // search keyword result list
    const [filteredData, setFilteredData] = useState(filteredCategory);
    console.log(filteredData)

    // search function
    const handleFilter = (searchText) => {

        setQuery(searchText);

        const filteredSetDress =



            filteredCategory.filter((item) => {
                return database == 'feed' ?
                    item.title.toLowerCase().includes(searchText.toLowerCase())
                    :
                    database == "Designers" ?
                        item[1].d_id.toLowerCase().includes(searchText.toLowerCase())
                        :
                        item[1].shop_id.toLowerCase().includes(searchText.toLowerCase())
            })




        searchText == "" ? setFilteredData(filteredCategory) : setFilteredData(filteredSetDress);

    }

    // to clear search text and restore original data list 
    const clearSearchQuery = () => {

        setFilteredData(filteredCategory);
        setQuery("");

    }




    return (
        <View>
            <View style={{
                paddingTop: 9, backgroundColor: '#FEF1E6', paddingBottom: 0, elevation: 10
            }}>

                {/* back button  */}
                <Ionicons name="arrow-back" size={25} style={{ top: 33, marginHorizontal: 17 }}
                    onPress={() => navigation.goBack()}
                />

                {/* search box */}
                <TextInput
                    //autoFocus={true}
                    style={styles.input}
                    placeholder={`Search in ${database == 'feed' ? searchFilterKey : database}'s`}
                    value={query}
                    onChangeText={(text) => (handleFilter(text))}
                />

                <Ionicons
                    name={query.length == 0 ? "md-search" : "md-close"}
                    size={24}
                    style={{ position: 'absolute', right: 36, top: 42 }}
                    onPress={() => {
                        clearSearchQuery();
                        console.log("search clr")
                    }}
                />

                {/* Heading */}
                <Text style={{
                    margin: 20, marginBottom: 12, fontWeight: '400', fontSize: 22,
                    borderBottomWidth: 2, paddingBottom: 7, borderColor: 'orange',
                }}>{database == 'feed' ? ` ${searchFilterKey}'s Fashion` : database}</Text>

            </View>

            {/* {console.log("------------------------------------------------------------------------ filtered search")}
            {console.log(filteredDataDress)} */}

            <FlatList

                //contentContainerStyle={{ paddingBottom: 145 }}
                style={{
                    marginBottom: 145

                }}

                numColumns={database == 'feed' ? 2 : 1}
                data={filteredData}
                keyExtractor={(item) => (database == "feed" ? item.post_id : database == "Stores" ? item[0] : item[0])}
                renderItem={

                    database == "feed" ?

                        ({ item }) => (

                            <TouchableOpacity style={{ backgroundColor: 'white', margin: 1, width: "49%", }} onPress={() => {
                                console.log("tapped")
                                navigation.push('PostDetailPage', { item_post_id: item.post_id })
                            }}>
                                <View >

                                    <Image style={styles.postImage} source={{ uri: item.image }} />
                                    <View style={{ margin: 10 }}>
                                        <Text style={{ fontSize: 15 }}>{item.title}</Text>
                                        <Text style={{ color: 'grey', fontSize: 13 }}>{item.shop_id || item.d_id}</Text>

                                        {item.shop_id ?
                                            <Text style={styles.pricetag}>{`\u20B9 ${item.price}`}</Text>
                                            :
                                            <Text style={{ ...styles.pricetag, borderStyle: 'solid' }}>Designed</Text>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                        :

                        database == "Stores" ?

                            ({ item }) => (

                                <TouchableOpacity onPress={() => (navigation.navigate('ShopDetailNavigator', { item_shop_id: item[0] }))}>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        marginVertical: 1,
                                        paddingHorizontal: 10,
                                        height: 90,
                                        alignItems: 'center'
                                    }}>
                                        <Entypo name="shop" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.searchResultTile} >{item[1]['shop_id']}</Text>
                                            <Text style={{ color: 'grey', fontSize: 13 }}>{item[1]['shop_name']}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )

                            :

                            ({ item }) => (


                                <TouchableOpacity onPress={() => (navigation.navigate('ShopDetailNavigator', { item_shop_id: item[0] }))}>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        marginVertical: 1,
                                        paddingHorizontal: 10,
                                        height: 90,
                                        alignItems: 'center'
                                    }}>
                                        <Entypo name="scissors" size={25} color='#E0C097' style={{ marginHorizontal: 3, }} />

                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.searchResultTile} >{item[1]['d_id']}</Text>
                                            <Text style={{ color: 'grey', fontSize: 13 }}>{item[1]['d_name']}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )

                }

            />


        </View>

    )
}

export default MenuCategory



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        height: "100%",

    },

    searchBox: {
        // justifyContent: 'center',

        flexDirection: 'row',
        // marginTop: 30,

    },

    input: {
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 6,
        height: 40,
        //fontSize: 15,
        //width: "100%",
        padding: 10,
        paddingRight: 43,
        marginLeft: 55,
        marginRight: 20,

        // marginVertical: 17,
        //alignSelf: 'auto'

    },

    searchItemTile: {
        padding: 15
    },


    postImage: {
        backgroundColor: 'white',
        height: 250,
        resizeMode: 'contain'
    },

    pricetag: {
        marginTop: 7,
        borderWidth: 1,
        alignSelf: 'stretch',
        padding: 5,
        textAlign: 'center',
        color: 'pink',
        borderRadius: 5,
        fontWeight: 'bold',
        borderStyle: 'dotted'
    },

    searchResultTile: {

        fontSize: 17,
        fontWeight: '600'
    }

})