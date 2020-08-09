import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ListView, StyleSheet, ActivityIndicator, Platform  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import BI from '../components/BI';
import * as reportingActions from '../store/reporting-action';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';

const BIScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false); 
    const getSums = useSelector(state => state.reporting.ctgrAndSums);

   

    const dispatch = useDispatch();

    const loadData = useCallback(async () => {
     
        setError(null);
       setIsRefreshing(true);
        try {
          await dispatch(reportingActions.getSums()).then();
      
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
  
    if (isLoading){
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

    

    return (
        <View onPress={loadData}>
           <BI  categories={getSums}/>
        </View>
    
    )
};

BIScreen.navigationOptions = navData => {
    return {
      headerTitle: 'My Chart',
     headerLeft: (
        <HeaderButtons  HeaderButtonComponent={HeaderButton}>
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

export default BIScreen;