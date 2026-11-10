import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { useMarketplace } from '../../data';
import { TradlyButton } from '../../components/TradlyButton';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, updateProfile } = useMarketplace();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSaveProfile = () => {
    updateProfile({ name, email, phone });
    setEditModalVisible(false);
    Alert.alert('Profile Saved', 'Your user information has been updated.');
  };

  const handleSendFeedback = () => {
    setFeedbackModalVisible(false);
    setFeedbackText('');
    Alert.alert('Thank You', 'Your feedback was submitted to the Tradly team.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/auth') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="My Profile" showSearch={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{userProfile.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userPhone}>{userProfile.phone}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditModalVisible(true)}
          >
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.shortcutsRow}>
          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => router.push('/(tabs)/store')}
          >
            <Ionicons name="storefront-outline" size={24} color={colors.primary} />
            <Text style={styles.shortcutText}>My Store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => router.push('/wishlist')}
          >
            <Ionicons name="heart-outline" size={24} color={colors.primary} />
            <Text style={styles.shortcutText}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Ionicons name="receipt-outline" size={24} color={colors.primary} />
            <Text style={styles.shortcutText}>Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Refer a Friend', 'Share code: TRADLY-EARN to gift $10 to your friend and get $10 off!')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="gift-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Refer a Friend</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Language & Currency', `Current: ${userProfile.language} • ${userProfile.currency}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Language & Currency</Text>
            </View>
            <Text style={styles.menuValue}>{userProfile.currency}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setFeedbackModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="chatbox-ellipses-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Feedback & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Terms & Conditions', 'Tradly Social Commerce Platform - Sustainable trade guidelines and seller protections apply.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              <Text style={styles.menuTitle}>Terms & Conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text style={[styles.menuTitle, styles.logoutTitle]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

            <TradlyButton title="Save Changes" onPress={handleSaveProfile} style={{ marginTop: spacing.md }} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={feedbackModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share Feedback</Text>
            <Text style={styles.feedbackSubtitle}>Tell us what you love or how we can improve Tradly.</Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your feedback..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              value={feedbackText}
              onChangeText={setFeedbackText}
            />

            <TradlyButton title="Submit Feedback" onPress={handleSendFeedback} style={{ marginTop: spacing.md }} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setFeedbackModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  userPhone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  editBtn: {
    padding: 8,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  shortcutItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  shortcutText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 6,
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  menuValue: {
    fontSize: 13,
    color: colors.textMuted,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutTitle: {
    color: colors.danger,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  feedbackSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  textArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: spacing.xs,
  },
  cancelText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
