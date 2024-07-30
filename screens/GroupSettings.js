import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RADIUS from '../constants/radius';
import SPACING from '../constants/spacing';

export default function GroupSettings({ navigation }) {

    let members = [
        {
            "_id": "66a0a7321fd21765e5e8f3a7",
            "name": "Rohan",
            "image": "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1721803893/cjgpyrqtry0debrehlkd.png",
            "email": "abc@gmail.com",
            "Date": "2024-07-24T07:03:14.806Z"
        },
        {
            "_id": "669f8ef583086fb4bacc5da9",
            "name": "Amit",
            "email": "rohanrana@gmail.com",
            "Date": "2024-07-23T11:07:33.267Z",
            "image": "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1721803893/cjgpyrqtry0debrehlkd.png",
        }
    ];

    const getDate = (dateStr) => {
        // Create a Date object from the input string
        const date = new Date(dateStr);

        // Options for formatting the date
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };

        // Format the date using toLocaleDateString with the specified options
        return date.toLocaleDateString('en-GB', options);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />

            <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row', }}>
                <View style={{ alignItems: 'flex-start', marginLeft: wp(5.33) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.bgSurfaceLighter, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10), }}>
                        <Ionicons name="chevron-back-outline" size={hp(2.4)} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.textHighlight, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.5), marginLeft: hp(2) }}>
                    Group Settings
                </Text>
            </View>
            <View style={{ width: wp(100), height: hp(85), gap: SPACING.M }}>
                <ScrollView contentContainerStyle={{ gap: SPACING.M, paddingBottom: hp(20) }}>

                    <View style={{ width: wp(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.SM }}>
                            <View>
                                <Image source={{ uri: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg" }} style={{ width: hp(13), height: hp(10), borderRadius: RADIUS.S }} />
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Pacifico-Regular', color: COLORS.textHighlight, fontSize: hp(2.4) }}>
                                    Dharmashala
                                </Text>
                                <Text style={{ fontFamily: 'Outfit-SemiBold', color: COLORS.textDarker, fontSize: hp(2) }}>
                                    Trip
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('EditGroup')}>
                            <Feather name="edit-3" size={hp(3)} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: wp(90), alignSelf: 'center', marginTop: hp(2) }}>
                        <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-Regular' }}>
                            Created by Amit Pathania on &nbsp;
                            <Text style={{ color: COLORS.textHighlight }}>
                                {getDate('2024-07-24T10:37:43.635Z')}
                            </Text>
                        </Text>
                    </View>

                    <View style={{ width: wp(90), alignSelf: 'center', gap: SPACING.M }}>
                        <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-Bold', fontSize: hp(3) }}>
                            Members
                        </Text>

                        <View style={{ gap: SPACING.M }}>
                            {members.map((member) => {
                                return (
                                    <View style={{ width: wp(90), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.SM, }}>
                                            <View>
                                                <Image source={{ uri: member.image }} style={{ width: hp(6), height: hp(6), borderRadius: hp(100) }} />
                                            </View>
                                            <View style={{ gap: SPACING.XXS }}>
                                                <Text style={{ color: COLORS.textBase, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.2) }}>
                                                    {member.name}
                                                </Text>
                                                <Text style={{ color: COLORS.textDarker, fontFamily: 'Outfit-Regular', fontSize: hp(2) }}>
                                                    {member.email}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ gap: SPACING.XS, width: hp(8), justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'Outfit-Regular', color: COLORS.success, fontSize: hp(1.6), textAlign: 'center' }}>
                                                You lent
                                            </Text>
                                            <Text style={{ color: COLORS.success, fontFamily: 'Outfit-Regular', fontSize: hp(1.6) }}>
                                                ₹2000
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.XS, marginTop: hp(2) }}>
                            <MaterialIcons name="exit-to-app" size={hp(3.5)} color={COLORS.danger} />
                            <Text style={{ color: COLORS.danger, fontFamily: 'Outfit-SemiBold', fontSize: hp(2) }}>
                                Leave Group
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})