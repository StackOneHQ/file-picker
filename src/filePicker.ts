import { FilePickerOptions } from './types';
import { createIFrameInDocument } from './utils/dom';

export class FilePicker {
  #containerId: string | null;
  #sessionToken: string;
  #baseUrl: string;
  #iframe: HTMLIFrameElement | null = null;
  #isListenerAttached = false;
  #onFilesPick: (data: unknown) => void;
  #onClose: () => void;
  #onOpen: () => void;
  #onCancel: () => void;

  constructor(options: FilePickerOptions) {
    const {
      containerId,
      sessionToken,
      baseUrl,
      onFilesPick,
      onClose,
      onOpen,
      onCancel,
    } = options;
    this.#containerId = containerId ?? null;
    this.#sessionToken = sessionToken;
    this.#baseUrl = baseUrl ?? 'https://app.stackone.com';
    this.#onFilesPick = onFilesPick ?? (() => {});
    this.#onClose = onClose ?? (() => {});
    this.#onOpen = onOpen ?? (() => {});
    this.#onCancel = onCancel ?? (() => {});
  }

  openFilePicker(win = window, rootElementId = 'root') {
    if (this.#iframe) {
      return;
    }
    const rootElement = win.document.getElementById(
      this.#containerId ?? rootElementId
    );

    if (!rootElement) {
      const error =
        'Failed to open stackone file picker: root element not found';
      throw new Error(error);
    }

    if (!this.#isListenerAttached) {
      win.addEventListener('message', this.#handleMessage);
      this.#isListenerAttached = true;
    }

    this.#iframe = createIFrameInDocument(rootElement);
    const contentWindow = this.#iframe.contentWindow;

    if (!contentWindow) {
      const error =
        'Failed to open stackone file picker: iframe content window not found';
      throw new Error(error);
    }
    const url = `${this.#baseUrl}/embedded/files_picker?token=${
      this.#sessionToken
    }`;

    this.#iframe.src = url;
  }

  closeFilePicker() {
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
        this.closeFilePicker();
        break;
      case 'FILE_PICKER_FILES_SELECTED':
        this.#onFilesPick(event.data.payload);
        this.closeFilePicker();
        break;
      case 'FILE_PICKER_CANCELLED':
        this.#onCancel?.();
        this.closeFilePicker();
        break;
    }
  };
}
