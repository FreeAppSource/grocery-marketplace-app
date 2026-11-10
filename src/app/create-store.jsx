import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';
import { TradlyButton } from '../components/TradlyButton';

export default function CreateStoreScreen() {
  const router = useRouter();
  const { createStore } = useMarketplace();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your store name.');
      return;
    }

    createStore({
      name,
      tagline: tagline || 'Local sustainable grower & artisan producer',
      category,
      address: address || '142 Market Street, Green District',
      phone: phone || '+1 (555) 019-2811',
      website: website || 'tradly.app/my-farm',
    });

    Alert.alert('Store Launched!', 'Your store is now active in the Tradly marketplace.');
    router.replace('/(tabs)/store');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Store</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadPlaceholder}>
          <Ionicons name="camera-outline" size={36} color={colors.primary} />
          <Text style={styles.uploadText}>Upload Store Logo & Cover</Text>
        </View>

        <Text style={styles.label}>Store Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Green Valley Farm"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Tagline / Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 100% organic heirloom veggies"
          value={tagline}
          onChangeText={setTagline}
        />

        <Text style={styles.label}>Store Category</Text>
        <View style={styles.categoryRow}>
          {['Groceries', 'Bakery', 'Organic Farm', 'Fruit Orchard'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, category === cat && styles.activeCatChip]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catText, category === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Physical Address / Farm Location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Stall 14, Central Market"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Business Contact Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. +1 (555) 019-2811"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Website (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. myfarm.tradly.app"
          value={website}
          onChangeText={setWebsite}
          autoCapitalize="none"
        />

        <TradlyButton
          title="Create Store"
          onPress={handleCreate}
          style={styles.submitBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: spacing.lg,
  },
  uploadPlaceholder: {
    backgroundColor: colors.primaryLight,
    height: 120,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: 14,
    color: colors.text,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  catChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeCatChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeCatText: {
    color: colors.white,
  },
  submitBtn: {
    marginTop: spacing.xl,
  },
});
