import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';

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

export const ProductCard = ({ product, width = '48%', horizontal = false }) => {
  const router = useRouter();
  const { toggleWishlist, isWishlisted, addToCart } = useMarketplace();

  const wishlisted = isWishlisted(product.id);

  const handlePress = () => {
    router.push({
      pathname: '/product-detail',
      params: { id: product.id },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handlePress}
      style={[
        styles.card,
        horizontal ? styles.horizontalCard : { width },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource(product.imageKey)}
          style={styles.image}
          resizeMode="cover"
        />

        {product.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        ) : null}

        {product.organic && (
          <View style={styles.organicBadge}>
            <Ionicons name="leaf" size={11} color={colors.white} />
            <Text style={styles.organicText}>Organic</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleWishlist(product.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? colors.danger : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.storeName} numberOfLines={1}>
          {product.storeName}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(product, 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
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
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  horizontalCard: {
    width: 160,
    marginRight: spacing.md,
    marginBottom: spacing.xs,
  },
  imageContainer: {
    width: '100%',
    height: 130,
    backgroundColor: '#F5FAF8',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  discountText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  organicBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  organicText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.sm + 2,
  },
  storeName: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    minHeight: 34,
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
