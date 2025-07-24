export const createUrl = (
    baseUrl: string,
    sessionToken: string,
    origin: string,
    fields?: string[],
    apiUrl?: string,
    showBranding?: boolean,
    folderSelectionEnabled?: boolean,
    siteSelectionEnabled?: boolean,
) => {
    const url = new URL(baseUrl);
    url.searchParams.set('token', sessionToken);
    url.searchParams.set('origin', btoa(origin));
    url.searchParams.set('showBranding', showBranding ? 'true' : 'false');
    url.searchParams.set('folderSelectionEnabled', folderSelectionEnabled ? 'true' : 'false');
    url.searchParams.set('siteSelectionEnabled', siteSelectionEnabled ? 'true' : 'false');

    if (fields) {
        url.searchParams.set('fields', btoa(JSON.stringify(fields)));
    }

    if (apiUrl && validateApiUrl(apiUrl)) {
        url.searchParams.set('apiUrl', btoa(apiUrl));
    }
    return url.toString();
};

const validateApiUrl = (apiUrl: string): boolean => {
    try {
        const url = new URL(apiUrl);
        const validDomains = ['localhost', 'api.stackone-dev.com', 'api.stackone.com'];

        return (
            validDomains.includes(url.hostname) &&
            (url.protocol === 'http:' || url.protocol === 'https:')
        );
    } catch (_e) {
        return false;
    }
};
