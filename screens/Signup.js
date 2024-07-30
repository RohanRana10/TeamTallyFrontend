import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPassworVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPassworVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        "Outfit-Regular": require('../assets/fonts/Outfit-Regular.ttf'),
        "Pacifico-Regular": require('../assets/fonts/Pacifico-Regular.ttf'),
        "Outfit-Bold": require('../assets/fonts/Outfit-Bold.ttf'),
        "Outfit-Medium": require('../assets/fonts/Outfit-Medium.ttf'),
    });

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
                            <View style={{ width: wp(90), gap: SPACING.XL }}>
                                <View style={{ width: wp(90), gap: SPACING.M }}>
                                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                            Full Name
                                        </Text>
                                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                                            <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} />
                                            <TextInput
                                                autoCapitalize='none'
                                                selectionColor={COLORS.textHighlight}
                                                onChangeText={text => setName(text)}
                                                value={name}
                                                style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                                placeholder='Enter full name'
                                                placeholderTextColor={COLORS.textDarker}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8),  fontFamily: 'Outfit-Regular' }}>
                                            Email
                                        </Text>
                                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                                            {/* <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} /> */}
                                            <MaterialCommunityIcons name="email-outline" size={hp(2.4)} color={COLORS.textHighlight} />
                                            <TextInput
                                                autoCapitalize='none'
                                                selectionColor={COLORS.textHighlight}
                                                onChangeText={text => setEmail(text)}
                                                value={email}
                                                style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                                placeholder='Enter email address'
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
                                                    placeholder='Enter password'
                                                    placeholderTextColor={COLORS.textDarker}
                                                />
                                            </View>
                                            <TouchableOpacity style={{}} onPress={() => setPassworVisible((prev) => !prev)}>
                                                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={hp(2.4)} color={COLORS.textDarker} style={{ paddingRight: SPACING.S }} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                                            Confirm Password
                                        </Text>
                                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Ionicons name="key-outline" size={hp(2.4)} color={COLORS.textHighlight} style={{ paddingRight: SPACING.S }} />
                                                <TextInput
                                                    autoCapitalize='none'
                                                    selectionColor={COLORS.textHighlight}
                                                    onChangeText={text => setConfirmPassword(text)}
                                                    value={confirmPassword}
                                                    secureTextEntry={!confirmPasswordVisible}
                                                    style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(65.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                                    placeholder='Confirm Password'
                                                    placeholderTextColor={COLORS.textDarker}
                                                />
                                            </View>
                                            <TouchableOpacity style={{}} onPress={() => setConfirmPassworVisible((prev) => !prev)}>
                                                <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={hp(2.4)} color={COLORS.textDarker} style={{ paddingRight: SPACING.S }} />
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
                                    <TouchableOpacity onPress={() => { console.log("TODO: signup API call") }} style={{ width: wp(90), height: hp(5.41), backgroundColor: COLORS.bgHighlight, paddingHorizontal: hp(2), paddingVertical: hp(1.3), gap: SPACING.S, borderRadius: RADIUS.S }}>
                                        <Text style={{ alignSelf: 'center', fontSize: hp(2.1), fontWeight: '400', color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                                            Signup
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{ width: wp(90), marginTop: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp(2), color: COLORS.textDarker, fontFamily: 'Outfit-Regular' }}>
                                Already have an Account?&nbsp;
                            </Text>
                            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                                <Text style={{ fontSize: hp(2), color: COLORS.bgHighlight, fontFamily: 'Outfit-Regular' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})