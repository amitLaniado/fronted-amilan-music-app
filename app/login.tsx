import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Image, View, Text, TextInput, Switch, Pressable } from "react-native";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";

export const LoginScreen = () => {
    const [isInSignIn, setIsInSignIn] = useState<boolean>(true);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.logoView}>
                <Image source={require('../assets/images/logo.png')} style={styles.image} />
                <Text style={styles.logoText}>amilan{"\n"}music</Text>
            </View>

            <View style={styles.selectOptionView}>
                <View>
                    <Text style={styles.selectOptionText} onPress={() => setIsInSignIn(true)}>SIGN IN</Text>
                    { isInSignIn && <View style={styles.underlineView} /> }
                </View>
                <View>
                    <Text style={styles.selectOptionText} onPress={() => setIsInSignIn(false)}>SIGN UP</Text>
                    { !isInSignIn && <View style={styles.underlineView} /> }
                </View>
            </View>

            <View style={styles.optionsView}>
                { isInSignIn ? <SignIn /> : <SignUp /> }
            </View>

            {/* <Text style={styles.underline}>TEST UNDERLINE</Text> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#000",
        flex: 1
    },
    logoView: {
        paddingTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image : {
        height : 90,
        width : 90
    },
    logoText: {
        color: "#fff",
        fontSize: 25,
        fontWeight : "bold",
    },
    selectOptionView: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 30,
        paddingTop: 20
    },
    selectOptionText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "500",
    },
    underlineView: { 
        width: "100%",
        height: 3,
        marginTop: 5,
        backgroundColor: 'green'
    },
    optionsView: {
        width: "80%",
    }
})
