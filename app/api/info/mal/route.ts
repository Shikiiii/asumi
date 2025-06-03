import { type NextRequest, NextResponse } from "next/server"
import { MAL } from "mal-api-ts";

export async function POST(request: NextRequest) {
    const { access_token, refresh_token } = await request.json()

    try {
        const mal = new MAL(
            process.env.NEXT_PUBLIC_MAL__CLIENT_ID || "",
            process.env.NEXT_PUBLIC_MAL__CLIENT_SECRET || "",
            process.env.NEXT_PUBLIC_MAL__REDIRECT_URI || ""
        );

        mal.user.auth(access_token, refresh_token);
        console.log("User authed")
        let info;
        try {
            info = await mal.user.info();
        } catch (error) {
            return NextResponse.json({ error: "Request to MyAnimeList failed." }, { status: 400 })
        }
        console.log("Info got:", info)

        return NextResponse.json({
            username: info?.name,
            avatar: info?.picture,
            watching: info?.anime_statistics.watching,
            completed: info?.anime_statistics.completed,
            onhold: info?.anime_statistics.on_hold,
            ptw: info?.anime_statistics.plan_to_watch,
            dropped: info?.anime_statistics.dropped,
            days_watched: info?.anime_statistics.total_days,
            episodes: info?.anime_statistics.episodes,
            avg_score: info?.anime_statistics.mean_score,
        })
    } catch (error) {
        console.error(`Error during MAL info fetching:`, error)
        return NextResponse.json({ error: "Request failed" }, { status: 400 })
    }
}
