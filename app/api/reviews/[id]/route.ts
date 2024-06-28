import { getReviewsByMovie } from "@/app/features/review/apis";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, // eslint-disable-line
  { params }: { params: { id: string } },
): Promise<Response> {
  const movieId = params.id;

  const reviews = await getReviewsByMovie(movieId);

  return Response.json({ reviews });
}
