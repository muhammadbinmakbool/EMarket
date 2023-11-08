import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants';
import styles from './search.style';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:3000/api/products/search/${searchKey}`,
      );
      setSearchResults(res.data);
    } catch (error) {
      console.log('Failed to get the Product', error);
    }
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are You Looking for"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}>
            <FeatherIcon name="search" color={COLORS.offwhite} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/images/Pose23.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item._id}
          style={{marginHorizontal: 12}}
          renderItem={({item}) => <SearchTile item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
