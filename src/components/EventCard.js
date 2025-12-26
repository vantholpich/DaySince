import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS, LAYOUT } from '../constants/theme';
import { calculateDaysSince } from '../utils/date';

const EventCard = ({ event }) => {
    const days = calculateDaysSince(event.date, event.includeStartDate);
    const label = days === 1 ? 'Day' : 'Days';

    return (
        <View style={styles.container}>
            <BlurView intensity={20} tint={COLORS.blurTint} style={styles.blurContainer}>
                <View style={styles.content}>
                    <Text style={styles.daysCount}>{days}</Text>
                    <Text style={styles.daysLabel}>{label}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.date}>
                        Starting {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Text>
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: LAYOUT.radius,
        overflow: 'hidden',
        backgroundColor: 'rgba(28, 28, 30, 0.6)', // Fallback / Base color
        marginBottom: LAYOUT.cardGap,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    blurContainer: {
        padding: LAYOUT.padding,
    },
    content: {
        alignItems: 'center',
    },
    daysCount: {
        ...FONTS.largeTitle,
        fontSize: 52,
        color: COLORS.primary, // Or use a gradient text if possible, but solid color is cleaner for now
        fontWeight: '800',
    },
    daysLabel: {
        ...FONTS.title3,
        color: COLORS.textSecondary,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    divider: {
        height: 1,
        width: 40,
        backgroundColor: COLORS.divider,
        marginBottom: 12,
    },
    title: {
        ...FONTS.title2,
        color: COLORS.text,
        marginBottom: 4,
    },
    date: {
        ...FONTS.footnote,
        color: COLORS.textSecondary,
    },
});

export default EventCard;
