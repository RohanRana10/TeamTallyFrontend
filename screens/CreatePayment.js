import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SPACING from '../constants/spacing';
import RADIUS from '../constants/radius';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function CreatePayment({ navigation }) {

    const [description, setDescription] = useState("");
    const [payer, setPayer] = useState("");
    const [selected, setSelected] = useState([]);
    const [amount, setAmount] = useState("");

    let payerData = [
        { label: 'Amit Pathania', value: '12' },
        { label: 'Abhishek', value: '24' },
        { label: 'Rohan Rana', value: '56' },
        { label: 'Saptorshi', value: '78' },
    ]

    const data = [
        { label: 'Amit Pathania', value: '12' },
        { label: 'Abhishek', value: '24' },
        { label: 'Rohan Rana', value: '56' },
        { label: 'Saptorshi', value: '78' },
    ];

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
                    New Expense
                </Text>
            </View>

            <View style={{ width: wp(100), alignItems: 'center', marginTop: hp(2), gap: SPACING.SM, height: hp(80) }}>

                <ScrollView contentContainerStyle={{gap: SPACING.SM, paddingBottom: hp(10)}}>

                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                            Description
                        </Text>
                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>

                            <MaterialIcons name="title" size={hp(2.4)} color={COLORS.textHighlight} />
                            <TextInput
                                autoCapitalize='none'
                                selectionColor={COLORS.textHighlight}
                                onChangeText={text => setDescription(text)}
                                value={description}
                                style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                placeholder='Payment Description'
                                placeholderTextColor={COLORS.textDarker}
                            />
                        </View>
                    </View>


                    <View style={{ width: wp(90), height: hp(9.1), gap: SPACING.S }}>
                        <Text style={{ color: COLORS.textDarker, fontSize: hp(1.8), fontFamily: 'Outfit-Regular' }}>
                            Amount
                        </Text>
                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>

                            <FontAwesome name="rupee" size={hp(2.4)} color={COLORS.textHighlight} />
                            <TextInput
                                autoCapitalize='none'
                                keyboardType='number-pad'
                                selectionColor={COLORS.textHighlight}
                                onChangeText={text => {setAmount(text)}}
                                value={amount}
                                style={{ color: COLORS.textDarker, fontWeight: '400', fontSize: hp(1.8), width: wp(76.5), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                placeholder='Enter Amount'
                                placeholderTextColor={COLORS.textDarker}
                            />
                        </View>
                    </View>
                    

                    <View style={{ gap: SPACING.S }}>
                        <Text style={{ color: COLORS.textDarker, fontWeight: '400', width: wp(23), height: hp(2.5), fontSize: hp(1.8), lineHeight: hp(2.8), fontFamily: 'Outfit-Regular' }}>
                            Paid By
                        </Text>
                        <View style={{ width: wp(90), height: hp(5.54), borderRadius: RADIUS.S, padding: SPACING.S, gap: SPACING.S, backgroundColor: COLORS.bgSurfaceLighter, flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="user" size={hp(2.4)} color={COLORS.textHighlight} />
                            <Dropdown
                                style={{ color: COLORS.textDarker, fontSize: hp(1.8), lineHeight: hp(2.8), width: wp(78), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                activeColor={COLORS.bgHighlight}
                                itemContainerStyle={{ borderRadius: RADIUS.S }}
                                data={payerData}
                                maxHeight={hp(20)}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Payer"
                                fontFamily='Outfit-Regular'
                                value={payer}
                                onChange={item => {
                                    setPayer(item.value);
                                }}
                                containerStyle={styles.containerStyle}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>


                    <View style={{ gap: SPACING.S, width: wp(90), alignSelf: 'center', marginTop: hp(2) }}>

                        <MultiSelect
                            style={{ color: COLORS.textDarker, fontSize: hp(2.8), lineHeight: hp(2.8), width: wp(50), height: hp(2.5), fontFamily: 'Outfit-Regular' }}
                            placeholderStyle={styles.multiSelectPlaceholderStyle}
                            selectedTextStyle={styles.multiSelectSelectedTextStyle}
                            activeColor={COLORS.bgHighlight}
                            itemContainerStyle={{ borderRadius: RADIUS.S }}
                            // iconStyle={styles.miconStyle}
                            // search
                            data={data}
                            labelField="label"
                            maxHeight={hp(20)}
                            valueField="value"
                            fontFamily='Outfit-Regular'
                            placeholder="Select Participants"
                            containerStyle={styles.containerStyle}
                            // searchPlaceholder="Search..."
                            value={selected}
                            onChange={item => {
                                setSelected(item);
                            }}
                            selectedStyle={styles.mselectedStyle}
                            renderItem={renderItem}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: COLORS.bgHighlight, borderRadius: RADIUS.XS, width: wp(90), height: hp(5), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: hp(5) }}>
                    <Text style={{ fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                        Create
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={{ backgroundColor: COLORS.bgHighlight, borderRadius: RADIUS.XS, width: wp(90), height: hp(5), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: hp(5) }}>
                <Text style={{ fontSize: hp(2.1), color: COLORS.black, fontFamily: 'Outfit-Bold' }}>
                    Save
                </Text>
            </TouchableOpacity> */}
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
    multiSelectSelectedTextStyle: {
        fontSize: hp(1.8),
        fontFamily: "Outfit-Regular",
        color: COLORS.textHighlight,
        borderRadius: RADIUS.S, borderColor: COLORS.bgHighlight
    },
    containerStyle: {
        backgroundColor: COLORS.background, borderRadius: RADIUS.S
    },


    mdropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    multiSelectPlaceholderStyle: {
        fontSize: hp(1.8),
        fontFamily: "Outfit-Regular",
        color: COLORS.textDarker,
    },
    mselectedTextStyle: {
        fontSize: 14,
    },
    miconStyle: {
        width: 20,
        height: 20,
    },
    minputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    micon: {
        marginRight: 5,
    },
    mselectedStyle: {
        borderRadius: RADIUS.S,
        backgroundColor: COLORS.black,
        borderColor: COLORS.bgHighlight
    },
    mtextSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
})