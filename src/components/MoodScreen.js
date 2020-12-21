import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { DataTable, Appbar, Paragraph} from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import { getMoods } from '../sources/MoodSources';
import moment from 'moment';


const MoodScreen = ({route}) => {
    let [data, setData] = useState([]);
    let [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const moodReducer = useSelector(state => state.moodReducer.getmoods);
    
    function handleDisplayFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("No Mood Log yet");
        }
    }

    useEffect(() => {
        dispatch(getMoods(route.params.id, handleDisplayFail));
    }, [])

    useEffect(() => {
        if(moodReducer.isSuccess == true){
            setData(moodReducer.data.mood)
        }
    }, [moodReducer.isLoading])


    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title={route.params.fullName + "'s Mood Log"} style={{marginLeft:0}} />
            </Appbar.Header>


            <ScrollView>
                <DataTable style={{marginTop:20, padding:10}}>
                    <DataTable.Header>
                        <DataTable.Title style={{flex:2}}>Date</DataTable.Title>
                        <DataTable.Title>Mood</DataTable.Title>
                        <DataTable.Title numeric>Sentiment</DataTable.Title>
                    </DataTable.Header>

                    {data.length == 0 && <Paragraph style={styles.message}>
                        You donot have any Mood Log
                    </Paragraph>}

                    {moodReducer.isSuccess && data.map((row, i) => {
                        return(
                            <DataTable.Row key={i} style={{backgroundColor: i%2 == 0 ? "#ddd" : "#fff"}}>
                                <DataTable.Cell  style={{flex:2}} >{moment(row.createdAt).format("Do MMM, h:mm a")}</DataTable.Cell>
                                <DataTable.Cell>{row.mood}</DataTable.Cell>
                                <DataTable.Cell numeric>{row.score}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
                    
                </DataTable>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    message: {
        marginTop: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    }
})

export default MoodScreen;