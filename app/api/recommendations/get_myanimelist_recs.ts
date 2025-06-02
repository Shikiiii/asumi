import { FIELD_PRESET, MAL, WATCHING_STATUS } from "mal-api-ts";

export const getMALRecommendations = async (accessToken: string, refreshToken: string) => {
    const mal = new MAL(
        process.env.NEXT_PUBLIC_MAL__CLIENT_ID || "",
        process.env.NEXT_PUBLIC_MAL__CLIENT_SECRET || "",
        process.env.NEXT_PUBLIC_MAL__REDIRECT_URI || ""
    );

    mal.user.auth(accessToken, refreshToken);
    let recommendations = await mal.user.suggested({ limit: 100, fieldPreset: FIELD_PRESET.FULL });

    let MAL_recommendations = recommendations?.results.map((rec) => {
        return rec.anime;
    });

    return { recommendations: MAL_recommendations }
};