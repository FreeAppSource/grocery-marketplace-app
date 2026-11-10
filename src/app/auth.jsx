import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { TradlyButton } from '../components/TradlyButton';

export default function AuthScreen() {
  const router = useRouter();
  const [tab, setTab] = useState('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+1 (555) 998-2811');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 600);
  };

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTab('otp_request');
    }, 600);
  };

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTab('otp_verify');
    }, 600);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Phone verified! Welcome to Tradly.');
      router.replace('/(tabs)');
    }, 600);
  };

  const fillTestOtp = () => {
    setOtpCode(['2', '0', '2', '6', '8', '9']);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {tab === 'login' && 'Welcome to Tradly'}
          {tab === 'signup' && 'Create Your Account'}
          {tab === 'otp_request' && 'Verify Phone'}
          {tab === 'otp_verify' && 'Phone Verification'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {tab === 'login' && 'Log in to access fresh farm produce and social stores'}
          {tab === 'signup' && 'Sign up to shop or start selling directly'}
          {tab === 'otp_request' && 'We will send a 6-digit verification code to your phone'}
          {tab === 'otp_verify' && `Enter the 6-digit code sent to ${phone}`}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        {(tab === 'login' || tab === 'signup') && (
          <View style={styles.tabToggle}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'login' && styles.activeTabBtn]}
              onPress={() => setTab('login')}
            >
              <Text style={[styles.tabText, tab === 'login' && styles.activeTabText]}>
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'signup' && styles.activeTabBtn]}
              onPress={() => setTab('signup')}
            >
              <Text style={[styles.tabText, tab === 'signup' && styles.activeTabText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'login' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email / Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="info@tradly.co"
                placeholderTextColor={colors.textMuted}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => setTab('otp_request')}
            >
              <Text style={styles.forgotText}>Login with OTP instead</Text>
            </TouchableOpacity>

            <TradlyButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.submitBtn}
            />
          </View>
        )}

        {tab === 'signup' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Tradly"
                placeholderTextColor={colors.textMuted}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <Text style={styles.label}>Last Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Member"
                placeholderTextColor={colors.textMuted}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="user@tradly.co"
                placeholderTextColor={colors.textMuted}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Create password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TradlyButton
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
              style={styles.submitBtn}
            />
          </View>
        )}

        {tab === 'otp_request' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Mobile Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.countryCode}>🇺🇸 +1</Text>
              <TextInput
                style={styles.input}
                placeholder="(555) 998-2811"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <TradlyButton
              title="Send Verification Code"
              onPress={handleSendOtp}
              loading={loading}
              style={styles.submitBtn}
            />

            <TouchableOpacity
              style={styles.switchMode}
              onPress={() => setTab('login')}
            >
              <Text style={styles.switchModeText}>Back to standard login</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'otp_verify' && (
          <View style={styles.formGroup}>
            <View style={styles.otpGrid}>
              {otpCode.map((digit, i) => (
                <View key={i} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>{digit || '-'}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={fillTestOtp} style={styles.autoFillBtn}>
              <Text style={styles.autoFillText}>⚡ Tap to Auto-Fill Code (202689)</Text>
            </TouchableOpacity>

            <TradlyButton
              title="Verify & Continue"
              onPress={handleVerifyOtp}
              loading={loading}
              style={styles.submitBtn}
            />

            <TouchableOpacity
              style={styles.switchMode}
              onPress={handleSendOtp}
            >
              <Text style={styles.switchModeText}>Didn't receive code? Resend SMS</Text>
            </TouchableOpacity>
          </View>
        )}

        {(tab === 'login' || tab === 'signup') && (
          <View style={styles.socialSection}>
            <Text style={styles.orText}>OR CONTINUE WITH</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => router.replace('/(tabs)')}
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => router.replace('/(tabs)')}
              >
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text style={styles.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
  formContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  tabToggle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  activeTabBtn: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    marginTop: spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    padding: 4,
  },
  forgotText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.lg,
  },
  switchMode: {
    alignItems: 'center',
    marginTop: spacing.md,
    padding: 6,
  },
  switchModeText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.lg,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  autoFillBtn: {
    backgroundColor: colors.primaryLight,
    padding: 10,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  autoFillText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  socialSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingVertical: 12,
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
