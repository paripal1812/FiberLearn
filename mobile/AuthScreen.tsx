
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function AuthScreen({ onBack }: { onBack: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      Alert.alert('Missing Details', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      isLogin ? 'Login Demo' : 'Signup Demo',
      'Your form is ready! Authentication will be connected later.'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>FiberLearn</Text>
        <Text style={styles.tagline}>Learn. Connect. Grow.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </Text>

        <Text style={styles.subtitle}>
          {isLogin
            ? 'Login to continue learning.'
            : 'Join FiberLearn and start your journey.'}
        </Text>

        {!isLogin && (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#8492A5"
              value={name}
              onChangeText={setName}
            />
          </>
        )}

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#8492A5"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#8492A5"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isLogin ? 'Login' : 'Create Account'}
          </Text>
        </Pressable>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Text>

          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchLink}>
              {isLogin ? 'Sign Up' : 'Login'}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>© 2026 FiberLearn</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 25,
  },
  header: {
    backgroundColor: '#102B4E',
    paddingTop: 65,
    paddingBottom: 35,
    alignItems: 'center',
  },
  logo: {
    color: '#41D2D8',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#B9D4E8',
    fontSize: 13,
    marginTop: 7,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 22,
    borderRadius: 16,
    elevation: 3,
  },
  title: {
    color: '#102B4E',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8492A5',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 22,
  },
  label: {
    color: '#102B4E',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F4F7FB',
    borderWidth: 1,
    borderColor: '#E1E8F0',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: '#102B4E',
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
    borderWidth: 1,
    borderColor: '#E1E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#102B4E',
  },
  showText: {
    color: '#159EB2',
    fontWeight: 'bold',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#19B6C9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    flexWrap: 'wrap',
  },
  switchText: {
    color: '#8492A5',
    fontSize: 13,
  },
  switchLink: {
    color: '#159EB2',
    fontSize: 13,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    marginTop: 25,
  },
  backText: {
    color: '#102B4E',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: '#8492A5',
    fontSize: 12,
    marginTop: 22,
  },
});
