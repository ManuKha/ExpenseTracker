import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
    Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';


import Input from '../components/Input';
import Colors from '../constants/Colors';
import * as itemActions from '../store/item-action';
import * as categoryActions from '../store/categoryName-action';
import HeaderButton from '../components/HeaderButton';

const ItemDetailScreen = props => {
    const [categoryItem, setCategoryItem] = useState('');
    const [categoryDesc, setCategoryDesc] = useState();
    const [categoryAmt, setCategoryAmt] = useState();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const categoryNmText = props.navigation.getParam('categoryNmText');

    const dispatch = useDispatch();

    const FORM_INPUT_UPDATE = 'UPDATE';
    
    const formReducer = (state, action) => {
        if (action.type === FORM_INPUT_UPDATE) {
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            };
            let updatedFormIsValid = true;
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                formIsValid: updatedFormIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            };
        }
        return state;
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);


    

    const saveCategory = (categoryNm) => {
        dispatch(categoryActions.addCategory(categoryNm));
  
    };

    



    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            category: categoryNmText ? categoryNmText : '',
            description: '',
            amount: ''
        },
        inputValidities: {
            category: categoryNmText ? true : false,
            description: false,
            amount: false
        },
        formIsValid: false
    }
    );

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])
            return;
        }
        setError(null);
        setIsLoading(true);
        saveCategory(formState.inputValues.category);
        
        try {
             await dispatch(
                itemActions.addItem(
                        formState.inputValues.category,
                        formState.inputValues.description,
                        formState.inputValues.amount
                    )

                );
           
        } catch (err) {
            setError(err.message);
        }
        props.navigation.goBack();
        setIsLoading(false);

    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);


    return (
        <KeyboardAvoidingView
            style={styles.form}
            behavior="padding"
            keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.mainView}>
                    <View style={styles.inputContainer}>
                        <Input
                            id='category'
                            label="Category:"
                            errorText="Please enter a valid Category!"
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                             initialValue={categoryNmText ? categoryNmText : ''}
                            initiallyValid={!!categoryNmText}
                            required
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            id='description'
                            value={categoryDesc}
                            label="Description:"
                            errorText="Please enter a valid description!"
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            multiline
                            numberOfLines={2}
                            onInputChange={inputChangeHandler}
                            initialValue={''}
                            initiallyValid={false}
                            required
                            minLength={3}
                        /></View>
                    <View style={styles.inputContainer}>
                        <Input
                            id='amount'
                            label="Amount"
                            value={categoryAmt}
                            errorText="Please enter a valid Amount!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    </View>
                    <Button style={styles.button}
                        title="Save"
                        color={Colors.primary}
                        onPress={submitHandler}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

ItemDetailScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
    headerTitle: 'Add item',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
           onPress={submitFn}
          />
        </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        flex: 1,
        padding: 10               
    },
    mainView: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: Colors.lime,
        borderWidth: 3
    },
    inputContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 2,
        padding: 15
    } 
});


export default ItemDetailScreen;