export interface PostReviewDto {
  rating: number;
  comment: string;
  userId: string;
  movieId: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  movieId: string;
}
