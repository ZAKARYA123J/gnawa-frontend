
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useArtists } from '../../hooks/useGnawaData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ArtistsStackParamList } from '../../navigation/AppNavigator';

const ArtistsScreen = () => {
    const { data: artists, isLoading, error } = useArtists();
    const navigation = useNavigation<NavigationProp<ArtistsStackParamList>>();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>Error loading artists</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ArtistDetail', { artistId: item.id })}
        >
            <FastImage
                source={{ uri: item.photoUrl }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.style}>{item.genre ?? item.style}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={artists}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    style: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});

export default ArtistsScreen;
