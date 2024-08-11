import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {

    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    // const context = useContext(UserContext);
    // const {  } = context;

    const handleRedirection = async () => {
        let authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
            navigation.replace('Dashboard');
        } else {
            navigation.replace('Login');
        }
        console.log("Available authToken : ", authToken);
    }

    useEffect(() => {

        setTimeout(() => {
            handleRedirection();
        }, 2500);
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: hp(1), right: hp(1) }}>
                <ActivityIndicator size={'small'} color={COLORS.textHighlight} />
            </View>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
            <Text style={{ color: COLORS.textHighlight, fontFamily: 'Pacifico-Regular', fontSize: hp(4.5) }}>
                TeamTally
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    }
})