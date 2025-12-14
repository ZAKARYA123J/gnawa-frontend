import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { ArtistsStackParamList } from '../../navigation/AppNavigator';
import { useArtist } from '../../hooks/useGnawaData';

const ArtistDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ArtistsStackParamList>>();
  const { artistId } = route.params as { artistId: string };
  const { data: artist, isLoading, error } = useArtist(artistId);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !artist) {
    return (
      <View style={styles.center}>
        <Text>Error loading artist details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: artist.photoUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.style}>{artist.style}</Text>
        <Text style={styles.bio}>{artist.biography}</Text>

        <Text style={styles.sectionTitle}>Schedule</Text>
        {artist.schedule.map((time: string, index: number) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>
              {new Date(time).toLocaleString()}
            </Text>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            title="Book This Artist"
            onPress={() =>
              navigation.navigate('BookingForm', {
                artistId: artist.id,
                artistName: artist.name,
              })
            }
          />
        </View>
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  style: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scheduleItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default ArtistDetailScreen;
