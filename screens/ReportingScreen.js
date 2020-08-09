import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, StyleSheet, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Details from '../components/Details';
import * as itemActions from '../store/item-action';
import * as reportingAction from '../store/reporting-action';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';

const ReportingScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false); 
  
    const getData = useSelector(state => state.items.items);
    const dispatch = useDispatch();
  
    const deleteHandler = (id, categoryNm, amount, insDate) => {
        Alert.alert('sure?', '', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(itemActions.deleteItem(id));
                    dispatch(reportingAction.deleteFromSQL(id));
                   
                }
            }
        ]);
    };

    const deleteAllSQL = () => {
      Alert.alert('sure?', '', [
        { text: 'No', style: 'default' },
        {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
                dispatch(reportingAction.deleteAllSQL());
            }
        }
    ]);
    };

  
      const loadData = useCallback(async () => {
        setError(null);
       setIsRefreshing(true);
        try {
          await dispatch(itemActions.loaditems()).then();
        } catch (err) {
          setError(err.message);
        }
       setIsRefreshing(false);
      }, [dispatch, setIsLoading, setError]);

      useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadData);
        return ()=> {
          willFocusSub.remove();
        };
      }, [loadData]);

  
    useEffect(() => { 
        setIsLoading(true);
        loadData().then(() => {
        setIsLoading(false);
      });
      }, [dispatch, loadData]);

      if (error) {
        return (
          <View style={styles.centered}>
            <Text>An error ocurred!</Text>
            <Button title="try again" onPress={loadData} color={Colors.primary}/>
          </View>
        );
      }
    
  if (isLoading){
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && getData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products were found. Maybe start adding some!</Text>
        {/* <Button title="removeSQL data" onPress={deleteAllSQL} color={Colors.primary}/> */}
      </View>
    );
  }
    

    return (
        <FlatList
            onRefresh={loadData}
            refreshing={isRefreshing}
            data={getData}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                
                <View>
                    <View>
                        <Details
                            categoryNm={itemData.item.categoryNm}
                            desc={itemData.item.itemNm}
                            amount={itemData.item.amount}
                            date={itemData.item.insDate}
                            onDelete={() => {
                                deleteHandler(itemData.item.id, itemData.item.categoryNm, itemData.item.amount, itemData.item.insDate);
                            }}
                        >
                        </Details>
                    </View>
                </View>


            )}
        />
    );
};


ReportingScreen.navigationOptions = navData => {
  return {
    headerTitle: 'View',
   headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
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

export default ReportingScreen;