import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../constants/colors';
import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';


export default function Dashboard({ navigation }) {
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
            <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: hp(1) }}>
                <View style={{ width: wp(90), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Pacifico-Regular', fontSize: hp(4), color: COLORS.textHighlight }}>
                        TeamTally
                    </Text>
                    <View style={{ width: wp(20), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => navigation.navigate('BarcodeScanner')}>
                            <Ionicons name="search" size={hp(3.2)} color={COLORS.textHighlight} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login', { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" })}>
                            <Image source={{ uri: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1721803893/cjgpyrqtry0debrehlkd.png" }} style={{ width: hp(4.5), height: hp(4.5), borderRadius: hp(100) }} />
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

                {groups.length === 0 ?
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
                            data={groups}
                            contentContainerStyle={{ gap: SPACING.L, paddingBottom: hp(15) }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Group')} style={{ width: wp(90), alignSelf: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', gap: SPACING.SM, alignItems: 'center' }}>
                                        <Image source={{ uri: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg" }} style={{ width: hp(15), height: hp(12), borderRadius: RADIUS.S }} />
                                        <View style={{ gap: SPACING.XS }}>
                                            <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.4) }}>
                                                Dharamshala
                                            </Text>
                                            <Text style={{ fontFamily: 'Outfit-Regular', fontSize: hp(2.0), color: COLORS.danger }}>
                                                You owe ₹2465.90
                                            </Text>
                                            <View style={{ gap: SPACING.XS }}>
                                                <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                    Saptorshi owes you <Text style={{ color: COLORS.success }}>₹2465.90</Text>
                                                </Text>
                                                <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                    You owe Amit <Text style={{ color: COLORS.danger }}>₹2465.90</Text>
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </>}
                {/* </ScrollView> */}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')} style={{ height: hp(6), backgroundColor: COLORS.bgHighlight, position: 'absolute', bottom: hp(5), right: wp(5), justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.M, borderRadius: RADIUS.XS }}>
                <View style={{ flexDirection: 'row', gap: SPACING.XS, alignItems: 'center' }}>
                    <Entypo name="plus" size={hp(3)} color={COLORS.black} />
                    <Text style={{ fontFamily: 'Outfit-Bold', fontSize: hp(2.1) }}>
                        New Group
                    </Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})