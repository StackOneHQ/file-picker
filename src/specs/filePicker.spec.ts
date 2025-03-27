import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FilePicker } from '../filePicker';

describe('#FilePicker', () => {
    let mockOnFilesPick: ReturnType<typeof vi.fn>;
    let mockOnClose: ReturnType<typeof vi.fn>;
    let mockOnOpen: ReturnType<typeof vi.fn>;
    let mockOnCancel: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        // Setup mocks
        mockOnFilesPick = vi.fn();
        mockOnClose = vi.fn();
        mockOnOpen = vi.fn();
        mockOnCancel = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Initialization', () => {
        describe('when provided with options', () => {
            it('initializes with provided options', () => {
                const picker = new FilePicker({
                    containerId: 'custom-container',
                    sessionToken: 'test-token',
                    baseUrl: 'https://custom.example.com',
                    onFilesPick: mockOnFilesPick,
                    onClose: mockOnClose,
                    onOpen: mockOnOpen,
                    onCancel: mockOnCancel,
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });
        });

        describe('when there are no options', () => {
            it('uses default values', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });

            it('accepts minimal required options', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });
        });

        describe('event handlers', () => {
            it('can be initialized with event handlers', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                    onFilesPick: mockOnFilesPick,
                    onClose: mockOnClose,
                    onOpen: mockOnOpen,
                    onCancel: mockOnCancel,
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });

            it('works without event handlers', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                });

                expect(picker).toBeInstanceOf(FilePicker);
            });

            it('calls onClose when close() is called', () => {
                const picker = new FilePicker({
                    sessionToken: 'test-token',
                    onClose: mockOnClose,
                });

                picker.closeFilePicker();

                expect(mockOnClose).toHaveBeenCalledTimes(1);
            });
        });
    });
});
