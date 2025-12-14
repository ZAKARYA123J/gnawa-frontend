import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ArtistsScreen from '../screens/ArtistsScreen/ArtistsScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen/ArtistDetailScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen/MyBookingsScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import AdminAuthScreen from '../screens/Admin/AdminAuthScreen';
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
        component={ArtistsScreen}
        options={{ title: 'Artists' }}
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
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e6e6e6',
          height: 64,
          paddingBottom: 16,
          paddingTop: 10,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: string = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Artists') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'MyBookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#0B7285',
        tabBarInactiveTintColor: '#8e9aa9',
        safeAreaInsets: { bottom: 0 },
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
