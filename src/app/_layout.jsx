import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../theme';
import { MarketplaceProvider } from '../data';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MarketplaceProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product-detail" options={{ headerShown: false }} />
          <Stack.Screen name="wishlist" options={{ headerShown: false }} />
          <Stack.Screen name="checkout" options={{ headerShown: false }} />
          <Stack.Screen name="store-profile" options={{ headerShown: false }} />
          <Stack.Screen name="create-store" options={{ headerShown: false }} />
          <Stack.Screen name="add-product" options={{ headerShown: false }} />
        </Stack>
      </MarketplaceProvider>
    </ThemeProvider>
  );
}
