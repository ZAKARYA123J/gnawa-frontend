
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useBookingStore, Booking } from '../../store/useBookingStore';

const MyBookingsScreen = () => {
    const bookings = useBookingStore((state) => state.bookings);
    const removeBooking = useBookingStore((state) => state.removeBooking);

    const handleCancel = (id: string) => {
        Alert.alert(
            'Cancel Booking',
            'Are you sure you want to cancel this booking?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => removeBooking(id) },
            ]
        );
    };

    const renderItem = ({ item }: { item: Booking }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.artistName}>{item.artistName}</Text>
                <Text style={styles.code}>{item.bookingCode}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>User: {item.userName}</Text>
                <Text style={styles.detailText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                {item.email ? (
                    <Text style={styles.detailText}>Email: {item.email}</Text>
                ) : null}
                {typeof item.quantity === 'number' ? (
                    <Text style={styles.detailText}>Tickets: {item.quantity}</Text>
                ) : null}
                {item.phoneNumber ? (
                    <Text style={styles.detailText}>Phone: {item.phoneNumber}</Text>
                ) : null}
            </View>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item.id)}
            >
                <Text style={styles.cancelText}>Cancel Booking</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {bookings.length === 0 ? (
                <View style={styles.emptyCenter}>
                    <Text style={styles.emptyText}>No bookings yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 15,
    },
    emptyCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    artistName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    code: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2e7d32',
        backgroundColor: '#e8f5e9',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    details: {
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#ffebee',
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: {
        color: '#c62828',
        fontWeight: '600',
    },
});

export default MyBookingsScreen;
