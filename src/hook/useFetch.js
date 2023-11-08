import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const [count, setCount] = useState();

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `${JSON.parse(id)}`;
    setUserId(userId);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://10.0.2.2:3000/api/products/');
      setData(res.data);
      console.log('*****Data Fetched******');
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error, '===========');
    } finally {
      setIsLoading(false);
    }
  };

  const getCartQuantity = async () => {
    const endpoint = `http://10.0.2.2:3000/api/cart/find/${userId}`;
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        const cartData = response.data;
        if (cartData) {
          const totalQuantity = cartData[0].products.reduce(
            (total, item) => total + item.quantity,
            0,
          );

          setCount(totalQuantity);
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    checkExistingUser();
    getCartQuantity();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
    getCartQuantity();
  };

  return {data, isLoading, error, refetch, userId, count};
};

export default useFetch;
