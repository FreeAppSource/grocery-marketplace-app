import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { useMarketplace, categoriesData } from '../../data';

export default function BrowseScreen() {
  const params = useLocalSearchParams();
  const { products, searchQuery } = useMarketplace();

  const [selectedCategory, setSelectedCategory] = useState(params.category || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All Regions');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchStore = p.storeName.toLowerCase().includes(q);
      if (!matchTitle && !matchStore) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Header title="Browse Catalog" />

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={14} color={colors.text} />
          <Text style={styles.filterChipText}>
            Sort by: {sortBy === 'price_low' ? 'Price: Low' : sortBy === 'price_high' ? 'Price: High' : 'Popular'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setShowLocationModal(true)}
        >
          <Ionicons name="location-outline" size={14} color={colors.text} />
          <Text style={styles.filterChipText}>{selectedLocation}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryPills}
      >
        <TouchableOpacity
          style={[styles.pill, selectedCategory === 'all' && styles.activePill]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.pillText, selectedCategory === 'all' && styles.activePillText]}>
            All Items
          </Text>
        </TouchableOpacity>

        {categoriesData.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.pill, selectedCategory === cat.id && styles.activePill]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[styles.pillText, selectedCategory === cat.id && styles.activePillText]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.gridContent} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsCount}>
            Showing {filteredProducts.length} items
          </Text>
          {selectedCategory !== 'all' && (
            <TouchableOpacity onPress={() => setSelectedCategory('all')}>
              <Text style={styles.clearFilter}>Reset Filter</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="basket-outline" size={60} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>Try searching for something else or reset filters.</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} width="48%" />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={showSortModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sort Products</Text>
            {[
              { key: 'popular', label: 'Popular & Featured' },
              { key: 'price_low', label: 'Price: Low to High' },
              { key: 'price_high', label: 'Price: High to Low' },
              { key: 'rating', label: 'Customer Rating' },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={styles.modalOption}
                onPress={() => {
                  setSortBy(opt.key);
                  setShowSortModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, sortBy === opt.key && styles.activeOptionText]}>
                  {opt.label}
                </Text>
                {sortBy === opt.key && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowSortModal(false)}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showLocationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Delivery Zone</Text>
            {['All Regions', 'Downtown Central', 'Green District', 'Westside Farms', 'Orchard Valley'].map((loc) => (
              <TouchableOpacity
                key={loc}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedLocation(loc);
                  setShowLocationModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, selectedLocation === loc && styles.activeOptionText]}>
                  {loc}
                </Text>
                {selectedLocation === loc && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowLocationModal(false)}>
              <Text style={styles.closeBtnText}>Cancel</Text>
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
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  categoryPills: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    gap: spacing.xs,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activePill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activePillText: {
    color: colors.white,
  },
  gridContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  resultsCount: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  clearFilter: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  activeOptionText: {
    color: colors.primary,
    fontWeight: '700',
  },
  closeBtn: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: 10,
  },
  closeBtnText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
});
