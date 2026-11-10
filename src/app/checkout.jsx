import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { Header } from '../components/Header';
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

export default function CheckoutScreen() {
  const router = useRouter();
  const {
    cart,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    promoDiscount,
    cartTotal,
    placeOrder,
    userProfile,
  } = useMarketplace();

  const [step, setStep] = useState('cart');
  const [promoCode, setPromoCode] = useState('TRADLYWELCOME');
  const [selectedAddress, setSelectedAddress] = useState(userProfile.address);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('TRADLY TEAM');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const handlePlaceOrder = () => {
    const order = placeOrder({
      address: selectedAddress,
      paymentMethod: paymentMethod === 'card' ? `Credit Card (${cardNumber.slice(-4)})` : 'Tradly Pay',
    });
    setCreatedOrder(order);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark-sharp" size={48} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for shopping sustainable! Your order #{createdOrder?.id} has been placed.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Paid:</Text>
              <Text style={styles.summaryVal}>${createdOrder?.total?.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Delivery:</Text>
              <Text style={styles.summaryVal}>Tomorrow, 10:00 AM</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Deliver To:</Text>
              <Text style={styles.summaryVal} numberOfLines={1}>{selectedAddress}</Text>
            </View>
          </View>

          <TradlyButton
            title="Track Order"
            onPress={() => router.replace('/(tabs)/orders')}
            style={styles.fullWidthBtn}
          />
          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.backHomeText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={step === 'cart' ? 'My Cart' : step === 'address' ? 'Delivery Address' : 'Payment'}
        showBack
        showSearch={false}
      />

      <View style={styles.stepProgressRow}>
        <TouchableOpacity
          style={[styles.stepTab, step === 'cart' && styles.activeStepTab]}
          onPress={() => setStep('cart')}
        >
          <Text style={[styles.stepTabText, step === 'cart' && styles.activeStepTabText]}>1. Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepTab, step === 'address' && styles.activeStepTab]}
          onPress={() => cart.length > 0 && setStep('address')}
        >
          <Text style={[styles.stepTabText, step === 'address' && styles.activeStepTabText]}>2. Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepTab, step === 'payment' && styles.activeStepTab]}
          onPress={() => cart.length > 0 && setStep('payment')}
        >
          <Text style={[styles.stepTabText, step === 'payment' && styles.activeStepTabText]}>3. Payment</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {step === 'cart' && (
          <View>
            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <Ionicons name="cart-outline" size={64} color={colors.textMuted} />
                <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                <TradlyButton
                  title="Discover Products"
                  onPress={() => router.push('/(tabs)/browse')}
                  style={{ marginTop: spacing.lg }}
                />
              </View>
            ) : (
              <>
                {cart.map((item) => (
                  <View key={item.id} style={styles.cartCard}>
                    <Image
                      source={getImageSource(item.imageKey)}
                      style={styles.itemThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                      <Text style={styles.itemStore}>{item.storeName}</Text>
                      <Text style={styles.itemPrice}>${item.price} each</Text>
                    </View>

                    <View style={styles.qtyControl}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartQty(item.id, -1)}
                      >
                        <Ionicons name="remove" size={14} color={colors.text} />
                      </TouchableOpacity>
                      <Text style={styles.qtyVal}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartQty(item.id, 1)}
                      >
                        <Ionicons name="add" size={14} color={colors.text} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.promoCard}>
                  <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter Coupon / Promo Code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                  />
                  <Text style={styles.promoApplied}>Applied -$10</Text>
                </View>

                <View style={styles.billCard}>
                  <Text style={styles.billTitle}>Order Summary</Text>
                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Subtotal</Text>
                    <Text style={styles.billVal}>${cartSubtotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Eco Delivery Fee</Text>
                    <Text style={styles.billVal}>${deliveryFee.toFixed(2)}</Text>
                  </View>
                  <View style={styles.billRow}>
                    <Text style={[styles.billLabel, { color: colors.primary }]}>Tradly Promo Discount</Text>
                    <Text style={[styles.billVal, { color: colors.primary }]}>-${promoDiscount.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.billRow, styles.totalBillRow]}>
                    <Text style={styles.totalBillLabel}>Grand Total</Text>
                    <Text style={styles.totalBillVal}>${cartTotal.toFixed(2)}</Text>
                  </View>
                </View>

                <TradlyButton
                  title="Proceed to Address"
                  onPress={() => setStep('address')}
                  style={{ marginTop: spacing.md }}
                />
              </>
            )}
          </View>
        )}

        {step === 'address' && (
          <View>
            <Text style={styles.sectionHeading}>Select Delivery Address</Text>

            {[
              { id: '1', title: 'Home Address', addr: userProfile.address, isDefault: true },
              { id: '2', title: 'Tradly Central Pickup Hub', addr: 'Green Depot, Bay 4, Terminal Street', isDefault: false },
            ].map((a) => (
              <TouchableOpacity
                key={a.id}
                style={[styles.addressCard, selectedAddress === a.addr && styles.selectedAddressCard]}
                onPress={() => setSelectedAddress(a.addr)}
              >
                <Ionicons
                  name={selectedAddress === a.addr ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={colors.primary}
                />
                <View style={styles.addressInfo}>
                  <Text style={styles.addressTitle}>{a.title}</Text>
                  <Text style={styles.addressDesc}>{a.addr}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TradlyButton
              title="Continue to Payment"
              onPress={() => setStep('payment')}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        )}

        {step === 'payment' && (
          <View>
            <Text style={styles.sectionHeading}>Choose Payment Method</Text>

            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('card')}
            >
              <Ionicons
                name={paymentMethod === 'card' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={colors.primary}
              />
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>Credit / Debit Card</Text>
                <Text style={styles.paymentDesc}>{cardNumber} (Exp: {cardExpiry})</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddCardModal(true)}>
                <Text style={styles.editCardText}>Change Card</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.cardVisual}>
              <View style={styles.cardVisualTop}>
                <Text style={styles.cardVisualBrand}>Tradly Pay</Text>
                <Ionicons name="card" size={24} color={colors.white} />
              </View>
              <Text style={styles.cardVisualNumber}>{cardNumber}</Text>
              <View style={styles.cardVisualBottom}>
                <View>
                  <Text style={styles.cardVisualLabel}>CARDHOLDER</Text>
                  <Text style={styles.cardVisualValue}>{cardHolder}</Text>
                </View>
                <View>
                  <Text style={styles.cardVisualLabel}>EXPIRES</Text>
                  <Text style={styles.cardVisualValue}>{cardExpiry}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'tradly_pay' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('tradly_pay')}
            >
              <Ionicons
                name={paymentMethod === 'tradly_pay' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={colors.primary}
              />
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>Tradly Eco Wallet</Text>
                <Text style={styles.paymentDesc}>Available balance: $1,420.50</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'cod' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('cod')}
            >
              <Ionicons
                name={paymentMethod === 'cod' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={colors.primary}
              />
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>Cash on Delivery</Text>
                <Text style={styles.paymentDesc}>Pay cash upon delivery</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.finalTotalBox}>
              <Text style={styles.finalTotalLabel}>Total to Pay:</Text>
              <Text style={styles.finalTotalVal}>${cartTotal.toFixed(2)}</Text>
            </View>

            <TradlyButton
              title="Confirm & Place Order"
              onPress={handlePlaceOrder}
              style={{ marginTop: spacing.md }}
            />
          </View>
        )}
      </ScrollView>

      <Modal visible={showAddCardModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Card Details</Text>

            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.modalInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
            />

            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.modalInput}
              value={cardHolder}
              onChangeText={setCardHolder}
            />

            <View style={styles.inlineInputs}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.modalInput}
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  placeholder="MM/YY"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.modalInput}
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>

            <TradlyButton
              title="Save Card"
              onPress={() => setShowAddCardModal(false)}
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
  stepProgressRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: 'space-between',
  },
  stepTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
  },
  activeStepTab: {
    backgroundColor: colors.primaryLight,
  },
  stepTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeStepTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: radius.sm,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  itemStore: {
    fontSize: 11,
    color: colors.textMuted,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.full,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 6,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  removeBtn: {
    padding: 8,
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.sm,
    gap: spacing.sm,
  },
  promoInput: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  promoApplied: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  billCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.sm,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  billLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  billVal: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  totalBillRow: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
    marginTop: 4,
  },
  totalBillLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  totalBillVal: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  selectedAddressCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  addressDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  selectedPaymentOption: {
    borderColor: colors.primary,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  paymentDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editCardText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  cardVisual: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  cardVisualTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cardVisualBrand: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardVisualNumber: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  cardVisualBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardVisualLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    fontWeight: '700',
  },
  cardVisualValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  finalTotalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  finalTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  finalTotalVal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
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
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: spacing.xs,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    fontSize: 14,
    color: colors.text,
  },
  inlineInputs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  successContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  successContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  fullWidthBtn: {
    width: '100%',
  },
  backHomeBtn: {
    marginTop: spacing.md,
    padding: 8,
  },
  backHomeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
