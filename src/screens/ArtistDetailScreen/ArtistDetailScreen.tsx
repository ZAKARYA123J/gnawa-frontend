import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
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
      <FastImage
        source={{ uri: artist.photoUrl }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.style}>{artist.genre ?? artist.style}</Text>

        {artist.isHeadliner ? (
          <Text style={styles.badge}>Tête d'affiche</Text>
        ) : null}

        <Text style={styles.bio}>{artist.biography}</Text>

        {artist.website ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Site web</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(artist.website as string)}
            >
              {artist.website}
            </Text>
          </View>
        ) : null}

        {artist.socialMedia && Object.keys(artist.socialMedia).length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Réseaux sociaux</Text>
            {Object.entries(artist.socialMedia).map(([key, url]) => (
              <Text key={key} style={styles.link} onPress={() => Linking.openURL(url)}>
                {key}: {url}
              </Text>
            ))}
          </View>
        ) : null}

        {artist.performanceTime || artist.performanceDuration ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Performance</Text>
            {artist.performanceTime ? (
              <Text style={styles.detailText}>
                Début: {new Date(artist.performanceTime).toLocaleString()}
              </Text>
            ) : null}
            {artist.performanceDuration ? (
              <Text style={styles.detailText}>
                Durée: {artist.performanceDuration} min
              </Text>
            ) : null}
          </View>
        ) : null}

        {artist.status ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Statut</Text>
            <Text style={styles.detailText}>{artist.status}</Text>
          </View>
        ) : null}

        {artist.photos && artist.photos.length > 1 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Galerie</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
              {artist.photos.slice(1).map((url, idx) => (
                <FastImage key={idx} source={{ uri: url }} style={styles.galleryImage} resizeMode={FastImage.resizeMode.cover} />
              ))}
            </ScrollView>
          </View>
        ) : null}

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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffedd5',
    color: '#b45309',
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 30,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  link: {
    color: '#1e88e5',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
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
  gallery: {
    flexGrow: 0,
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ArtistDetailScreen;
