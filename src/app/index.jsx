import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { onboardingSlides } from '../data';
import { TradlyButton } from '../components/TradlyButton';

export default function SplashScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.logoBadge}>
          <Ionicons name="leaf" size={48} color={colors.white} />
        </View>
        <Text style={styles.brandTitle}>tradly</Text>
        <Text style={styles.brandTagline}>Empowering Social Commerce</Text>
      </View>
    );
  }

  const slide = onboardingSlides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slideContent}>
        <View style={styles.graphicBox}>
          <View style={styles.graphicCircle}>
            <Ionicons name={slide.icon} size={64} color={colors.primary} />
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>{slide.badge}</Text>
          </View>
        </View>

        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {onboardingSlides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TradlyButton
          title={currentSlide === onboardingSlides.length - 1 ? 'Finish & Explore' : 'Next'}
          onPress={handleNext}
          style={styles.ctaBtn}
        />

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  skipText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  graphicBox: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  graphicCircle: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  badgePill: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  badgePillText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: spacing.sm,
  },
  slideSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },
  ctaBtn: {
    width: '100%',
  },
  loginLink: {
    marginTop: spacing.md,
    padding: 6,
  },
  loginLinkText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
