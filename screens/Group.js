import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import COLORS from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { BASE_URL } from '../utils/APIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { UserContext } from '../context/userContext';


export default function Group({ navigation }) {
    const route = useRoute();
    const context = useContext(UserContext);
    const { user } = context;
    const groupId = route.params?.groupId;
    const [groupCodeModalVisible, setGroupCodeModalVisible] = useState(false);
    const [screenLoading, setScreenLoading] = useState(true);
    const [groupData, setGroupData] = useState({});
    const [payments, setPayments] = useState([]);
    const toast = useToast();
    const [userId, setUserId] = useState([]);

    const fetchUserId = async () => {
        let temp = await AsyncStorage.getItem('userId');
        setUserId(temp);
        console.log("user id:", temp);
    }

    const formatDate = (isoString) => {
        // Create a Date object from the ISO string
        const date = new Date(isoString);

        // Get the year, month (0-based index), and day from the Date object
        const year = date.getFullYear();
        const day = date.getDate();

        // Array of month names
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Get the month name (adding 1 to the 0-based index)
        const monthName = months[date.getMonth()];

        // Return an object with the formatted date information
        return {
            year: year,
            month: monthName,
            day: day
        };
    }
    // let payments = [
    //     {
    //         "_id": "66a1fa169832df10e49d785f",
    //         "payer": {
    //             "_id": "66a0a7321fd21765e5e8f3a7",
    //             "name": "Rohan",
    //             "image": "http://res.cloudinary.com/dyhwcqnzl/image/upload/v1721804055/ucmrzglvafe3wiohn7ve.jpg",
    //             "email": "abc@gmail.com"
    //         },
    //         "description": "sample payment 1",
    //         "mode": "cash",
    //         "amount": 2000,
    //         "participants": [
    //             "66a0a7321fd21765e5e8f3a7",
    //             "669f8ef583086fb4bacc5da9"
    //         ],
    //         "Date": "2024-07-25T07:09:10.494Z"
    //     },
    //     {
    //         "_id": "66a1fc319832df10e49d7866",
    //         "payer": {
    //             "_id": "66a0a7321fd21765e5e8f3a7",
    //             "name": "Rohan",
    //             "image": "http://res.cloudinary.com/dyhwcqnzl/image/upload/v1721804055/ucmrzglvafe3wiohn7ve.jpg",
    //             "email": "abc@gmail.com"
    //         },
    //         "description": "sample payment 2",
    //         "mode": "cash",
    //         "amount": 1000,
    //         "participants": [
    //             "66a0a7321fd21765e5e8f3a7",
    //             "669f8ef583086fb4bacc5da9"
    //         ],
    //         "Date": "2024-07-25T07:18:09.071Z"
    //     },
    //     {
    //         "_id": "66a2012b7697d0b373b1dea4",
    //         "payer": {
    //             "_id": "669f8ef583086fb4bacc5da9",
    //             "name": "Amit",
    //             "email": "rohanrana@gmail.com"
    //         },
    //         "description": "sample payment updated",
    //         "mode": "UPI",
    //         "amount": 1000,
    //         "participants": [
    //             "66a0a7321fd21765e5e8f3a7",
    //             "669f8ef583086fb4bacc5da9"
    //         ],
    //         "Date": "2024-07-25T07:39:23.757Z"
    //     }
    // ];

    const getMonthName = (dateString) => {
        // Create a new Date object from the date string
        const date = new Date(dateString);
        // Array of month abbreviations
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        // Get the month index (0-based)
        const monthIndex = date.getMonth();
        // Return the abbreviated month name
        return months[monthIndex];
    }

    const getDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate();
    }

    const getYear = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    }

    const fetchGroupDetials = async () => {
        setScreenLoading(true);
        let url = `${BASE_URL}/groups/get-details`;
        let token = await AsyncStorage.getItem('authToken');
        console.log("group id", groupId);
        let data = JSON.stringify({
            "groupId": groupId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.status.statusCode !== 1) {
                    console.log(response.data.status.statusMessage);
                    toast.show(response.data.status.statusMessage, {
                        type: "normal",
                        placement: "bottom",
                        duration: 3000,
                        offset: 50,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                }
                else {
                    setScreenLoading(false);
                    setGroupData(response.data.data);
                    setPayments(response.data.data.group.payments);
                    console.log(response.data.data.members);
                    console.log(JSON.stringify(response.data.status.statusMessage));
                }
            })
            .catch((error) => {
                console.log(error);
                toast.show("Internal server error!", {
                    type: "normal",
                    placement: "bottom",
                    duration: 3000,
                    offset: 50,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
            });
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserId();
            fetchGroupDetials();
            console.log("user", user);
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
            {screenLoading ?
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                    </View>
                </> : <>
                    <ImageBackground source={{ uri: groupData?.group?.image ? groupData?.group?.image : 'https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg' }}
                        style={{ width: wp(100), height: hp(22), alignSelf: 'center', paddingHorizontal: hp(2), justifyContent: 'space-between', paddingTop: hp(2) }}
                        imageStyle={{ opacity: 0.40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.black, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10) }}>
                                    <Ionicons name="chevron-back-outline" size={hp(2.4)} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', gap: SPACING.L }}>
                                <TouchableOpacity onPress={() => { setGroupCodeModalVisible(true) }}>
                                    <AntDesign name="addusergroup" size={hp(3.5)} color={COLORS.textHighlight} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('GroupSettings', { groupData: groupData })}>
                                    <Feather name="settings" size={hp(3.5)} color={COLORS.textHighlight} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: wp(90), alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'Pacifico-Regular', color: COLORS.white, fontSize: hp(3.8) }}>
                                {(groupData?.group?.name)?.slice(0, 40)}{(groupData?.group?.name)?.length > 40 ? "..." : ""}
                            </Text>
                        </View>
                        {/* <View style={{width: hp(10), height: hp(10), position: 'absolute', bottom: -hp(4), right: hp(2) }}>
                    <Image source={{ uri: 'https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg' }} style={{ width: hp(10), height: hp(10), borderRadius: RADIUS.XS, borderWidth: hp(0.5), borderColor: COLORS.black }} />
                </View> */}
                    </ImageBackground>
                    <View style={{ width: wp(90), alignSelf: 'center', gap: SPACING.SM, marginTop: hp(2) }}>
                        {groupData?.totalSpends === 0 ?
                            <Text style={{ fontFamily: 'Outfit-Regular', fontSize: hp(2.0), color: COLORS.success }}>
                                No settlements required!
                            </Text> :
                            <Text style={{ fontFamily: 'Outfit-Regular', fontSize: hp(2.5), color: COLORS.danger }}>
                                {groupData?.totalSpends < 0 ? `You owe ₹${groupData?.totalSpends * -1}` : `You get back ₹${groupData?.totalSpends} `}
                            </Text>
                        }
                        <View style={{ gap: SPACING.S }}>
                            {/* <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                Saptorshi owes you <Text style={{ color: COLORS.success }}>₹2465.90</Text>
                            </Text>
                            <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                You owe Amit <Text style={{ color: COLORS.danger }}>₹2465.90</Text>
                            </Text> */}

                            {groupData?.settlements?.map((settlement) => {
                                return <Text key={settlement.id} style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                    {settlement.amount < 0 ? `You owe ${settlement.name}` : `${settlement.name} owes you`} <Text style={{ color: settlement.amount < 0 ? COLORS.danger : COLORS.success }}> ₹{settlement.amount < 0 ? settlement.amount * -1 : settlement.amount}</Text>
                                </Text>
                            })}
                            {/* <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                        Saptorshi owes you <Text style={{ color: COLORS.success }}>₹2465.90</Text>
                    </Text>
                    <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                        You owe Amit <Text style={{ color: COLORS.danger }}>₹2465.90</Text>
                    </Text>
                    <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                        Saptorshi owes you <Text style={{ color: COLORS.success }}>₹2465.90</Text>
                    </Text>
                    <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                        You owe Amit <Text style={{ color: COLORS.danger }}>₹2465.90</Text>
                    </Text> */}
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'black', width: wp(100), maxHeight: hp(58), marginTop: hp(2) }}>
                        <FlatList
                            data={payments}
                            contentContainerStyle={{ gap: SPACING.L, paddingBottom: hp(25) }}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { navigation.navigate('EditPayment', { paymentData: item, groupData: groupData }) }} style={{ backgroundColor: 'black', width: wp(90), height: hp(10), alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: SPACING.SM, }}>
                                        <View style={{ backgroundColor: 'black', width: hp(6), alignItems: 'center' }}>
                                            <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-Regular', fontSize: hp(1.5) }}>
                                                {getMonthName(item.Date)}
                                            </Text>
                                            <Text style={{ color: COLORS.textHighlight, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.5) }}>
                                                {getDate(item.Date)}
                                            </Text>
                                            <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                                {getYear(item.Date)}
                                            </Text>
                                        </View>
                                        <View>
                                            <Image style={{ width: hp(8), height: hp(8), borderRadius: RADIUS.S }} source={{ uri: 'https://t4.ftcdn.net/jpg/02/08/88/35/360_F_208883515_XG9vDSk3znNGZZ1QW26griAtYaymBaAZ.jpg' }} />
                                        </View>

                                        <View style={{ gap: SPACING.S, maxWidth: wp(38) }}>
                                            <Text style={{ fontFamily: 'Outfit-SemiBold', color: COLORS.textDarker, fontSize: hp(2) }}>
                                                {(item.description)}
                                            </Text>
                                            <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                                {item.payer.name} paid ₹{item.amount}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ gap: SPACING.XS, width: hp(8), justifyContent: 'center', alignItems: 'center' }}>
                                        {item.participants.includes(item.payer._id) && item.payer._id === userId ?
                                            <>
                                                <Text style={{ fontFamily: 'Outfit-Regular', color: COLORS.success, fontSize: hp(1.6), textAlign: 'center' }}>
                                                    You lent
                                                </Text>
                                                <Text style={{ color: COLORS.success, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                    ₹{(item.amount / item.participants.length) * (item.participants.length - 1)}
                                                </Text>
                                            </> : item.participants.includes(userId) ?
                                                <>
                                                    <Text style={{ fontFamily: 'Outfit-Regular', color: COLORS.danger, fontSize: hp(1.6), textAlign: 'center' }}>
                                                        You Owe
                                                    </Text>
                                                    <Text style={{ color: COLORS.danger, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                        ₹{(item.amount / item.participants.length)}
                                                    </Text>
                                                </> :
                                                <>
                                                    <Text style={{ fontFamily: 'Outfit-Regular', color: COLORS.success, fontSize: hp(1.6), textAlign: 'center' }}>
                                                        Didn't
                                                    </Text>
                                                    <Text style={{ color: COLORS.success, fontFamily: 'Outfit-Regular', fontSize: hp(1.5) }}>
                                                        Participate
                                                    </Text>
                                                </>
                                        }
                                        {/* {item.participants.includes(item.payer._id) && item.payer._id === userId ? <Text style={{ color: 'white' }}>Includes</Text> : <Text style={{ color: 'white' }}>Not</Text>} */}
                                    </View>
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CreatePayment', { groupData: groupData })} style={{ height: hp(6), backgroundColor: COLORS.bgHighlight, position: 'absolute', bottom: hp(5), right: wp(5), justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS }}>
                        <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center' }}>
                            {/* <Entypo name="plus" size={hp(3)} color={COLORS.black} /> */}
                            <FontAwesome5 name="receipt" size={hp(3)} color={COLORS.black} />
                            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                New Expense
                            </Text>
                        </View>
                    </TouchableOpacity>

                </>}

            <Modal
                transparent={true}
                visible={groupCodeModalVisible}
                animationType="fade"
                onRequestClose={() => setGroupCodeModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={{ top: hp(2), right: hp(2), position: 'absolute' }}>
                            <TouchableOpacity onPress={() => { setGroupCodeModalVisible(false) }} style={{ backgroundColor: COLORS.black, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10) }}>
                                <Entypo name="cross" size={hp(2.4)} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-SemiBold', fontSize: hp(3), marginTop: hp(2) }}>
                                Invite Friends
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                Make splitting bills a breeze — share this code and invite your friends to join this group!
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(4), color: COLORS.textHighlight }}>
                                {groupData?.group?.code}
                            </Text>
                        </View>
                        {/* <TouchableOpacity onPress={() => setGroupCodeModalVisible(false)} style={{ width: wp(55), height: hp(5.41), backgroundColor: COLORS.bgHighlight, paddingHorizontal: hp(2), paddingVertical: hp(1.3), gap: SPACING.S, borderRadius: RADIUS.S }}>
                            <Text style={{ alignSelf: 'center', fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                Save
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: wp(80),
        padding: SPACING.XXL,
        backgroundColor: COLORS.bgSurfaceLighter,
        borderRadius: RADIUS.S,
        // alignItems: 'center',
        gap: SPACING.SM
    },
})