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
        })
    } catch (error) {
        console.error(`Error during MAL info fetching:`, error)
        return NextResponse.json({ error: "Request failed" }, { status: 400 })
    }
}
