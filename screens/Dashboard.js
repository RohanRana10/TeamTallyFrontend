import { ActivityIndicator, FlatList, Image, Keyboard, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../constants/colors';
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import { UserContext } from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/APIConstants';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


export default function Dashboard({ navigation }) {

    const context = useContext(UserContext);
    const { user } = context;
    const [groups, setGroups] = useState([
        { id: '1', title: 'First Item' },
        { id: '2', title: 'Second Item' },
        { id: '3', title: 'Third Item' },
        { id: '4', title: 'Fourth Item' },
        // { id: '5', title: 'Fifth Item' },
        // { id: '6', title: 'Fifth Item' },
        // { id: '7', title: 'Fifth Item' },
        // { id: '8', title: 'Fifth Item' },
        // { id: '9', title: 'Fifth Item' },
        // { id: '10', title: 'Fifth Item' },
    ]);
    const toast = useToast();
    const [modalVisible, setModalVisible] = useState(false);
    const [joinGroupModalVisible, setJoinGroupModalVisible] = useState(false);
    const [joinMode, setJoinMode] = useState(false);
    const [groupCode, setGroupCode] = useState("");
    const [screenLoading, setScreenLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setJoinMode(false);
    };

    const validateForm = () => {
        let errors = {};
        if (!groupCode) {
            errors.groupCode = "Group code is required!"
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const fetchDashboardDetails = async () => {
        setScreenLoading(true);
        let token = await AsyncStorage.getItem('authToken');
        let url = `${BASE_URL}/screens/dashboard`
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'auth-token': token
            }
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
                    navigation.replace('Login');
                }
                else {
                    setScreenLoading(false);
                    setDashboardData(response.data.data);
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

    const joinGroup = async () => {
        setLoading(true);
        let url = `${BASE_URL}/groups/add-member`
        let token = await AsyncStorage.getItem('authToken');
        let data = JSON.stringify({
            "code": groupCode
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
                    setLoading(false);
                    console.log(response.data.status.statusMessage);
                    toast.show(response.data.status.statusMessage, {
                        type: "normal",
                        placement: "bottom",
                        duration: 3000,
                        offset: 50,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    navigation.replace('Dashboard');
                }
                else {
                    setLoading(false);
                    console.log(response.data.status.statusMessage);
                    toast.show(response.data.status.statusMessage, {
                        type: "normal",
                        placement: "bottom",
                        duration: 3000,
                        offset: 50,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    navigation.replace('Dashboard');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.show("Internal server error", {
                    type: "normal",
                    placement: "bottom",
                    duration: 3000,
                    offset: 50,
                    animationType: "slide-in",
                    swipeEnabled: false
                });
            });
    }

    const handleJoinGroup = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            joinGroup();
            setErrors({});
        }
    }

    // useEffect(() => {
    //     // console.log(user.image);
    //     fetchDashboardDetails();
    // }, [])

    useFocusEffect(
        useCallback(() => {
            fetchDashboardDetails();
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
                    <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: hp(1) }}>
                        <View style={{ width: wp(90), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Pacifico-Regular', fontSize: hp(4), color: COLORS.textHighlight }}>
                                TeamTally
                            </Text>
                            <View style={{ width: wp(20), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                                <TouchableOpacity onPress={() => console.log("Search button pressed")}>
                                    <Ionicons name="search" size={hp(3.2)} color={COLORS.textHighlight} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('Profile', { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" })}>
                                    <Image source={{ uri: dashboardData?.userImage ? dashboardData?.userImage : "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1721803893/cjgpyrqtry0debrehlkd.png" }} style={{ width: hp(4.5), height: hp(4.5), borderRadius: hp(100) }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={{ width: wp(90), alignSelf: 'center', marginBottom: hp(1) }}>
                        <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-SemiBold', fontSize: hp(3) }}>
                            Your Groups
                        </Text>
                    </View>

                    <View style={{ width: wp(100), height: hp(78), backgroundColor: 'black' }}>
                        {/* <ScrollView contentContainerStyle={{ gap: SPACING.M, paddingBottom: hp(10) }}> */}

                        {dashboardData?.groups?.length === 0 ?
                            <>
                                <View style={{ width: wp(100), height: hp(65), justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/groupImage.png')} style={{ width: hp(8), height: hp(8), marginBottom: hp(1) }} />
                                    <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-Regular', fontSize: hp(1.8) }}>
                                        No groups found!
                                    </Text>
                                </View>
                            </> :
                            <>
                                <FlatList
                                    data={dashboardData.groups}
                                    contentContainerStyle={{ gap: SPACING.L, paddingBottom: hp(15) }}
                                    keyExtractor={item => item?.groupDetails?._id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('Group', { groupId: item?.groupDetails?._id })} style={{ width: wp(90), alignSelf: 'center', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', gap: SPACING.SM, alignItems: 'center' }}>
                                                <Image source={{ uri: item?.groupDetails?.image ? item?.groupDetails?.image : "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg" }} style={{ width: hp(15), height: hp(12), borderRadius: RADIUS.S }} />
                                                <View style={{ gap: SPACING.XS, }}>
                                                    <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.4), width: wp(52) }}>
                                                        {item.groupDetails.name}
                                                    </Text>
                                                    {item.totalSpends === 0 ?
                                                        <Text style={{ fontFamily: 'Outfit-Regular', fontSize: hp(2.0), color: COLORS.success }}>
                                                            No settlements required!
                                                        </Text> :
                                                        <Text style={{ fontFamily: 'Outfit-Regular', fontSize: hp(2.0), color: item.totalSpends < 0 ? COLORS.danger : COLORS.success }}>
                                                            {item.totalSpends < 0 ? `You owe ₹${item.totalSpends * -1}` : `You get back ₹${item.totalSpends}`}
                                                        </Text>}
                                                    <View style={{ gap: SPACING.XS }}>
                                                        {item?.settlements?.map((settlement) => {
                                                            return <Text key={settlement.id} style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                                {settlement.amount < 0 ? `You owe ${settlement.name}` : `${settlement.name} owes you`} <Text style={{ color: settlement.amount < 0 ? COLORS.danger : COLORS.success }}> ₹{settlement.amount < 0 ? settlement.amount * -1 : settlement.amount}</Text>
                                                            </Text>
                                                        })}
                                                        {/* <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                            Saptorshi owes you <Text style={{ color: COLORS.success }}>₹2465.90</Text>
                                                        </Text>
                                                        <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                            You owe Amit <Text style={{ color: COLORS.danger }}>₹2465.90</Text>
                                                        </Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </>}
                        {/* </ScrollView> */}
                    </View>

                    <TouchableOpacity onPress={toggleModal} style={{ height: hp(6), backgroundColor: COLORS.bgHighlight, position: 'absolute', bottom: hp(5), right: wp(5), justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS }}>
                        <View style={{ flexDirection: 'row', gap: SPACING.XS, alignItems: 'center' }}>
                            <Entypo name="plus" size={hp(3)} color={COLORS.black} />
                            <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                New Group
                            </Text>
                        </View>
                    </TouchableOpacity>

                </>}

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>

                        <View style={{ width: wp(90), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: hp(10) }}>
                            <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-SemiBold', fontSize: hp(3) }}>{joinMode ? "Join Group" : "New Group"}</Text>
                            <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: COLORS.black, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10) }}>
                                <Entypo name="cross" size={hp(2.4)} color="white" />
                            </TouchableOpacity>
                        </View>

                        {!joinMode &&
                            <View style={{ width: wp(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { toggleModal(); navigation.navigate('CreateGroup'); }} style={{ width: wp(43), backgroundColor: COLORS.bgHighlight, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS, height: hp(6) }}>
                                    <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                        Create
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setJoinMode(true) }} style={{ width: wp(43), backgroundColor: COLORS.bgHighlight, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS, height: hp(6) }}>
                                    <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                        Join
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {joinMode &&
                            <View style={{ width: wp(90), gap: SPACING.M }}>
                                <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                    <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                        Group Code
                                    </Text>
                                    <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.background, flexDirection: 'row', alignItems: 'center' }}>

                                        {/* <MaterialIcons name="title" size={hp(2.4)} color={COLORS.textHighlight} /> */}
                                        <MaterialIcons name="password" size={hp(2.4)} color={COLORS.textHighlight} />
                                        <TextInput
                                            autoCapitalize='none'
                                            selectionColor={COLORS.textHighlight}
                                            onChangeText={text => setGroupCode(text)}
                                            value={groupCode}
                                            style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                            placeholder='Enter group code'
                                            placeholderTextColor={COLORS.textDarker}
                                        />
                                    </View>
                                </View>

                                {errors.groupCode && <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center', width: wp(90) }}>
                                    <Feather name="alert-circle" size={hp(2)} color="red" />
                                    <Text style={{ color: 'red', fontSize: hp(1.7), fontFamily: 'Outfit-Regular' }}>{errors.groupCode}</Text>
                                </View>}

                                {loading ?
                                    <View style={{ marginTop: hp(1) }}>
                                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                                    </View> :
                                    <TouchableOpacity onPress={handleJoinGroup} style={{ backgroundColor: COLORS.bgHighlight, borderRadius: RADIUS.XS, width: wp(90), height: hp(5), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp(1) }}>
                                        <Text style={{ fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                            Join
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }

                    </View>
                </View>
            </Modal>

            {/* <Modal
                transparent={true}
                visible={joinGroupModalVisible}
                animationType="slide"
                onRequestClose={() => setJoinGroupModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>

                        <View style={{ width: wp(90), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: hp(10) }}>
                            <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-SemiBold', fontSize: hp(3) }}>New Group</Text>
                            <TouchableOpacity onPress={() => setJoinGroupModalVisible(false)} style={{ backgroundColor: COLORS.black, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10) }}>
                                <Entypo name="cross" size={hp(2.4)} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: wp(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { toggleModal(); navigation.navigate('CreateGroup'); }} style={{ width: wp(43), backgroundColor: COLORS.bgHighlight, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS, height: hp(6) }}>
                                <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                    Create
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { toggleModal(); }} style={{ width: wp(43), backgroundColor: COLORS.bgHighlight, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS, height: hp(6) }}>
                                <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                                    Join
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 50% translucent background
    },
    modalContainer: {
        width: wp(100),
        backgroundColor: COLORS.bgSurfaceLighter,
        borderTopRightRadius: RADIUS.L,
        borderTopLeftRadius: RADIUS.L,
        alignItems: 'center',
        paddingBottom: hp(5)
    },
})