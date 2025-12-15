import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { useArtists, useCreateArtist, useUpdateArtist, useDeleteArtist } from '../../hooks/useGnawaData';
import { Artist } from '../../services/api';
import { useAdminStore } from '../../store/useAdminStore';

const AdminArtisansScreen = () => {
    const { data: artists } = useArtists();
    const createMutation = useCreateArtist();
    const updateMutation = useUpdateArtist();
    const deleteMutation = useDeleteArtist();
    const { logout } = useAdminStore();

    const [modalVisible, setModalVisible] = useState(false);
    const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [style, setStyle] = useState('');
    const [biography, setBiography] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const openModal = (artist?: Artist) => {
        if (artist) {
            setEditingArtist(artist);
            setName(artist.name);
            setStyle(artist.style);
            setBiography(artist.biography);
            setPhotoUrl(artist.photoUrl);
        } else {
            setEditingArtist(null);
            setName('');
            setStyle('');
            setBiography('');
            setPhotoUrl('https://picsum.photos/200'); // Default
        }
        setModalVisible(true);
    };

    const handleSubmit = () => {
        if (!name || !style) {
            Alert.alert('Error', 'Name and Style are required');
            return;
        }

        if (editingArtist) {
            updateMutation.mutate({
                id: editingArtist.id,
                updates: { name, style, biography, photoUrl }
            }, {
                onSuccess: () => setModalVisible(false)
            });
        } else {
            createMutation.mutate({
                name,
                style,
                biography,
                photoUrl,
                schedule: [] // Default empty schedule
            }, {
                onSuccess: () => setModalVisible(false)
            });
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Artisan",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteMutation.mutate(id) }
            ]
        );
    };

    const renderItem = ({ item }: { item: Artist }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.styleText}>{item.style}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => openModal(item)} style={[styles.actionButton, styles.editButton]}>
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionButton, styles.deleteButton]}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Manage Artisans</Text>
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={artists}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{editingArtist ? 'Edit Artisan' : 'New Artisan'}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.form}>
                        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                        <TextInput style={styles.input} placeholder="Style" value={style} onChangeText={setStyle} />
                        <TextInput style={styles.input} placeholder="Photo URL" value={photoUrl} onChangeText={setPhotoUrl} />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Biography"
                            value={biography}
                            onChangeText={setBiography}
                            multiline
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', marginTop: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    logoutButton: { padding: 5 },
    logoutText: { color: 'red' },
    list: { padding: 15 },
    card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    styleText: { color: '#666' },
    actions: { flexDirection: 'row' },
    actionButton: { padding: 8, borderRadius: 5, marginLeft: 10 },
    editButton: { backgroundColor: '#e1f5fe' },
    deleteButton: { backgroundColor: '#ffebee' },
    actionText: { fontSize: 12, fontWeight: 'bold' },
    fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { fontSize: 30, color: '#fff' },
    modalContainer: { flex: 1, backgroundColor: '#fff' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    closeText: { color: '#007AFF', fontSize: 16 },
    form: { padding: 20 },
    input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },
    saveButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AdminArtisansScreen;
