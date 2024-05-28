import Image from "next/image";

interface MainReviewCardProps {
  reviewId: number;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  review: string;
  userName: string;
  userProfile: string;
  rating: number;
}

export const MainReviewCard = ({
  reviewId,
  movieId,
  movieTitle,
  moviePoster,
  review,
  userName,
  userProfile,
  rating,
}: MainReviewCardProps) => {
  return (
    <div className="relative bg-gray-200 rounded-lg">
      <div className="relative w-full h-[200px]">
        <Image
          src={moviePoster}
          alt={movieTitle}
          fill
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movieTitle}</h3>
        <p className="text-sm mt-2">{review}</p>
        <div className="flex items-center mt-4">
          <Image
            src={userProfile}
            alt={userName}
            fill
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2">
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-sm text-accent">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
