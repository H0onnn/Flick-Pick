import { NextApiRequest, NextApiResponse } from "next";
import { getReviewsByMovie } from "@/app/features/review/apis";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;

  try {
    const reviews = await getReviewsByMovie(id as string);
    response.status(200).json({ reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    response.status(500).json({ error: "Failed to fetch reviews" });
  }
}
