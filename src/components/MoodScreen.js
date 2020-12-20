import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { DataTable, Appbar } from "react-native-paper"
import { useSelector } from "react-redux";


const MoodScreen = ({route}) => {
    let data = [
        {date: "23rd Dec 5:30pm", mood: "happy", sent: 0.4},
        {date: "23rd Dec 5:30pm", mood: "sad", sent: 0.3},
        {date: "23rd Dec 5:30pm", mood: "crying", sent: -1}
    ]

    const navigator = useNavigation();

    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title={route.params.fullName + "'s Mood Log"} style={{marginLeft:0}} />
            </Appbar.Header>



            <DataTable style={{marginTop:20, padding:10}}>
                <DataTable.Header>
                    <DataTable.Title style={{flex:2}}>Date</DataTable.Title>
                    <DataTable.Title>Mood</DataTable.Title>
                    <DataTable.Title numeric>Sentiment</DataTable.Title>
                </DataTable.Header>

                {data.map((row, i) => {
                    return(
                        <DataTable.Row style={{backgroundColor: i%2 == 0 ? "#ddd" : "#fff"}}>
                            <DataTable.Cell key={i} style={{flex:2}} >{row.date}</DataTable.Cell>
                            <DataTable.Cell>{row.mood}</DataTable.Cell>
                            <DataTable.Cell numeric>{row.sent}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
                
                
            </DataTable>
        </View>
    )
}

export default MoodScreen;