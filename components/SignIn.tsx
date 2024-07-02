import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { login } from "@/api"; 
// import { testNetwork } from "@/api"; 
// import { connectUser } from "@/data";
import { user } from "@/models";

interface SignInProps {
    setIsLogin: (isLogin: boolean) => void;
}  

export const SignIn: React.FC<SignInProps> = ({ setIsLogin }) => {
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [username, setUsername] =  useState<string>("");
    const [password, setPassword]=  useState<string>("");

    const handleLogin = async () => {
        // testNetwork();
        const result_user = await login(username, password);
        // connectUser(result_user);
        // user = new User(result_user.user_id, result_user.user_name, result_user.email);
        user.updateUser(result_user);
        result_user && setIsLogin(true);
    }

    return (
        <View>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='USERNAME' placeholderTextColor="gray" value={username} onChangeText={setUsername} autoCorrect={false}
                    autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' placeholderTextColor="gray" secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
                    autoCapitalize='none'/>
            </View>

            <View style={styles.switch}>
                <Switch value={isRemember} onValueChange={setIsRemember} trackColor={{true : "green" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>SIGN IN</Text>
            </Pressable>

            <Pressable onPress={() => console.log("Forget Password!")}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
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
    switch :{
        marginTop: 10,
        flexDirection : "row",
        alignItems : "center",
        alignSelf: "flex-start",
        gap : 4,
    },
    rememberText : {
        fontSize: 13,
        color: "#fff"
    },
    button : {
        marginTop: 10,
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