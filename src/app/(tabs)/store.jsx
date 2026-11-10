import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { TradlyButton } from '../../components/TradlyButton';
import { useMarketplace } from '../../data';

export default function StoreScreen() {
  const router = useRouter();
  const { myStore, products, deleteProduct } = useMarketplace();

  if (!myStore) {
    return (
      <View style={styles.container}>
        <Header title="My Store" showSearch={false} />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="storefront-outline" size={64} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>You Don't Have a Store</Text>
          <Text style={styles.emptySubtitle}>
            Create your social store today to sell farm-direct produce, artisan baked goods, and handmade essentials.
          </Text>
          <TradlyButton
            title="Create Store"
            onPress={() => router.push('/create-store')}
            style={styles.createBtn}
          />
        </View>
      </View>
    );
  }

  const myStoreProducts = products.filter((p) => p.storeId === myStore.id || p.storeName === myStore.name);

  return (
    <View style={styles.container}>
      <Header title="Seller Dashboard" showSearch={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.storeCard}>
          <View style={styles.storeHeaderRow}>
            <View style={styles.storeAvatar}>
              <Ionicons name="storefront" size={28} color={colors.white} />
            </View>
            <View style={styles.storeInfo}>
              <View style={styles.nameBadgeRow}>
                <Text style={styles.storeName}>{myStore.name}</Text>
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              </View>
              <Text style={styles.storeTagline}>{myStore.tagline}</Text>
              <Text style={styles.storeLocation}>{myStore.address}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{myStore.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{myStoreProducts.length}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${myStore.balance.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TradlyButton
              title="Add Product"
              icon={<Ionicons name="add" size={18} color={colors.white} />}
              onPress={() => router.push('/add-product')}
              style={styles.addBtn}
            />
            <TouchableOpacity
              style={styles.previewBtn}
              onPress={() => router.push({ pathname: '/store-profile', params: { id: myStore.id } })}
            >
              <Ionicons name="eye-outline" size={18} color={colors.primary} />
              <Text style={styles.previewText}>View Store</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inventorySection}>
          <View style={styles.inventoryHeader}>
            <Text style={styles.sectionTitle}>Inventory Products ({myStoreProducts.length})</Text>
            <TouchableOpacity onPress={() => router.push('/add-product')}>
              <Text style={styles.addLink}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {myStoreProducts.length === 0 ? (
            <View style={styles.noProductsCard}>
              <Text style={styles.noProductsText}>No products listed yet.</Text>
              <TradlyButton
                title="Add Your First Product"
                onPress={() => router.push('/add-product')}
                style={{ marginTop: spacing.sm }}
              />
            </View>
          ) : (
            myStoreProducts.map((item) => (
              <View key={item.id} style={styles.productRow}>
                <View style={styles.productInfoCol}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productMeta}>
                    ${item.price} • Stock: {item.stock} • {item.unit}
                  </Text>
                </View>

                <View style={styles.productActions}>
                  <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => router.push({ pathname: '/add-product', params: { editId: item.id } })}
                  >
                    <Ionicons name="create-outline" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => {
                      Alert.alert(
                        'Remove Product',
                        `Are you sure you want to remove ${item.title}?`,
                        [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => deleteProduct(item.id) },
                        ]
                      );
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  createBtn: {
    width: '100%',
  },
  storeCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  storeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  storeAvatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeInfo: {
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  storeTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  storeLocation: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '80%',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  addBtn: {
    flex: 1,
    paddingVertical: 10,
  },
  previewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 10,
  },
  previewText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  inventorySection: {
    marginTop: spacing.xs,
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  addLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  noProductsCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productInfoCol: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  productMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  productActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconBtn: {
    padding: 6,
  },
});
