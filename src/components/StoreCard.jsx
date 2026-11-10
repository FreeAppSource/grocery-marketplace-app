import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';

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

export const StoreCard = ({ store, horizontal = true }) => {
  const router = useRouter();
  const { isFollowingStore, toggleFollowStore } = useMarketplace();

  const following = isFollowingStore(store.id);

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => router.push({ pathname: '/store-profile', params: { id: store.id } })}
      style={[styles.card, horizontal ? styles.horizontalCard : styles.fullCard]}
    >
      <Image
        source={getStoreImage(store.imageKey)}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.body}>
        <View style={styles.avatarWrapper}>
          <Image
            source={getStoreImage(store.imageKey)}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {store.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {store.category}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={12} color={colors.textMuted} />
          <Text style={styles.metaText}>{store.followers} Followers</Text>
        </View>

        <TouchableOpacity
          style={[styles.followBtn, following && styles.followingBtn]}
          onPress={() => toggleFollowStore(store.id)}
          activeOpacity={0.8}
        >
          <Text style={[styles.followText, following && styles.followingText]}>
            {following ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  horizontalCard: {
    width: 150,
    marginRight: spacing.md,
  },
  fullCard: {
    width: '100%',
    marginBottom: spacing.md,
  },
  coverImage: {
    width: '100%',
    height: 60,
    backgroundColor: colors.primaryLight,
  },
  body: {
    alignItems: 'center',
    padding: spacing.sm,
    paddingTop: 0,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
    marginTop: -22,
    marginBottom: 4,
    backgroundColor: colors.white,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  category: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  followBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 5,
    paddingHorizontal: 16,
    width: '90%',
    alignItems: 'center',
  },
  followingBtn: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  followText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  followingText: {
    color: colors.primary,
  },
});
