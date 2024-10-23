import { ActivityIndicator, Image, Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/APIConstants';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';


export default function Profile() {

    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("Rohan Rana");
    const [email, setEmail] = useState("rohanrana.mail@gmail.com")
    const [loading, setLoading] = useState(false);
    const [logoutButtonLoading, setLogoutButtonLoading] = useState(false);
    const [changesDone, setChangesDone] = useState(false);
    const [screenLoading, setScreenLoading] = useState(false);
    const [photoUploading, setPhotoUploading] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const toast = useToast();

    const validateForm = () => {
        let errors = {};
        if (!name) {
            errors.name = "Full name is required!"
        }
        if (name.length == 0) {
            errors.name = "Name cannot be empty!"
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const toHttps = (url) => {
        // Check if the URL starts with 'http://'
        if (url.startsWith('http://')) {
            // Replace 'http://' with 'https://'
            return url.replace('http://', 'https://');
        }
        // Return the original URL if it doesn't start with 'http://'
        return url;
    }

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
                sendImageToBackend(result.assets[0])
                // setImageUrl(result.assets[0].uri);
                setChangesDone(true);
            } else {
                console.log("upload cancelled")
            }
        } catch (error) {
            console.log("Error uploading image", error);
        }
    }

    const sendImageToBackend = (imageInfo) => {
        setPhotoUploading(true);
        setLoading(true);
        let data = new FormData();
        // console.log("hehe",imageInfo);
        data.append("image", {
            uri: imageInfo.uri,
            type: imageInfo.mimeType,
            name: imageInfo.fileName
        })
        let url = `${BASE_URL}/auth/get-image-url`
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.status.statusCode !== 1) {
                    setPhotoUploading(false);
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
                }
                else {
                    setPhotoUploading(false);
                    setLoading(false);
                    console.log(JSON.stringify(response.data.status.statusMessage));
                    setImageUrl(toHttps(response.data.data));
                }

            })
            .catch((error) => {
                console.log(error);
                setPhotoUploading(false);
                setLoading(false);
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

    const fetchProfileInfo = async () => {
        setScreenLoading(true);
        let url = `${BASE_URL}/screens/profile`
        let token = await AsyncStorage.getItem('authToken');
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
                }
                else {
                    setScreenLoading(false);
                    setProfileData(response.data.data);
                    setName(response.data.data.name);
                    setEmail(response.data.data.email);
                    setImageUrl(response.data.data.image ? toHttps(response.data.data.image) : "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1723301716/user-avatar-line-style-free-vector_wepybk.jpg");
                    console.log(JSON.stringify(response.data.status.statusMessage));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleLogout = async () => {
        setLogoutButtonLoading(true);
        await AsyncStorage.removeItem('authToken');
        navigation.replace('Login');
    }

    const updateProfile = async () => {
        setLoading(true);
        let url = `${BASE_URL}/auth/update-user`
        let token = await AsyncStorage.getItem('authToken');
        let data = JSON.stringify({
            "name": name,
            "image": imageUrl
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
                }
                else {
                    setLoading(false);
                    setChangesDone(false);
                    console.log(JSON.stringify(response.data.status.statusMessage));
                    toast.show(response.data.status.statusMessage, {
                        type: "normal",
                        placement: "bottom",
                        duration: 3000,
                        offset: 50,
                        animationType: "slide-in",
                        swipeEnabled: false
                    });
                    fetchProfileInfo();
                }

            })
            .catch((error) => {
                setLoading(false);
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

    const handleProfileChange = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            updateProfile();
            setErrors({});
        }
    }

    useEffect(() => {
        fetchProfileInfo();
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.background} />
            {screenLoading ?
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                    </View>
                </> :
                <>
                    <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row' }}>
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
                            <Image source={{ uri: imageUrl }} style={{ width: hp(20), height: hp(20), borderRadius: hp(100), backgroundColor: 'white', borderColor: "white", borderWidth: hp(0.4) }} />
                            <TouchableOpacity disabled={photoUploading} onPress={uploadImage} style={{ width: hp(6), height: hp(6), backgroundColor: COLORS.bgHighlight, borderRadius: hp(100), position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: hp(-1), right: 0 }}>
                                {photoUploading ? <ActivityIndicator size={'small'} color={'black'} /> : <Entypo name="camera" size={hp(2.5)} color={COLORS.black} />}
                            </TouchableOpacity>
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
                                    editable={false}
                                    selectionColor={COLORS.textHighlight}
                                    onChangeText={text => { setEmail(text); setChangesDone(true) }}
                                    value={email}
                                    style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                    placeholder='Enter email address'
                                    placeholderTextColor={COLORS.textDarker}
                                />
                            </View>
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

                        {errors.name && <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center', width: wp(90) }}>
                            <Feather name="alert-circle" size={hp(2)} color="red" />
                            <Text style={{ color: 'red', fontSize: hp(1.7), fontFamily: 'Outfit-Regular' }}>{errors.name}</Text>
                        </View>}

                        {!changesDone &&
                            <>
                                {logoutButtonLoading ?
                                    <View style={{ marginTop: hp(2), width: wp(90), alignItems: 'flex-start', paddingLeft: wp(3) }}>
                                        <ActivityIndicator size={'small'} color={COLORS.danger} />
                                    </View> :
                                    <View style={{ width: wp(90) }}>
                                        <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.XS, marginTop: hp(2) }}>
                                            <MaterialIcons name="exit-to-app" size={hp(3.5)} color={COLORS.danger} />
                                            <Text style={{ color: COLORS.danger, fontFamily: 'Outfit-SemiBold', fontSize: hp(2) }}>
                                                Logout
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </>
                        }



                        {changesDone &&
                            <>
                                {loading ?
                                    <View style={{ marginTop: hp(2) }}>
                                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                                    </View> :
                                    <TouchableOpacity onPress={handleProfileChange} style={{ width: wp(90), height: hp(5.41), backgroundColor: COLORS.bgHighlight, paddingHorizontal: hp(2), paddingVertical: hp(1.3), gap: SPACING.S, borderRadius: RADIUS.S, marginTop: hp(2) }}>
                                        <Text style={{ alignSelf: 'center', fontSize: hp(2.1), fontWeight: '400', color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                            Save Changes
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </>
                        }
                    </View>
                </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})