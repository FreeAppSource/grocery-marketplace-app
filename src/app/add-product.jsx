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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useMarketplace } from '../data';
import { TradlyButton } from '../components/TradlyButton';

export default function AddProductScreen() {
  const router = useRouter();
  const { editId } = useLocalSearchParams();
  const { addProduct, editProduct, products } = useMarketplace();

  const existingProduct = editId ? products.find((p) => p.id === editId) : null;

  const [title, setTitle] = useState(existingProduct?.title || '');
  const [category, setCategory] = useState(existingProduct?.category || 'vegetables');
  const [price, setPrice] = useState(existingProduct ? String(existingProduct.price) : '');
  const [originalPrice, setOriginalPrice] = useState(existingProduct ? String(existingProduct.originalPrice) : '');
  const [unit, setUnit] = useState(existingProduct?.unit || '1 kg');
  const [stock, setStock] = useState(existingProduct ? String(existingProduct.stock) : '25');
  const [organic, setOrganic] = useState(existingProduct ? existingProduct.organic : true);
  const [description, setDescription] = useState(existingProduct?.description || '');

  const handleSubmit = () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert('Required Fields', 'Please enter a product title and price.');
      return;
    }

    if (existingProduct) {
      editProduct(existingProduct.id, {
        title,
        category,
        price: parseFloat(price) || 10,
        originalPrice: parseFloat(originalPrice) || parseFloat(price) + 5,
        unit,
        stock: parseInt(stock, 10) || 10,
        organic,
        description,
      });
      Alert.alert('Updated', 'Product details saved successfully.');
    } else {
      addProduct({
        title,
        category,
        price,
        originalPrice,
        unit,
        stock,
        organic,
        description,
        imageKey: 'product_broccoli.jpg',
      });
      Alert.alert('Listed', 'Product has been published to your store.');
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{existingProduct ? 'Edit Product' : 'Add Product'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadPlaceholder}>
          <Ionicons name="image-outline" size={36} color={colors.primary} />
          <Text style={styles.uploadText}>Product Photo Attached</Text>
        </View>

        <Text style={styles.label}>Product Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Organic Crisp Broccoli"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.catRow}>
          {['vegetables', 'fruit', 'bread', 'beverages', 'egg', 'homecare'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, category === cat && styles.activeCatChip]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catText, category === cat && styles.activeCatText]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inlineInputs}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Price ($) *</Text>
            <TextInput
              style={styles.input}
              placeholder="15.00"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Original Price ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="20.00"
              keyboardType="decimal-pad"
              value={originalPrice}
              onChangeText={setOriginalPrice}
            />
          </View>
        </View>

        <View style={styles.inlineInputs}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Unit / Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1 kg head"
              value={unit}
              onChangeText={setUnit}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Stock Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="25"
              keyboardType="number-pad"
              value={stock}
              onChangeText={setStock}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setOrganic(!organic)}
        >
          <Ionicons
            name={organic ? 'checkbox' : 'square-outline'}
            size={22}
            color={colors.primary}
          />
          <Text style={styles.toggleText}>Certified 100% Organic Produce</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Details about origin, harvesting, and freshness..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TradlyButton
          title={existingProduct ? 'Save Changes' : 'Publish Product'}
          onPress={handleSubmit}
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
    height: 100,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
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
  catRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  catChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  inlineInputs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  textArea: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
