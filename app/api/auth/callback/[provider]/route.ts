import { type NextRequest, NextResponse } from "next/server"
import { MAL } from "mal-api-ts";

export async function POST(request: NextRequest, { params }: { params: { provider: string } }) {
  const provider = params.provider
  const { code = null, state = null, mal_code_verifier = null } = await request.json()

  try {
    if (provider === "mal") {
      const mal = new MAL(
        process.env.NEXT_PUBLIC_MAL__CLIENT_ID || "",
        process.env.NEXT_PUBLIC_MAL__CLIENT_SECRET || "",
        process.env.NEXT_PUBLIC_MAL__REDIRECT_URI || ""
      );

      const { access_token, refresh_token } = await mal.oauth.verify_login(
        code,
        state,
        mal_code_verifier
      );

      return NextResponse.json({
        access_token, refresh_token
      })
    }
  } catch (error) {
    console.error(`Error in ${provider} callback:`, error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
