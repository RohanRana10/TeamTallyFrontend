import { ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import * as ImagePicker from 'expo-image-picker';


export default function Profile({ navigation }) {

    const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dyhwcqnzl/image/upload/v1721803893/cjgpyrqtry0debrehlkd.png");
    const [name, setName] = useState("Rohan Rana");
    const [email, setEmail] = useState("rohanrana.mail@gmail.com")
    const [loading, setLoading] = useState(false);
    const [changesDone, setChangesDone] = useState(false);

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
                setChangesDone(true);
            } else {
                console.log("upload cancelled")
            }
        } catch (error) {
            console.log("Error uploading image");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.background} />
            <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row', }}>
                <View style={{ alignItems: 'flex-start', marginLeft: wp(5.33), }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.bgSurfaceLighter, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10), }}>
                        <Ionicons name="chevron-back-outline" size={hp(2.4)} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.textHighlight, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.5), alignSelf: 'center', marginLeft: hp(2) }}>
                    Profile
                </Text>
            </View>

            <View style={{ width: wp(100), alignItems: 'center', marginTop: hp(2), gap: SPACING.SM }}>
                <View style={{ alignSelf: 'center', borderRadius: hp(100) }}>
                    <Image source={{ uri: imageUrl }} style={{ width: hp(20), height: hp(20), borderRadius: hp(100) }} />
                    <TouchableOpacity onPress={uploadImage} style={{ width: hp(6), height: hp(6), backgroundColor: COLORS.bgHighlight, borderRadius: hp(100), position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: hp(-1), right: 0 }}>
                        <Entypo name="camera" size={hp(2.5)} color={COLORS.black} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                    <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                        Name
                    </Text>
                    <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>

                        <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} />
                        <TextInput
                            autoCapitalize='none'
                            selectionColor={COLORS.textHighlight}
                            onChangeText={text => { setName(text); setChangesDone(true) }}
                            value={name}
                            style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                            placeholder='Enter Name'
                            placeholderTextColor={COLORS.textDarker}
                        />
                    </View>
                </View>

                <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                    <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                        Email
                    </Text>
                    <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                        {/* <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} /> */}
                        <MaterialCommunityIcons name="email-outline" size={hp(2.4)} color={COLORS.textHighlight} />
                        <TextInput
                            autoCapitalize='none'
                            selectionColor={COLORS.textHighlight}
                            onChangeText={text => { setEmail(text); setChangesDone(true) }}
                            value={email}
                            style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                            placeholder='Enter email address'
                            placeholderTextColor={COLORS.textDarker}
                        />
                    </View>
                </View>
                
                {changesDone &&
                        <>
                            {loading ?
                                <View style={{marginTop: hp(2)}}>
                                    <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                                </View> :
                                <TouchableOpacity onPress={() => { console.log("TODO: signup API call") }} style={{ width: wp(90), height: hp(5.41), backgroundColor: COLORS.bgHighlight, paddingHorizontal: hp(2), paddingVertical: hp(1.3), gap: SPACING.S, borderRadius: RADIUS.S, marginTop: hp(2) }}>
                                    <Text style={{ alignSelf: 'center', fontSize: hp(2.1), fontWeight: '400', color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                        Save Changes
                                    </Text>
                                </TouchableOpacity>
                            }
                        </>
                    }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})