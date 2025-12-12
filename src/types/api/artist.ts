export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  biography: string;
  performanceDate: string;
  performanceTime: string;
  duration: string;
  stage: string;
  rating?: number;
  socialLinks?: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
  };
}

export interface ArtistListResponse {
  data: Artist[];
  total: number;
  page: number;
  limit: number;
}

export interface ArtistDetailResponse {
  data: Artist;
  similarArtists: Artist[];
}