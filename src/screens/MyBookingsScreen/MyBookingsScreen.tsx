
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useBookings, useCreateBooking } from '../../hooks/useGnawaData';
import { BookingRecord } from '../../services/api';

const MyBookingsScreen = () => {
    const { data: bookings = [], isLoading, isError } = useBookings();
    const { mutateAsync: createBooking, isPending } = useCreateBooking();

    const handleCreate = async () => {
        try {
            await createBooking({
                email: 'john.doe@example.com',
                attendeeName: 'John Doe',
                phoneNumber: '+212612345678',
                quantity: 2,
                totalPrice: 300.0,
                status: 'confirmed',
                paymentMethod: 'online',
                paymentStatus: 'paid',
                specialRequests: 'Please provide seats near the stage.',
                notes: 'VIP customer',
                eventId: '03c463a2-b3f7-4743-bcca-25830ef30008',
            });
            Alert.alert('Success', 'Booking created');
        } catch (e: any) {
            Alert.alert('Error', e?.message || 'Failed to create booking');
        }
    };

    const renderItem = ({ item }: { item: BookingRecord }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.artistName}>{item.attendeeName}</Text>
                <Text style={styles.code}>{item.confirmationCode}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>Email: {item.email}</Text>
                <Text style={styles.detailText}>Phone: {item.phoneNumber ?? ''}</Text>
                <Text style={styles.detailText}>Tickets: {item.quantity}</Text>
                <Text style={styles.detailText}>Total: {typeof item.totalPrice === 'string' ? item.totalPrice : item.totalPrice.toFixed(2)}</Text>
                <Text style={styles.detailText}>Status: {item.status}</Text>
                <Text style={styles.detailText}>Payment: {item.paymentMethod} / {item.paymentStatus}</Text>
                {item.specialRequests ? <Text style={styles.detailText}>Requests: {item.specialRequests}</Text> : null}
                {item.notes ? <Text style={styles.detailText}>Notes: {item.notes}</Text> : null}
                <Text style={styles.detailText}>Event: {item.eventId}</Text>
                <Text style={styles.detailText}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={isPending}>
                    <Text style={styles.createText}>{isPending ? 'Creating…' : 'Create Booking'}</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <View style={styles.emptyCenter}>
                    <Text style={styles.emptyText}>Loading…</Text>
                </View>
            ) : isError ? (
                <View style={styles.emptyCenter}>
                    <Text style={styles.emptyText}>Failed to load bookings.</Text>
                </View>
            ) : bookings.length === 0 ? (
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
    headerBar: {
        paddingHorizontal: 15,
        paddingTop: 12,
    },
    createButton: {
        padding: 12,
        backgroundColor: '#0B7285',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    createText: {
        color: '#fff',
        fontWeight: '600',
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
