import React, { useState, useEffect, useCallback, ReactDOM } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather'
import ListItems from './src/components/ListItems'
import Title from './styles'


export default function App(){
  const [item, setItem] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState('')
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])

  useEffect( () => {
    async function loadItems(){
      try{
        const itemsStorage = await AsyncStorage.getItem('@items')
        if(itemsStorage){
          setData(JSON.parse(itemsStorage))
        }
      } catch (error){
        console.log('erro ao cadastrar lista: ' + error)
      } 
    }
    
    loadItems()
  }, [])

  useEffect( () => {
    async function storageItems(){
      try{
        await AsyncStorage.setItem('@items', JSON.stringify(data))
      } catch (error){
        console.log('erro ao buscar lista: ' + error)
      } 
    }
    
    storageItems()
  }, [data])

  useEffect( () => {
    function totalSum(){
      var sum = 0;
      data.map(item => {
        sum += Number(item.unit) * Number(item.price, 10)
      })
      setTotal(sum)
    }

    totalSum()
  }, [data])

  function addItem(){
    if(item == ''){
      Alert.alert("Preencha o nome do item!")
      return;
    }
    const _price = parseFloat(price.replace(',', '.'))
    const newItem  = {item, unit, price: _price}
    if(!unit) newItem.unit = '0'
    setData([...data, newItem])
    setItem('')
    setUnit('')
    setPrice('')
  }

  const deleteItem = useCallback((item) =>{
    const newData = data.filter( d => d.item != item.item)
    setData(newData)
  })

  return (
    <>
      <Title>Lista de Compras</Title>
      <StatusBar barStyle="light-content" backgroundColor="#3a3a3a" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Lista de Compras</Text> */}
        </View>
        <View style={styles.add_items_container}>
          <View style={styles.input_view_title}>
            <TextInput 
            style={styles.item_title} 
            placeholder="Nome do item"
            value={item}
            onChangeText={item => setItem(item)} 
            />
          </View>
          <View style={styles.input_view_units}>
            <TextInput 
            style={styles.item_units} 
            keyboardType="numeric" 
            placeholder="Qnt."
            value={unit}
            onChangeText={unit => setUnit(unit)} 
            />
          </View>
          <View style={styles.input_view_price}>
            <TextInput 
            style={styles.item_price} 
            keyboardType="numeric" 
            placeholder="Preço (R$)"
            value={price}
            onChangeText={price => setPrice(price)} 
            />
          </View>
            <TouchableOpacity style={styles.add_btn_container} onPress={addItem} >
              <Icon name='plus' size={22} color='#fff' />
            </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.flatlist}>
            <FlatList 
            data={data}
            renderItem={({item}) => <ListItems item={item} deleteItem={deleteItem} />}
            keyExtractor={ item => item.item }
            />
          </View>  
          <View style={styles.footer}>
            <Icon name='shopping-cart' size={25} color='#fff' /> 
            <Text style={styles.footer_text}>
              { 'R$ ' + String(Number(total, 10).toFixed(2)).replace('.', ',') }
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a3a3a',
  },
  header: {
    backgroundColor: '#3a3a3a',
  },
  title: {
    fontFamily: 'FontAwesome5_Regular',
    textAlign: 'center',
    color: '#fff',
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: 50,
  },
  add_items_container: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 5,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray'
  },
  input_view_title: {
    width: '40%',
  },
  item_title: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    width: '100%',
  },
  input_view_units: {
    width: '15%',
  },
  item_units: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    width: '100%',
  },
  input_view_price: {
    width: '30%',
  },
  item_price: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
  },
  add_btn_container: {
    width: '10%',
    alignItems: "center",
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  add_btn: {
    color: '#fff',
    fontSize: 40,
  },
  body: {
    flex: 1
  },
  flatlist: {
    flex: 0.9
  },
  footer: {
    flex: 0.1,
    width: '100%',
    backgroundColor: '#3a3a3a',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  footer_text: {
    color: '#6f6',
    fontSize: 25,
    padding: 10,
  },
});
