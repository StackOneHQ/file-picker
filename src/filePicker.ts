import { File, FilePickerOptions } from './types';
import { createIFrameInDocument } from './utils/dom';
import { createUrl } from './utils/url';

export class FilePicker {
    #containerId: string | null;
    #sessionToken: string;
    #baseUrl: string;
    #apiUrl: string;
    #iframe: HTMLIFrameElement | null = null;
    #isListenerAttached = false;
    #showBranding = true;
    #fields?: string[];
    #onFilesPicked: (data: File[]) => void;
    #onClose: () => void;
    #onOpen: () => void;
    #onCancel: () => void;
    #onError: (error: Error) => void;

    constructor(options: FilePickerOptions) {
        const {
            containerId,
            sessionToken,
            baseUrl,
            apiUrl,
            fields,
            showBranding,
            onFilesPicked,
            onClose,
            onOpen,
            onCancel,
            onError,
        } = options;
        this.#containerId = containerId ?? null;
        this.#sessionToken = sessionToken;
        this.#fields = fields;
        this.#baseUrl = baseUrl ?? 'https://app.stackone.com';
        this.#apiUrl = apiUrl ?? 'https://api.stackone.com';
        this.#showBranding = showBranding ?? true;
        this.#onFilesPicked = onFilesPicked ?? (() => {});
        this.#onClose = onClose ?? (() => {});
        this.#onOpen = onOpen ?? (() => {});
        this.#onCancel = onCancel ?? (() => {});
        this.#onError = onError ?? (() => {});
    }

    open(win = window, rootElementId = 'root') {
        if (this.#iframe) {
            return;
        }
        const rootElement = win.document.getElementById(this.#containerId ?? rootElementId);

        if (!rootElement) {
            const error = 'Failed to open stackone file picker: root element not found';
            throw new Error(error);
        }

        if (!this.#isListenerAttached) {
            win.addEventListener('message', this.#handleMessage);
            this.#isListenerAttached = true;
        }

        this.#iframe = createIFrameInDocument(rootElement);
        const contentWindow = this.#iframe.contentWindow;

        if (!contentWindow) {
            const error = 'Failed to open stackone file picker: iframe content window not found';
            throw new Error(error);
        }

        const url = createUrl(
            `${this.#baseUrl}/embedded/files_picker`,
            this.#sessionToken,
            window.origin,
            this.#fields,
            this.#apiUrl,
            this.#showBranding,
        );
        this.#iframe.src = url;
    }

    close() {
        if (this.#iframe) {
            this.#iframe.remove();
            this.#iframe = null;
        }

        if (this.#isListenerAttached) {
            window.removeEventListener('message', this.#handleMessage);
            this.#isListenerAttached = false;
        }

        this.#onClose?.();
    }

    #handleMessage = (event: MessageEvent) => {
        if (event.origin !== this.#baseUrl) {
            return;
        }

        switch (event.data.type) {
            case 'FILE_PICKER_OPENED':
                this.#onOpen?.();
                break;
            case 'FILE_PICKER_CLOSED':
                this.close();
                break;
            case 'FILE_PICKER_FILES_SELECTED':
                this.#onFilesPicked(event.data.payload);
                this.close();
                break;
            case 'FILE_PICKER_CANCELLED':
                this.#onCancel?.();
                this.close();
                break;
            case 'FILE_PICKER_ERROR':
                this.#onError?.(event.data.payload);
                this.close();
                break;
        }
    };
}
