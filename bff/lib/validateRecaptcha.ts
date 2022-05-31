import { fetch } from 'cross-fetch';

/**
 * Verifies against ReCaptcha.
 * @param token
 * @param ip
 * @returns
 */
export const validateRecaptcha = async (
    token: string,
    fallback: boolean = false
): Promise<boolean> => {
    const recaptcha_url = new URL(
        "https://www.google.com/recaptcha/api/siteverify"
    );

    const secret = fallback
        ? process.env.RECAPTCHA_SECRET_FALLBACK
        : process.env.RECAPTCHA_SECRET;

    recaptcha_url.searchParams.set("secret", secret || "");
    recaptcha_url.searchParams.set("response", token);

    const { success, score } = (await (
        await fetch(recaptcha_url.toString(), {
            method: "POST",
        })
    ).json()) as { success: boolean; score: Number; action: string };

    return fallback ? success : success && score >= 0.6;
};
