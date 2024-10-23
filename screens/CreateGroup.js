import { ActivityIndicator, Image, Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RADIUS from '../constants/radius';
import SPACING from '../constants/spacing';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from '../utils/APIConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';


export default function CreateGroup({ navigation }) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [manualImageChange, setManualImageChange] = useState(false);
    const [photoUploading, setPhotoUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg");
    const toast = useToast();

    const typeData = [
        { label: 'Friends', value: 'Friends', image: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg" },
        { label: 'Couple', value: 'Couple', image: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775241/4366052_mxldlz.jpg" },
        { label: 'Home', value: 'Home', image: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775136/20945135_inalal.jpg" },
        { label: 'Others', value: 'Others', image: "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775103/2691166_okzcvk.jpg" },
    ];

    const validateForm = () => {
        let errors = {};
        if (!title) {
            errors.title = "Title is required!"
        }
        if (!type) {
            errors.type = "Type is required!"
        }
        if (title.length == 0) {
            errors.title = "Title cannot be empty!"
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const checkImageUrl = (url) => {
        // if (url == "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722065408/Team_of_business_people_putting_hands_up_together_nmiq6a.jpg"
        //     || url == "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775241/4366052_mxldlz.jpg"
        //     || url == "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775136/20945135_inalal.jpg" 
        //     || url == "https://res.cloudinary.com/dyhwcqnzl/image/upload/v1722775103/2691166_okzcvk.jpg"){

        //     }
        if (!manualImageChange) {
            setImageUrl(toHttps(url));
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
                    setImageUrl(response.data.data);
                    setImageUrl(toHttps(response.data.data));
                    setManualImageChange(true);
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
            } else {
                console.log("upload cancelled")
            }
        } catch (error) {
            console.log("Error uploading image");
        }
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

    const createGroup = async () => {
        setLoading(true);
        let url = `${BASE_URL}/groups/create`
        let token = await AsyncStorage.getItem('authToken');
        let data = JSON.stringify({
            "name": title,
            // "image": imageUrl,
            "image": toHttps(imageUrl),
            "type": type
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

    const handleCreateGroup = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            createGroup();
            setErrors({});
        }
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
            <View style={{ width: wp(100), height: hp(10), alignItems: 'center', flexDirection: 'row', }}>
                <View style={{ alignItems: 'flex-start', marginLeft: wp(5.33), }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.bgSurfaceLighter, width: hp(4), height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: hp(10), }}>
                        <Ionicons name="chevron-back-outline" size={hp(2.4)} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.textHighlight, fontFamily: 'Outfit-SemiBold', fontSize: hp(2.5), alignSelf: 'center', marginLeft: hp(2) }}>
                    Create Group
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

                {errors.title && <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center', width: wp(90) }}>
                    <Feather name="alert-circle" size={hp(2)} color="red" />
                    <Text style={{ color: 'red', fontSize: hp(1.7), fontFamily: 'Outfit-Regular' }}>{errors.title}</Text>
                </View>}

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
                                // setImageUrl(item.image);
                                checkImageUrl(item.image);
                            }}
                            containerStyle={styles.containerStyle}
                            renderItem={renderItem}
                        />
                    </View>
                </View>

                {errors.type && <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center', width: wp(90) }}>
                    <Feather name="alert-circle" size={hp(2)} color="red" />
                    <Text style={{ color: 'red', fontSize: hp(1.7), fontFamily: 'Outfit-Regular' }}>{errors.type}</Text>
                </View>}

                {loading ?
                    <View style={{ marginTop: hp(2) }}>
                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                    </View> :
                    <TouchableOpacity onPress={handleCreateGroup} style={{ backgroundColor: COLORS.bgHighlight, borderRadius: RADIUS.XS, width: wp(90), height: hp(5), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp(5) }}>
                        <Text style={{ fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                            Create
                        </Text>
                    </TouchableOpacity>
                }
            </View>
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