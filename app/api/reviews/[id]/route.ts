import { getReviewsByMovie } from "@/app/features/review/apis";
import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest, // eslint-disable-line
  { params }: { params: { id: string } },
): Promise<Response> {
  const movieId = params.id;

  const reviews = await getReviewsByMovie(movieId);

  return Response.json({ reviews });
}
