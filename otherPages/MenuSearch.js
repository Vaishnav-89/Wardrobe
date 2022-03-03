import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Wrapper } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'


// import { feed, stores } from '../pages/dummydata';
import MenuSearchTopTab from '../routes/MenuSearchTopTab';


import { SearchResultContext, ShopIdContext, FeedsStoresUserContext } from '../otherPages/Context'
import MenuMenCategory from './MenuPages/MenuCategory';


function MenuSearch({ route, navigation }) {

    const { feed, stores, userDetail, orders, designers } = React.useContext(FeedsStoresUserContext);

    const [query, setQuery] = useState("");


    const [filteredDataDress, setFilteredDataDress] = useState([]);
    const [filteredDataShop, setFilteredDataShop] = useState([]);
    const [filteredDataDesigners, setfilteredDataDesigners] = useState([])
    const [filteredDataLocation, setFilteredDataLocation] = useState([]);

    const handleFilter = (searchText) => {

        setQuery(searchText);

        const filteredSetDress = Object.values(feed).filter((item) => {
            return item.title.toLowerCase().includes(searchText.toLowerCase());
        })

        const filteredSetShop = Object.values(stores).filter((item) => {
            return item.shop_id.toLowerCase().includes(searchText.toLowerCase());
        })

        const filteredSetDesigners = Object.values(designers).filter((item) => {
            return item.d_id.toLowerCase().includes(searchText.toLowerCase());
        })

        const filteredSetLocation = Object.values(stores).filter((item) => {
            return item.shop_district.toLowerCase().includes(searchText.toLowerCase());
        })

        searchText == "" ? setFilteredDataDress([]) : setFilteredDataDress(filteredSetDress);

        searchText == "" ? setFilteredDataShop([]) : setFilteredDataShop(filteredSetShop);

        searchText == "" ? setfilteredDataDesigners([]) : setfilteredDataDesigners(filteredSetDesigners);

        searchText == "" ? setFilteredDataLocation([]) : setFilteredDataLocation(filteredSetLocation);
    }

    const clearSearchQuery = () => {
        setFilteredDataDress([]);

        setFilteredDataShop([]);

        setfilteredDataDesigners([]);

        setFilteredDataLocation([]);

        setQuery("");
    }

    return (
        <View style={styles.container}>

            <View style={{ paddingTop: 9, backgroundColor: '#FEF1E6' }}>

                <Ionicons name="arrow-back" size={25} style={{ top: 33, marginHorizontal: 17 }}
                    onPress={() => navigation.goBack()}
                />


                <TextInput
                    autoFocus={true}
                    style={styles.input}
                    placeholder="Search"
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

            </View>


            {/* switch(route.params.searchResultKey)
            {
                
                case 'searchMenu':
                break;
                case 'menCategory':
                break;
                case 'WommenCategory':
                break;
            } */}
            {/* 
            <MenuMenCategory /> */}


            {/* Search Results Sections */}
            <SearchResultContext.Provider value={{ filteredData: filteredDataDress, filteredDataShop: filteredDataShop, filteredDataDesigners: filteredDataDesigners, filteredDataLocation: filteredDataLocation }}>
                <MenuSearchTopTab />

            </SearchResultContext.Provider>




        </View>
    )
}

export default MenuSearch

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

})