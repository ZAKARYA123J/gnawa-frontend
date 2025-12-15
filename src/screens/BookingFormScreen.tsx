
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useBookingStore } from '../store/useBookingStore';

const BookingFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { artistId, artistName } = route.params as { artistId: string; artistName: string };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [quantity, setQuantity] = useState('1');
    // Simplified date selection - usually would pick from available slots
    const [date, _setDate] = useState(new Date().toISOString());

    const addBooking = useBookingStore((state) => state.addBooking);

    const handleSubmit = () => {
        const qty = parseInt(quantity, 10);
        if (!name || !email || !qty || qty < 1) {
            Alert.alert('Error', 'Please provide name, email and a valid quantity');
            return;
        }

        const code = 'CONF-' + Math.random().toString(36).substr(2, 6).toUpperCase();

        const newBooking = {
            id: Math.random().toString(36).substr(2, 9),
            artistId,
            artistName,
            date,
            userName: name,
            bookingCode: code,
            confirmationCode: code,
            email,
            phoneNumber: phoneNumber || undefined,
            quantity: qty,
        };

        addBooking(newBooking);
        Alert.alert('Success', 'Booking confirmed!', [
            { text: 'OK', onPress: () => navigation.navigate('MyBookings' as never) }
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Book {artistName}</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Ticket Quantity</Text>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="1"
                    keyboardType="number-pad"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Notes / Date Preference</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Any specific requests?"
                    multiline
                />
            </View>

            <Button title="Confirm Booking" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        color: '#333',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default BookingFormScreen;
