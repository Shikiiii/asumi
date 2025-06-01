import { type NextRequest, NextResponse } from "next/server"
import { MAL } from "mal-api-ts";

export async function GET(request: NextRequest, context: { params: { provider: string } }) {
  const { provider } = await context.params;

  if (provider !== "mal" && provider !== "anilist") {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 })
  }

  if (provider === "mal") {
    const mal = new MAL(
      process.env.NEXT_PUBLIC_MAL__CLIENT_ID || "",
      process.env.NEXT_PUBLIC_MAL__CLIENT_SECRET || "",
      process.env.NEXT_PUBLIC_MAL__REDIRECT_URI || ""
    );

    const { url, code_verifier, state } = await mal.oauth.get_link();

    return NextResponse.json({
      url, code_verifier, state
    })
  }
  // no need for anilist as anilist auth url is easier to build
}
