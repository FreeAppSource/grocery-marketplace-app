import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { StoreCard } from '../../components/StoreCard';
import { useMarketplace, categoriesData } from '../../data';

export default function HomeScreen() {
  const router = useRouter();
  const { products, stores } = useMarketplace();

  const newProducts = products.filter((p) => p.featured);
  const popularProducts = products.filter((p) => p.isPopular);

  return (
    <View style={styles.container}>
      <Header title="Tradly" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTag}>Fast & Organic</Text>
            <Text style={styles.bannerTitle}>Ready to deliver to your home</Text>
            <TouchableOpacity
              style={styles.bannerCta}
              onPress={() => router.push('/(tabs)/browse')}
              activeOpacity={0.8}
            >
              <Text style={styles.bannerCtaText}>Start Shopping</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/banner_ready.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryGrid}>
            {categoriesData.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() => router.push({ pathname: '/(tabs)/browse', params: { category: cat.id } })}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIconCircle}>
                  <Ionicons name={cat.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Product</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} horizontal />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Product</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} width="48%" />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Store to follow</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/store')}>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {stores.map((s) => (
              <StoreCard key={s.id} store={s} horizontal />
            ))}
          </ScrollView>
        </View>
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
  banner: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  bannerTextCol: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  bannerTag: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bannerTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  bannerCta: {
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerCtaText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  bannerImage: {
    width: 100,
    height: 90,
    borderRadius: radius.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  categoryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  horizontalList: {
    paddingVertical: 4,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
