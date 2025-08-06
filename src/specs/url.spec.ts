import { describe, expect, it } from 'vitest';
import { createUrl } from '../utils/url';

describe('#url', () => {
    describe('.createUrl', () => {
        describe('when provided with required parameters', () => {
            it('creates a URL with token and origin', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';

                const url = createUrl(baseUrl, sessionToken, origin);
                const parsedUrl = new URL(url);

                expect(parsedUrl.toString()).toContain(baseUrl);
                expect(parsedUrl.searchParams.get('token')).toBe(sessionToken);
                expect(parsedUrl.searchParams.get('origin')).toBe(btoa(origin));
            });
        });

        describe('when provided with fields', () => {
            it('includes fields in the URL', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';
                const fields = ['name', 'size', 'type'];

                const url = createUrl(baseUrl, sessionToken, origin, fields);
                const parsedUrl = new URL(url);

                expect(parsedUrl.searchParams.get('fields')).toBe(btoa(JSON.stringify(fields)));
            });
        });

        describe('when fields are not provided', () => {
            it('creates URL without fields parameter', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';

                const url = createUrl(baseUrl, sessionToken, origin);
                const parsedUrl = new URL(url);

                expect(parsedUrl.searchParams.has('fields')).toBe(false);
            });
        });

        describe('when showBranding is false', () => {
            it('creates URL without showBranding parameter', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';
                const showBranding = false;

                const url = createUrl(
                    baseUrl,
                    sessionToken,
                    origin,
                    undefined,
                    undefined,
                    showBranding,
                );
                const parsedUrl = new URL(url);

                expect(parsedUrl.searchParams.get('showBranding')).toBe('false');
            });
        });

        describe('when provided with accountId', () => {
            it('includes accountId in the URL', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';
                const accountId = 'account-123';

                const url = createUrl(
                    baseUrl,
                    sessionToken,
                    origin,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    accountId,
                );
                const parsedUrl = new URL(url);

                expect(parsedUrl.searchParams.get('accountId')).toBe(accountId);
            });
        });

        describe('when accountId is not provided', () => {
            it('creates URL without accountId parameter', () => {
                const baseUrl = 'https://example.com';
                const sessionToken = 'test-token';
                const origin = 'https://myapp.com';

                const url = createUrl(baseUrl, sessionToken, origin);
                const parsedUrl = new URL(url);

                expect(parsedUrl.searchParams.has('accountId')).toBe(false);
            });
        });
    });
});
