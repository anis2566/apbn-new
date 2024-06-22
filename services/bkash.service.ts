"use server"

export const GENERATE_BKASH_TOKEN = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('username', process.env.NEXT_PUBLIC_PGW_BKASH_USERNAME || '');
    headers.append('password', process.env.NEXT_PUBLIC_PGW_BKASH_PASSWORD || '');

    const res = await fetch(process.env.NEXT_PUBLIC_PGW_BKASH_GRANT_TOKEN_URL!, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            app_key: process.env.NEXT_PUBLIC_PGW_BKASH_API_KEY,
            app_secret: process.env.NEXT_PUBLIC_PGW_BKASH_API_SECRET,
        }),
    })

    if (!res.ok) {
        throw new Error("Faild to generate token")
    }

    const data = await res.json()

    return {
        success: true,
        token: data?.id_token
    }

}
