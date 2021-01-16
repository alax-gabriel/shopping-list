import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default function ListItems({ item, deleteItem }){
    return(
      <View style={styles.render_item}>
        <Text style={styles.item_flatlist}>{item.item}</Text>
        <Text style={styles.unit_flatlist}>{item.unit}</Text>
        <Text style={styles.price_flatlist}>R$ {String(Number(item.price).toFixed(2)).replace('.', ',')}</Text>
        <TouchableOpacity style={styles.delete_item_btn} onPress={() => deleteItem(item)}>
          <Icon name='trash-2' size={18} color='#f55' />
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  render_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: '#3a3a3a',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 10
  },
  item_flatlist: {
    color: '#fff',
    fontSize: 20,
    width: '40%',
    fontFamily: 'Cochin',
    marginLeft: 10,
  },
  unit_flatlist: {
    color: 'gray',
    fontSize: 20,
    width: '15%',
    marginLeft: 10,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  price_flatlist: {
    color: 'gray',
    fontSize: 15,
    width: '25%',
    textAlign: 'center',
    fontFamily: 'Cochin',
    marginLeft: 10,
  },
  delete_item_btn: {
    width: '15%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete_item_text: {
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: 50,
    width: 25,
    textAlign: 'center',
  },
})
