
import React, { Component } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { View, Text, Dimensions, Button } from "react-native";
import * as reportingActions from '../store/reporting-action';

const BI = props => {

    const getdata = props.categories
    var ct = getdata.map(function(item) {
       
        return {
          categoryNm: item.categoryNm
          
        };
        
      });
   
      const categNm = [];
      const totals = [];
      for (let userObject of getdata) {
        categNm.push(userObject.categoryNm)
        totals.push(userObject.total)
     
    }
      

    return (
        <View>
            <BarChart
                data={{
                    labels: categNm,
                    datasets: [
                        {
                            data: totals
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={480}
                yAxisLabel={"$"}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    // propsForDots: {
                    //     r: "6",
                    //     strokeWidth: "2",
                    //     stroke: "#ffa726"
                    // }
                }}
                //bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
         </View>
    );
};


export default BI;

