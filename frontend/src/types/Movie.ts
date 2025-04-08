export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  rating?: number;
  year?: number;
  genre?: string[];
  type?: string;
  description?: string;
}
