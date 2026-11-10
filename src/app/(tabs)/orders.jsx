import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { Header } from '../../components/Header';
import { useMarketplace } from '../../data';
import { TradlyButton } from '../../components/TradlyButton';

const TRACKING_STEPS = [
  { title: 'Order Placed', time: 'Jan 18, 14:20', desc: 'Your order has been recorded in Tradly' },
  { title: 'Payment Confirmed', time: 'Jan 18, 14:22', desc: 'Transaction authorized via card' },
  { title: 'Processed & Packed', time: 'Jan 18, 16:00', desc: 'Fresh produce packed in eco thermal crates' },
  { title: 'Shipped / Out for Delivery', time: 'Jan 19, 09:15', desc: 'Courier assigned: John D.' },
  { title: 'Delivered', time: 'Jan 19, 11:30', desc: 'Package safely dropped at front doorstep' },
];

export default function OrdersScreen() {
  const { orders, addToCart } = useMarketplace();
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  const handleReorder = (order) => {
    order.items.forEach((item) => addToCart(item, item.qty || 1));
    Alert.alert('Cart Updated', 'Items added back to your cart!');
  };

  return (
    <View style={styles.container}>
      <Header title="Order History" showSearch={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={60} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No past orders yet</Text>
            <Text style={styles.emptySubtitle}>Your purchase history and deliveries will appear here.</Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeaderRow}>
                <View>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date} • {order.items.length} items</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>

              <View style={styles.itemList}>
                {order.items.map((item, idx) => (
                  <View key={idx} style={styles.itemRow}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.qty || 1}x {item.title}
                    </Text>
                    <Text style={styles.itemPrice}>${(item.price * (item.qty || 1)).toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount Paid:</Text>
                <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.trackBtn}
                  onPress={() => setActiveTrackingOrder(order)}
                >
                  <Ionicons name="navigate-circle-outline" size={16} color={colors.primary} />
                  <Text style={styles.trackBtnText}>Track Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.reorderBtn}
                  onPress={() => handleReorder(order)}
                >
                  <Ionicons name="refresh-outline" size={16} color={colors.white} />
                  <Text style={styles.reorderBtnText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={!!activeTrackingOrder} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tracking Order #{activeTrackingOrder?.id}</Text>
              <TouchableOpacity onPress={() => setActiveTrackingOrder(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.timelineList}>
              {TRACKING_STEPS.map((step, idx) => {
                const isCompleted = idx <= (activeTrackingOrder?.statusStep ?? 4);
                return (
                  <View key={idx} style={styles.timelineRow}>
                    <View style={styles.timelineIndicator}>
                      <View
                        style={[
                          styles.timelineDot,
                          isCompleted && styles.completedDot,
                        ]}
                      >
                        {isCompleted && <Ionicons name="checkmark" size={12} color={colors.white} />}
                      </View>
                      {idx < TRACKING_STEPS.length - 1 && (
                        <View
                          style={[
                            styles.timelineLine,
                            idx < (activeTrackingOrder?.statusStep ?? 4) && styles.completedLine,
                          ]}
                        />
                      )}
                    </View>

                    <View style={styles.timelineDetails}>
                      <Text style={[styles.stepTitle, isCompleted && styles.completedStepTitle]}>
                        {step.title}
                      </Text>
                      <Text style={styles.stepTime}>{step.time}</Text>
                      <Text style={styles.stepDesc}>{step.desc}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <TradlyButton
              title="Close Tracking"
              onPress={() => setActiveTrackingOrder(null)}
              style={{ marginTop: spacing.md }}
            />
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
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
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
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  statusText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  itemList: {
    marginVertical: spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  itemName: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    paddingRight: 8,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  trackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.full,
  },
  trackBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  reorderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  reorderBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  timelineList: {
    marginVertical: spacing.sm,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 60,
  },
  timelineIndicator: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedDot: {
    backgroundColor: colors.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  completedLine: {
    backgroundColor: colors.primary,
  },
  timelineDetails: {
    flex: 1,
    paddingBottom: spacing.sm,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  completedStepTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  stepTime: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
