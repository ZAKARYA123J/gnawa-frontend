import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ScrollView, TextStyle } from 'react-native';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useGnawaData';
import { Event } from '../../services/api';
import { useAdminStore } from '../../store/useAdminStore';

const AdminEventsScreen = () => {
  const { data: events } = useEvents();
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const deleteMutation = useDeleteEvent();
  const { logout } = useAdminStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setTitle(event.title);
      setDate(event.date);
      setLocation(event.location);
      setDescription(event.description);
      setImageUrl(event.imageUrl);
    } else {
      setEditingEvent(null);
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setImageUrl('https://picsum.photos/600/300');
    }
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!title || !date || !location) {
      Alert.alert('Error', 'Title, Date, and Location are required');
      return;
    }

    const payload = { title, date, location, description, imageUrl };
    if (editingEvent) {
      updateMutation.mutate(
        { id: editingEvent.id, updates: payload },
        { onSuccess: () => setModalVisible(false) }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => setModalVisible(false) });
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Event', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(id) },
    ]);
  };

  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.subText}>{new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.subText}>{item.location}</Text>
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
        <Text style={styles.headerTitle}>Manage Events</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
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
            <Text style={styles.modalTitle}>{editingEvent ? 'Edit Event' : 'New Event'}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.form}>
            <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput style={styles/input} placeholder="Date (ISO)" value={date} onChangeText={setDate} />
            <TextInput style={styles/input} placeholder="Location" value={location} onChangeText={setLocation} />
            <TextInput style={styles/input} placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} />
            <TextInput
              style={StyleSheet.compose(styles.input, styles.textArea)}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
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
  subText: { color: '#666' },
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
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 } as TextStyle,
  textArea: { height: 100, textAlignVertical: 'top' } as TextStyle,
  saveButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AdminEventsScreen;