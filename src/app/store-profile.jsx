import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';
import { ProductCard } from '../components/ProductCard';

const getStoreImage = (key) => {
  switch (key) {
    case 'store_tradly.jpg':
      return require('../assets/images/store_tradly.jpg');
    case 'store_groceries.jpg':
      return require('../assets/images/store_groceries.jpg');
    default:
      return require('../assets/images/store_tradly.jpg');
  }
};

export default function StoreProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { stores, products, isFollowingStore, toggleFollowStore } = useMarketplace();

  const [activeFilter, setActiveFilter] = useState('all');

  const store = stores.find((s) => s.id === id) || stores[0];
  const following = isFollowingStore(store.id);

  const storeProducts = products.filter((p) => {
    const matchStore = p.storeId === store.id || p.storeName === store.name;
    if (!matchStore) return false;
    if (activeFilter === 'veg' && p.category !== 'vegetables') return false;
    if (activeFilter === 'fruit' && p.category !== 'fruit') return false;
    if (activeFilter === 'homecare' && p.category !== 'homecare') return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{store.name}</Text>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/checkout')}>
          <Ionicons name="cart-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.coverWrapper}>
          <Image
            source={getStoreImage(store.imageKey)}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Image
              source={getStoreImage(store.imageKey)}
              style={styles.avatar}
            />
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            {store.verified && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
          </View>

          <Text style={styles.storeBio}>{store.tagline}</Text>
          <Text style={styles.storeAddress}>{store.address}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{store.followers}</Text>
              <Text style={styles.statLbl}>Total Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{store.totalProducts}</Text>
              <Text style={styles.statLbl}>Total Products</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{store.rating} ★</Text>
              <Text style={styles.statLbl}>Store Rating</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.followBtn, following && styles.followingBtn]}
            onPress={() => toggleFollowStore(store.id)}
          >
            <Text style={[styles.followBtnText, following && styles.followingBtnText]}>
              {following ? 'Following Store' : 'Follow Store'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterPillsRow}>
          {[
            { key: 'all', label: 'All Products' },
            { key: 'veg', label: 'Vegetables' },
            { key: 'fruit', label: 'Fruit' },
            { key: 'homecare', label: 'Homecare' },
          ].map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.pill, activeFilter === f.key && styles.activePill]}
              onPress={() => setActiveFilter(f.key)}
            >
              <Text style={[styles.pillText, activeFilter === f.key && styles.activePillText]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.grid}>
          {storeProducts.length === 0 ? (
            <Text style={styles.emptyText}>No products matching this category in this store.</Text>
          ) : (
            storeProducts.map((p) => (
              <ProductCard key={p.id} product={p} width="48%" />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navBtn: {
    padding: 6,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  coverWrapper: {
    width: '100%',
    height: 120,
    backgroundColor: colors.primaryLight,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
    marginTop: -32,
    marginBottom: spacing.xs,
    backgroundColor: colors.white,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  storeBio: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  storeAddress: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.md,
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  statLbl: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '80%',
  },
  followBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  followingBtn: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  followBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  followingBtnText: {
    color: colors.primary,
  },
  filterPillsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activePill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activePillText: {
    color: colors.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    padding: spacing.lg,
    textAlign: 'center',
    width: '100%',
  },
});
