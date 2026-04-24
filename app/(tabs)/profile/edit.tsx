import { COLORS } from "@/constants/theme";
import { useAuth } from "@/providers/AuthProvider";
import { getProfile, updateProfile, UserProfile } from "@/src/services/profile.service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.id) return;
      try {
        const { data, error } = await getProfile(session.user.id);
        if (error) throw error;
        if (data) {
          setFormData({
            username: data.username || "",
            bio: data.bio || "",
            birth_date: data.birth_date || "",
            birth_time: data.birth_time || "",
            birth_place: data.birth_place || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [session?.user?.id]);

  const handleSave = async () => {
    if (!session?.user?.id) return;
    setSaving(true);
    try {
      const { error } = await updateProfile({
        id: session.user.id,
        ...formData,
      });
      if (error) throw error;
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primaryStart} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            placeholder="Your username"
            placeholderTextColor="#64748b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            placeholder="Tell us about yourself"
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birth Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={formData.birth_date}
            onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
            placeholder="1999-03-15"
            placeholderTextColor="#64748b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birth Time (HH:MM AM/PM)</Text>
          <TextInput
            style={styles.input}
            value={formData.birth_time}
            onChangeText={(text) => setFormData({ ...formData, birth_time: text })}
            placeholder="05:30 AM"
            placeholderTextColor="#64748b"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birth Place</Text>
          <TextInput
            style={styles.input}
            value={formData.birth_place}
            onChangeText={(text) => setFormData({ ...formData, birth_place: text })}
            placeholder="Mumbai, Maharashtra"
            placeholderTextColor="#64748b"
          />
        </View>

        <TouchableOpacity 
          style={styles.saveBtn} 
          onPress={handleSave}
          disabled={saving}
        >
          <LinearGradient
            colors={['#9333ea', '#db2777']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0f172a',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sectionDivider: {
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 40,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});