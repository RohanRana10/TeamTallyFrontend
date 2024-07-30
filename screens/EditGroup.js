import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import { Dropdown } from 'react-native-element-dropdown';
import RADIUS from '../constants/radius';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';

export default function EditGroup({ navigation }) {
    const [title, setTitle] = useState("Dharmashala");
    const [type, setType] = useState("friend");
    const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg");

    const typeData = [
        { label: 'Friends', value: 'friend' },
        { label: 'Couple', value: 'couple' },
        { label: 'Home', value: 'home' },
        { label: 'Others', value: 'other' },
    ];

    const uploadImage = async () => {
        let result = {};
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
            if (!result.canceled) {
                console.log(result);
                setImageUrl(result.assets[0].uri);
            } else {
                console.log("upload cancelled")
            }
        } catch (error) {
            console.log("Error uploading image");
        }
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
            <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'flex-start', marginLeft: wp(5.33), }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.bgSurfaceLighter, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10) }}>
                        <Ionicons name="chevron-back-outline" size={hp(2.4)} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.textHighlight, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.5), alignSelf: 'center', marginLeft: hp(2) }}>
                    Edit Group
                </Text>
            </View>

            <View style={{ alignSelf: 'center', borderRadius: hp(100) }}>
                <Image source={{ uri: imageUrl }} style={{ width: hp(20), height: hp(20), borderRadius: hp(100) }} />
                <TouchableOpacity onPress={uploadImage} style={{ width: hp(6), height: hp(6), backgroundColor: COLORS.bgHighlight, borderRadius: hp(100), position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: hp(-1), right: 0 }}>
                    <Entypo name="camera" size={hp(2.5)} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <View style={{ width: wp(100), alignItems: 'center', marginTop: hp(2), gap: SPACING.SM }}>
                <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                    <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                        Group Title
                    </Text>
                    <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>

                        <MaterialIcons name="title" size={hp(2.4)} color={COLORS.textHighlight} />
                        <TextInput
                            autoCapitalize='none'
                            selectionColor={COLORS.textHighlight}
                            onChangeText={text => setTitle(text)}
                            value={title}
                            style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                            placeholder='Enter Group Title'
                            placeholderTextColor={COLORS.textDarker}
                        />
                    </View>
                </View>
                <View style={{ gap: SPACING.S }}>
                    <Text style={{ color: COLORS.textDarker, fontWeight: '400', width: wp(23), height: hp(2.5), fontSize: hp(1.8), lineHeight: hp(2.8), fontFamily: 'Outfit-Regular' }}>
                        Group Type
                    </Text>
                    <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Fontisto name="blood-drop" size={hp(2.4)} color={COLORS.textDarker} /> */}
                        <MaterialCommunityIcons name="shape-outline" size={hp(2.4)} color={COLORS.textHighlight} />

                        <Dropdown
                            style={{ color: COLORS.textDarker, fontSize: hp(1.8), lineHeight: hp(2.8), width: wp(78), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            activeColor={COLORS.bgHighlight}
                            itemContainerStyle={{ borderRadius: RADIUS.S }}
                            data={typeData}
                            maxHeight={hp(20)}
                            labelField="label"
                            valueField="value"
                            placeholder="Group Type"
                            fontFamily='Outfit-Regular'
                            value={type}
                            onChange={item => {
                                setType(item.value);
                            }}
                            containerStyle={styles.containerStyle}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </View>


            <TouchableOpacity style={{ backgroundColor: COLORS.bgHighlight, borderRadius: RADIUS.XS, width: wp(90), height: hp(5), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: hp(5) }}>
                <Text style={{ fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                    Save Changes
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginTop: hp(1.5),
        height: hp(5),
        backgroundColor: 'white',
        borderRadius: hp(1.2),
        padding: hp(1),
    },
    item: {
        paddingHorizontal: hp(2),
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: hp(1.8),
        fontFamily: "Outfit-Regular",
        color: COLORS.textDarker
    },
    placeholderStyle: {
        fontSize: hp(1.8),
        fontFamily: "Outfit-Regular",
        color: COLORS.textDarker,
    },
    selectedTextStyle: {
        fontSize: hp(1.8),
        fontFamily: "Outfit-Regular",
        color: COLORS.textDarker,
        borderRadius: RADIUS.S
    },
    containerStyle: {
        backgroundColor: COLORS.background, borderRadius: RADIUS.S
    },
})