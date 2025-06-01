import { type NextRequest, NextResponse } from "next/server"
import { getMALRecommendations } from "./get_myanimelist_recs"
import { getALRecommendations } from "./get_anilist_recs"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const provider = body.provider
  const accessToken = body.accessToken
  const refreshToken = body.refreshToken || null

  if (!provider || !accessToken) {
    return NextResponse.json({ error: "Missing provider or accessToken or refreshToken." }, { status: 400 })
  }

  try {
    let recommendations: any;

    if (provider === "mal") {
      recommendations = await getMALRecommendations(accessToken, refreshToken);
    } else if (provider === "anilist") {
      recommendations = await getALRecommendations(accessToken);
    } else {
      return NextResponse.json({ error: "Unsupported provider" }, { status: 400 })
    }

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
