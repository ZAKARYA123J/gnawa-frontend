import { LinkingOptions } from '@react-navigation/native';

const linking: LinkingOptions<any> = {
  prefixes: ['gnawa://', 'https://gnawaproject.app'],
  config: {
    screens: {
      Auth: 'auth',
      Main: {
        screens: {
          Home: 'home',
          Artists: {
            screens: {
              ArtistsList: 'artists',
              ArtistDetail: 'artists/:artistId',
              BookingForm: 'artists/:artistId/book',
            },
          },
          MyBookings: 'bookings',
        },
      },
    },
  },
};

export default linking;