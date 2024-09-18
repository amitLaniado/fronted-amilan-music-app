import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { register } from "@/api"; 
import { user } from "@/User";

export const SignUp = () => {
    const [username, setUsername] =  useState<string>("");
    const [email, setEmail] =  useState<string>("");
    const [password, setPassword]=  useState<string>("");

    const handleRegister = async () => {
        console.log("try to register")
        const result_user = await register(username, email, password);
        result_user && user.updateUser(result_user.user_id);
    }

    return (
        <View>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='USERNAME' placeholderTextColor="gray" value={username} onChangeText={setUsername} autoCorrect={false}
                    autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='EMAIL' placeholderTextColor="gray" value={email} onChangeText={setEmail} autoCorrect={false}
                    autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' placeholderTextColor="gray" secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
                  autoCapitalize='none'/>
            </View>

            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>
        </View>
    )            
}

const styles = StyleSheet.create({
    inputView : {
        gap : 15,
        paddingTop: 30,
    },
    input : {
        height : 50,
        paddingHorizontal : 20,
        borderRadius: 40,
        backgroundColor: "#fff",
        color: "grey",
    },
    button : {
        marginTop: 25,
        backgroundColor : "rgb(0, 150, 0)",
        height : 45,
        borderRadius : 40,
        alignItems : "center",
        justifyContent : "center"
    },
    buttonText : {
        color : "white",
        fontSize: 16,
        fontWeight : "700"
    }, 
    forgetText : {
        paddingTop: 20,
        fontSize : 14,
        color : "gray",
        textAlign: "center",
    },
})