import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Booking } from './api/booking';
export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Artists: undefined;
  ArtistDetail: { artistId: string };
  BookingForm: { artistId: string };
  MyBookings: undefined;
  QRCodeModal: { booking: Booking };
};

export type MainTabParamList = {
  HomeTab: undefined;
  ArtistsTab: undefined;
  BookingsTab: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type ArtistDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ArtistDetail'
>;

export type ArtistDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArtistDetail'
>;

export type BookingFormScreenRouteProp = RouteProp<
  RootStackParamList,
  'BookingForm'
>;