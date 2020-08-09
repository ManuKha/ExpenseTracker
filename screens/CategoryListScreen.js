import React, {useEffect} from 'react';
import { FlatList, Alert, StyleSheet, View, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CategoryItem from '../components/CategoryItem';
import * as categoriesActions from '../store/categoryName-action';
import HeaderButton from '../components/HeaderButton';

const CategoryListScreen = props => {

    const categories = useSelector(state => state.categories.categories);
  const dispatch  = useDispatch();


  const addItemHandler = categoryNm => {
    props.navigation.navigate('ItemDetail', { categoryNmText: categoryNm });

  };

  const deleteHandler = id => {
    Alert.alert('sure?', '', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(categoriesActions.deleteCategory(id));
        }
      }
    ]);
  };

  useEffect(() => {
      dispatch(categoriesActions.fetch());
  }, [dispatch]);



  if (categories.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Categories yet. Maybe start by adding a new one!</Text>
      </View>
    );
  }

    return (
        // <View style={{flex:1}}> 
     
        <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <CategoryItem    
          
        categoryNm={itemData.item.categoryNm}
        showDetails={false}
         
          onSelect={() => {
            addItemHandler(itemData.item.categoryNm);
          }}

          onDelete={() => {
            deleteHandler(itemData.item.id);
          }}


        >
       
        
           </CategoryItem>
      )}
    />

    // </View>
    );
};

CategoryListScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Category List',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add New"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('ItemDetail');
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton} >
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.openDrawer()
            }}
          />
        </HeaderButtons>
      )
    };
  };

  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default CategoryListScreen;

