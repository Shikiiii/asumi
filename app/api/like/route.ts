import { MAL, WATCHING_STATUS_UPDATE } from "mal-api-ts"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json();
    const provider = body.provider;
    const accessToken = body.accessToken;
    const refreshToken = body.refreshToken || null;
    const id: number = body.animeId || 21;

    if (!provider || !accessToken) {
        return NextResponse.json({ error: "Missing provider or accessToken or refreshToken." }, { status: 400 });
    }

    try {
        const mal = new MAL(
            process.env.NEXT_PUBLIC_MAL__CLIENT_ID || "",
            process.env.NEXT_PUBLIC_MAL__CLIENT_SECRET || "",
            process.env.NEXT_PUBLIC_MAL__REDIRECT_URI || ""
        );

        mal.user.auth(accessToken, refreshToken);

        mal.user.animelist.update({ id: id, status: WATCHING_STATUS_UPDATE.PLAN_TO_WATCH, score: 0 });
        return NextResponse.json({ message: "Added to PTW." }, { status: 200 });
    } catch (error) {
        console.error("Error fetching recommendations:", error)
        return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
    }
}
