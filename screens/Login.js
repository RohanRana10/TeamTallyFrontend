import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import COLORS from '../constants/colors';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BASE_URL } from '../utils/APIConstants';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useToast } from 'react-native-toast-notifications';


export default function Login() {
    const context = useContext(UserContext);
    const { saveUserData, saveUserToken } = context;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPassworVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const toast = useToast();

    let [fontsLoaded] = useFonts({
        "Outfit-Regular": require('../assets/fonts/Outfit-Regular.ttf'),
        "Pacifico-Regular": require('../assets/fonts/Pacifico-Regular.ttf'),
        "Outfit-Bold": require('../assets/fonts/Outfit-Bold.ttf'),
        "Outfit-Medium": require('../assets/fonts/Outfit-Medium.ttf'),
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let errors = {};
        if (!email) {
            errors.email = "Email is required!";
        }
        else if (!emailRegex.test(email)) {
            errors.email = "Email is required!";
        }
        if (!password) {
            errors.password = "Password is required!";
        }
        if (password.length < 6) {
            errors.password = "Password should be atleast 6 characters!";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const login = () => {
        setLoading(true);
        let url = `${BASE_URL}/auth/login`;
        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
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
                    saveUserToken(response.data.data.authToken);
                    saveUserData(response.data.data.user);
                    navigation.replace('Dashboard');
                    console.log(JSON.stringify(response.data.status.statusMessage));
                }

            })
            .catch((error) => {
                setLoading(false);
                console.log("error", error);
            });
    }

    const handleLogin = () => {
        if (validateForm()) {
            Keyboard.dismiss();
            login();
            setErrors({});
        }
    }

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} style={{ backgroundColor: COLORS.background, flex: 1 }}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
                    <View style={{ justifyContent: 'center', width: wp(100), alignItems: 'center', gap: SPACING.XL, height: hp(100) }}>
                        <View style={{ width: wp(90), justifyContent: 'space-between', gap: SPACING.M }}>
                            <Text style={{ color: COLORS.title, fontSize: hp(4.5), fontFamily: 'Pacifico-Regular' }}>
                                TeamTally
                            </Text>
                            {/* <Text style={{ width: wp(90), fontWeight: '400', fontSize: hp(3.1), color: COLORS.white, fontFamily: 'Outfit-Regular', marginTop: hp(8) }}>
                                Login to your account
                            </Text> */}
                            <Text style={{ width: wp(90), fontSize: hp(2), color: COLORS.gray, fontFamily: 'Outfit-Regular' }}>
                                Group up, Split Smart: Simplify Payments and Track Together!
                            </Text>
                        </View>

                        <View style={{ width: wp(100), alignItems: 'center' }}>
                            <View style={{ width: wp(90), height: hp(28.3), gap: SPACING.XL }}>
                                <View style={{ width: wp(90), gap: SPACING.M }}>
                                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                            Email
                                        </Text>
                                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                                            <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} />
                                            <TextInput
                                                autoCapitalize='none'
                                                selectionColor={COLORS.textHighlight}
                                                onChangeText={text => setEmail(text)}
                                                value={email}
                                                style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                                placeholder='Enter your email address'
                                                placeholderTextColor={COLORS.textDarker}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                            Password
                                        </Text>
                                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Ionicons name="key-outline" size={hp(2.4)} color={COLORS.textHighlight} style={{ paddingRight: SPACING.S }} />
                                                <TextInput
                                                    autoCapitalize='none'
                                                    selectionColor={COLORS.textHighlight}
                                                    onChangeText={text => setPassword(text)}
                                                    value={password}
                                                    secureTextEntry={!passwordVisible}
                                                    style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(65.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                                    placeholder='Password'
                                                    placeholderTextColor={COLORS.textDarker}
                                                />
                                            </View>
                                            <TouchableOpacity style={{}} onPress={() => setPassworVisible((prev) => !prev)}>
                                                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={hp(2.4)} color={COLORS.textDarker} style={{ paddingRight: SPACING.S }} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                    {(errors.email || errors.password) && <View style={{ flexDirection: 'row', gap: SPACING.S, alignItems: 'center' }}>
                                        <Feather name="alert-circle" size={hp(2)} color="red" />
                                        <Text style={{ color: 'red', fontSize: hp(1.7), fontFamily: 'Outfit-Regular' }}>Invalid Email or Password</Text>
                                    </View>}

                                </View>

                                {loading ?
                                    <View>
                                        <ActivityIndicator size={'large'} color={COLORS.textHighlight} />
                                    </View> :
                                    <TouchableOpacity onPress={handleLogin} style={{ width: wp(90), height: hp(5.41), backgroundColor: COLORS.bgHighlight, paddingHorizontal: hp(2), paddingVertical: hp(1.3), gap: SPACING.S, borderRadius: RADIUS.S }}>
                                        <Text style={{ alignSelf: 'center', fontSize: hp(2.1), fontWeight: '400', color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{ width: wp(90), marginTop: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp(2), color: COLORS.textDarker, fontFamily: 'Outfit-Regular' }}>
                                Don{'\''}t have an Account?&nbsp;
                            </Text>
                            <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                                <Text style={{ fontSize: hp(2), color: COLORS.bgHighlight, fontFamily: 'Outfit-Regular' }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})