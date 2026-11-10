import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius } from '../theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) {
  const getBackgroundColor = () => {
    if (disabled) return colors.lightGray;
    if (variant === 'primary') return colors.primary;
    if (variant === 'secondary') return colors.secondary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'outline') return colors.primary;
    return colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
