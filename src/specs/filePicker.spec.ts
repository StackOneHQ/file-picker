import { describe, expect, it, vi } from 'vitest';
import { FilePicker } from '../filePicker';

describe('#FilePicker', () => {
    describe('.constructor', () => {
        describe('when provided with options', () => {
            it('returns a new instance of FilePicker', () => {
                const picker = new FilePicker({
                    containerId: 'custom-container',
                    sessionToken: 'test-token',
                    baseUrl: 'https://custom.example.com',
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });
        });

        describe('when provided with accountId', () => {
            it('returns a new instance of FilePicker with accountId', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                    accountId: 'account-123',
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });
        });
    });

    describe('When the picker is closed', () => {
        it('calls the onClose callback', () => {
            const mockOnClose = vi.fn();

            const picker = new FilePicker({
                sessionToken: 'test-token',
                onClose: mockOnClose,
            });

            picker.close();

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });
});
