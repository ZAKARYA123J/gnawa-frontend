import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useEvents } from '../../hooks/useGnawaData';

const HomeScreen = () => {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !events) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load event info.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={events}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <>
  
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.imageUrl ? (
            <FastImage
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : null}
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{new Date(item.date).toDateString()}</Text>
            <Text style={styles.cardMeta}>{item.location}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
  bannerImage: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: 24,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 4,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderColor: '#eaeaea',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 13,
    color: '#6b7280',
  },
  cardDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
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
