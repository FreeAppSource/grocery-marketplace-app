import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, spacing } from '../theme';

export const TradlyButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const isOutline = variant === 'outline';
  const isWhite = variant === 'white';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isOutline && styles.outline,
        isWhite && styles.whiteBtn,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.white} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              isOutline && styles.outlineText,
              isWhite && styles.whiteText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  whiteBtn: {
    backgroundColor: colors.white,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  outlineText: {
    color: colors.primary,
  },
  whiteText: {
    color: colors.primary,
  },
});
