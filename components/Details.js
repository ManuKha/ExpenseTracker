import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';

const Details = props => {


    return (
        <Card style={styles.orderItem}>

            <View style={styles.infoContainer}>
                <Text style={styles.categoryNm}>{props.categoryNm}</Text>

                <Button style={styles.deleteButton}
                    color={Colors.accent}
                    title="Delete"
                    onPress={props.onDelete}
                />
            </View>

            <View style={styles.summary}>
                <Text style={styles.description}>{props.desc}</Text>
                <Text style={styles.totalAmount}>${props.amount}</Text>
                <Text style={styles.dateStyle}>{props.date}</Text>
            </View>
        </Card>

    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    description: {
        fontSize: 16,
        //fontFamily: 'open-sans',
        color: '#888'
    },
    totalAmount: {
        // fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        // fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    },
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    deleteButton: {
        backgroundColor: Colors.navy
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    categoryNm: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    }
});

export default Details;
