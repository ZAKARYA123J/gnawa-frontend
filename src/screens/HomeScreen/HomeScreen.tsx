import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useEventInfo } from '../../hooks/useGnawaData';

const HomeScreen = () => {
  const { data: event, isLoading, error } = useEventInfo();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load event info.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
        }}
        style={{ width: 300, height: 200 }}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{new Date(event.date).toDateString()}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen;
