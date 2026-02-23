import { COLORS } from "@/constants/theme";
import { supabase } from "@/src/lib/supabase";
import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ChangePassword() {
  const [pass, setPass] = useState("");
  const handleChange = async()=>{
    const {error}= await supabase.auth.updateUser({
        password:pass,
    })
    if(error) alert(error.message)
    else alert("password updated")

  }
  

  return (
    <ImageBackground
      source={require("../../assets/images/s1.jpeg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Choose a strong and secure password
        </Text>

        <TextInput
          secureTextEntry
          placeholder="New Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={pass}
          onChangeText={setPass}
        />

 
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.overlay },
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 28, color: "#fff", fontWeight: "700" },
  subtitle: { color: COLORS.textSecondary, marginBottom: 30 },

  input: {
    backgroundColor: COLORS.inputBg,
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15
  },

  button: {
    backgroundColor: COLORS.primaryStart,
    padding: 15,
    borderRadius: 30
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" }
});