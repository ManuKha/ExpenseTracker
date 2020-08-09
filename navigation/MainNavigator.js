import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Button, View, Platform, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import CategoryListScreen from '../screens/CategoryListScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import BIScreen from '../screens/BIScreen';
import ReportingScreen from '../screens/ReportingScreen';
import StartupScreen from '../screens/StartupScreen'; 
import AuthScreen from '../screens/AuthScreen';
import * as authActions from '../store/auth/auth-action';
import Colors from '../constants/Colors';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  // headerTitleStyle: {
  //   fontFamily: 'open-sans-bold'
  // },
  // headerBackTitleStyle: {
  //   fontFamily: 'open-sans'
  // },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const ReportingNavigation = createStackNavigator({
    Reporting: ReportingScreen
});
const BINavigation = createStackNavigator({
  BI: BIScreen
});

const AllNavigation = createStackNavigator({
    Startup: StartupScreen,
    Auth: AuthScreen,
    CategoryList: CategoryListScreen,
    ItemDetail: ItemDetailScreen    
});

const MainNavigator = createDrawerNavigator(
  {
    Add: AllNavigation,
    View: ReportingNavigation,   
    MyChart: BINavigation
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
          
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1, paddingTop: 20}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <DrawerItems {...props} />
              <Text>  </Text>
              <Button title="Logout" color={Colors.primary} onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate('Auth');
              }} />
            </SafeAreaView>
        </View>
      );
    }
  }
 
);

export default createAppContainer(MainNavigator);