import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';

export const Header = ({
  title,
  showBack = false,
  showSearch = true,
  searchPlaceholder = 'Search Product',
  variant = 'green',
  onSearchChange,
}) => {
  const router = useRouter();
  const { cart, wishlist, searchQuery, setSearchQuery } = useMarketplace();

  const isGreen = variant === 'green';
  const headerBg = isGreen ? colors.primary : colors.white;
  const textColor = isGreen ? colors.white : colors.text;
  const iconColor = isGreen ? colors.white : colors.text;
  const searchBg = isGreen ? colors.white : colors.background;
  const searchTextColor = colors.text;

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <View style={[styles.container, { backgroundColor: headerBg }]}>
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          {showBack ? (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={iconColor} />
            </TouchableOpacity>
          ) : null}
          <Text style={[styles.title, { color: textColor }]}>
            {title || 'Tradly'}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/wishlist')}
            activeOpacity={0.8}
          >
            <Ionicons name="heart-outline" size={24} color={iconColor} />
            {wishlistCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{wishlistCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/checkout')}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={24} color={iconColor} />
            {cartCount > 0 && (
              <View style={[styles.badge, styles.cartBadge]}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View style={[styles.searchBar, { backgroundColor: searchBg }]}>
          <Ionicons name="search" size={18} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (onSearchChange) onSearchChange(text);
            }}
            style={[styles.searchInput, { color: searchTextColor }]}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    marginRight: 4,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  actionBtn: {
    padding: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadge: {
    backgroundColor: '#FF5722',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 44,
    marginTop: spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
});
