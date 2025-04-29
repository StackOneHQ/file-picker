export interface FilePickerOptions {
    sessionToken: string;
    containerId?: string;
    baseUrl?: string;
    fields?: string[];
    onFilesPicked?: (data: unknown) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
