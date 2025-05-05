export const createUrl = (
    baseUrl: string,
    sessionToken: string,
    origin: string,
    fields?: string[],
) => {
    const url = new URL(baseUrl);
    url.searchParams.set('token', sessionToken);
    url.searchParams.set('origin', btoa(origin));

    if (fields) {
        url.searchParams.set('fields', btoa(JSON.stringify(fields)));
    }

    return url.toString();
};
