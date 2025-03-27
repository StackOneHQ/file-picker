export interface FilePickerOptions {
    containerId?: string;
    sessionToken: string;
    baseUrl?: string;
    onFilesPick?: (data: unknown) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
