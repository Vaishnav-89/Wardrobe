import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'

// import { stores } from '../../pages/dummydata'

import { FeedsStoresUserContext } from '../Context'


function SearchLocationList({ route, navigation }) {

    const { feed, stores } = React.useContext(FeedsStoresUserContext);

    const [filteredDataLocationShops, setFilteredDataLocationShops] = useState([]);

    //params from previous page(selected location from search result)
    const searchDistrict = route.params.location_district;

    useEffect(() => {

        const filteredSetLocation = Object.values(stores).filter((item) => {
            return item.shop_district.toLowerCase() === (searchDistrict.toLowerCase());
        })

        setFilteredDataLocationShops(filteredSetLocation);

    }, [stores])


    return (
        <View style={styles.container}>

            <FlatList

                data={filteredDataLocationShops}
                keyExtractor={(item) => (item.shop_id)}

                renderItem={
                    ({ item }) => (

                        <TouchableOpacity onPress={() => (navigation.navigate('ShopDetailNavigator', { item_shop_id: item.shop_id }))}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                marginVertical: 1,
                                paddingHorizontal: 10,
                                height: 90
                            }}>
                                <Entypo name="shop" size={25} color='#E0C097' style={{ marginHorizontal: 3, marginVertical: 30 }} />

                                <View style={{ justifyContent: 'center', marginLeft: 10, }}>
                                    <Text style={styles.searchResultTile}>{item.shop_name}</Text>
                                    <Text style={{ marginRight: 8, color: 'grey', fontSize: 13 }}>{item.shop_id}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                }


            />
        </View>
    )
}

export default SearchLocationList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F6',
        flex: 1
    },

    searchResultTile: {
        marginRight: 8,
        fontSize: 17,
        fontWeight: '600'
    }
})