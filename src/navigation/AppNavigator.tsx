import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen/ArtistDetailScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen/MyBookingsScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import AdminAuthScreen from '../screens/Admin/AdminAuthScreen';
import AdminArtisansScreen from '../screens/Admin/AdminArtisansScreen';
import { useAdminStore } from '../store/useAdminStore';

export type ArtistsStackParamList = {
  ArtistsList: undefined;
  ArtistDetail: { artistId: string };
  BookingForm: { artistId: string; artistName: string };
};

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<ArtistsStackParamList>();

function ArtistsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArtistsList"
        component={AdminArtisansScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetailScreen}
        options={{ title: 'Artist Detail' }}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingFormScreen}
        options={{ title: 'Book Now' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Artists') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'MyBookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return (
            <Ionicons name={iconName as string} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Artists" component={ArtistsStack} />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ title: 'My Bookings', headerShown: true }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { isAuthenticated } = useAdminStore();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <RootStack.Screen name="Auth" component={AdminAuthScreen} />
      ) : (
        <RootStack.Screen name="Main" component={MainTabs} />
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigator;
