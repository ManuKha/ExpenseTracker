import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Platform } from 'react-native';

import Colors from '../constants/Colors';

const CategoryItem = props => {


  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.categoryNm}>{props.categoryNm}</Text>
      </View>
      <Button style={styles.deleteButton}
            color={Colors.accent}
            title="Delete"            
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={props.onDelete}
          /> 
         
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  deleteButton:{
    backgroundColor: Colors.navy
  },
  
  infoContainer: {
    marginLeft: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  categoryNm: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  deleteButton: {
    marginRight: 18
  }

  
});

export default CategoryItem;
