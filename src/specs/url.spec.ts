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
    });
});
