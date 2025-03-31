export interface FilePickerOptions {
    containerId?: string;
    sessionToken: string;
    baseUrl?: string;
    onFilesPicked?: (data: unknown) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
