import { getReviewsByMovie } from "@/app/features/review/apis";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const movieId = params.id;

  const reviews = await getReviewsByMovie(movieId);

  return Response.json({ reviews });
}
