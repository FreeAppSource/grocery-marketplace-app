import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useMarketplace } from '../data';
import { TradlyButton } from '../components/TradlyButton';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist, products, addToCart } = useMarketplace();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <View style={styles.container}>
      <Header title="My Wishlist" showBack showSearch={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerInfo}>
          <Text style={styles.countText}>{wishlistedProducts.length} Saved Items</Text>
          {wishlistedProducts.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
                Alert.alert('Cart Updated', 'All wishlist items moved to cart!');
              }}
            >
              <Text style={styles.moveAllText}>Add All to Cart</Text>
            </TouchableOpacity>
          )}
        </View>

        {wishlistedProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>Explore products and tap the heart icon to save them for later.</Text>
            <TradlyButton
              title="Explore Products"
              onPress={() => router.push('/(tabs)/browse')}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ) : (
          <View style={styles.grid}>
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} width="48%" />
            ))}
          </View>
        )}
      </ScrollView>
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
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  moveAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
});
