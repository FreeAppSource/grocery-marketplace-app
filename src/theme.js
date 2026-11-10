import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#33907C',
  primaryDark: '#246D5E',
  primaryLight: '#E9F5F2',
  accent: '#FF9800',
  accentLight: '#FFF3E0',
  text: '#333333',
  textSecondary: '#4F4F4F',
  textMuted: '#828282',
  border: '#ECECEC',
  borderLight: '#F2F2F2',
  background: '#F8FAF9',
  card: '#FFFFFF',
  cardAlt: '#F5FAF8',
  danger: '#EB5757',
  dangerLight: '#FDECEC',
  success: '#27AE60',
  successLight: '#E8F5E9',
  white: '#FFFFFF',
  black: '#000000',
  star: '#FFB800',
  tagBg: '#E9F5F2',
  tagText: '#33907C',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: 'System',
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  tag: { fontSize: 11, fontWeight: '600', lineHeight: 14 },
};

export const palettes = {
  light: {
    bg: '#F8FAF9',
    card: '#FFFFFF',
    text: '#333333',
    subText: '#4F4F4F',
    mutedText: '#828282',
    border: '#ECECEC',
    navBg: '#FFFFFF',
    primary: '#33907C',
    primaryLight: '#E9F5F2',
    tint: '#33907C',
  },
  dark: {
    bg: '#121816',
    card: '#1B2421',
    text: '#F2F5F4',
    subText: '#CBD5D1',
    mutedText: '#8A9994',
    border: '#2A3834',
    navBg: '#1B2421',
    primary: '#33907C',
    primaryLight: '#1E332E',
    tint: '#44A590',
  },
};

const ThemeContext = createContext({
  theme: palettes.light,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? palettes.dark : palettes.light;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
