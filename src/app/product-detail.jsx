import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';
import { TradlyButton } from '../components/TradlyButton';

const getImageSource = (key) => {
  switch (key) {
    case 'product_coke.jpg':
      return require('../assets/images/product_coke.jpg');
    case 'product_broccoli.jpg':
      return require('../assets/images/product_broccoli.jpg');
    case 'product_apple.jpg':
      return require('../assets/images/product_apple.jpg');
    case 'product_egg.jpg':
      return require('../assets/images/product_egg.jpg');
    case 'product_orange.jpg':
      return require('../assets/images/product_orange.jpg');
    case 'product_moisturizer.jpg':
      return require('../assets/images/product_moisturizer.jpg');
    case 'product_fruit.jpg':
      return require('../assets/images/product_fruit.jpg');
    case 'product_fish.jpg':
      return require('../assets/images/product_fish.jpg');
    case 'product_shampoo.jpg':
      return require('../assets/images/product_shampoo.jpg');
    default:
      return require('../assets/images/product_broccoli.jpg');
  }
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { products, addToCart, toggleWishlist, isWishlisted, stores } = useMarketplace();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const product = products.find((p) => p.id === id) || products[0];
  const store = stores.find((s) => s.id === product.storeId || s.name === product.storeName) || stores[0];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Added to Cart', `${quantity}x ${product.title} added to your basket.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.navActions}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => toggleWishlist(product.id)}
          >
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? colors.danger : colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => router.push('/checkout')}
          >
            <Ionicons name="cart-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrapper}>
          <Image
            source={getImageSource(product.imageKey)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {product.discount && (
            <View style={styles.discountPill}>
              <Text style={styles.discountPillText}>{product.discount}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
            {product.organic && (
              <View style={styles.organicTag}>
                <Ionicons name="leaf" size={12} color={colors.white} />
                <Text style={styles.organicTagText}>100% Organic</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.unitText}>Unit: {product.unit}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={colors.star} />
            <Text style={styles.ratingText}>{product.rating} (from {product.reviews} reviews)</Text>
            <Text style={styles.stockBadge}>In Stock: {product.stock} units</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.storeCard}
          onPress={() => router.push({ pathname: '/store-profile', params: { id: store.id } })}
          activeOpacity={0.8}
        >
          <View style={styles.storeAvatar}>
            <Ionicons name="storefront" size={20} color={colors.white} />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{product.storeName}</Text>
            <Text style={styles.storeTagline}>{store.tagline}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'specs' && styles.activeTabItem]}
            onPress={() => setActiveTab('specs')}
          >
            <Text style={[styles.tabLabel, activeTab === 'specs' && styles.activeTabLabel]}>
              Specifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'desc' && styles.activeTabItem]}
            onPress={() => setActiveTab('desc')}
          >
            <Text style={[styles.tabLabel, activeTab === 'desc' && styles.activeTabLabel]}>
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'reviews' && styles.activeTabItem]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabLabel, activeTab === 'reviews' && styles.activeTabLabel]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContentCard}>
          {activeTab === 'specs' && (
            <View style={styles.specsGrid}>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Origin / Farm:</Text>
                <Text style={styles.specVal}>{product.origin || 'Certified Organic Grower'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Shelf Life:</Text>
                <Text style={styles.specVal}>{product.shelfLife || '10 Days'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Storage:</Text>
                <Text style={styles.specVal}>{product.storage || 'Keep Refrigerated'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Category:</Text>
                <Text style={styles.specVal}>{product.category.toUpperCase()}</Text>
              </View>
            </View>
          )}

          {activeTab === 'desc' && (
            <Text style={styles.descriptionText}>
              {product.description}
              {'\n\n'}
              Sourced with integrity directly from certified ethical growers. All packaging used by Tradly partner stores is 100% recyclable or compostable.
            </Text>
          )}

          {activeTab === 'reviews' && (
            <View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>Sarah Jenkins • Verified Buyer</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color={colors.star} />
                  ))}
                </View>
                <Text style={styles.reviewText}>
                  "Extremely fresh and top notch quality. Delivered right to my door in perfect condition."
                </Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>Marcus Thorne • Verified Buyer</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color={colors.star} />
                  ))}
                </View>
                <Text style={styles.reviewText}>
                  "Love supporting local growers without the ridiculous markup. Will be ordering weekly!"
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.quantityPicker}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cartIconBtn}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={22} color={colors.primary} />
        </TouchableOpacity>

        <TradlyButton
          title="Buy Now"
          onPress={handleBuyNow}
          style={styles.buyBtn}
        />
      </View>
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroWrapper: {
    width: '100%',
    height: 280,
    backgroundColor: '#F5FAF8',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  discountPill: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.xs,
  },
  discountPillText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  organicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
    marginLeft: 'auto',
  },
  organicTagText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  unitText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  stockBadge: {
    marginLeft: 'auto',
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  storeAvatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  storeTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: spacing.md,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabContentCard: {
    padding: spacing.md,
  },
  specsGrid: {
    gap: spacing.sm,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  specKey: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  specVal: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  reviewItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 4,
  },
  reviewText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  quantityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    minWidth: 16,
    textAlign: 'center',
  },
  cartIconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtn: {
    flex: 1,
    paddingVertical: 12,
  },
});
