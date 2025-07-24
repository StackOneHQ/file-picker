export type File = {
    id: string;
    name?: string;
    path?: string;
    driveId?: string;
};

export interface FilePickerOptions {
    sessionToken: string;
    containerId?: string;
    baseUrl?: string;
    apiUrl?: string;
    fields?: string[];
    showBranding?: boolean;
    folderSelectionEnabled?: boolean;
    driveSelectionEnabled?: boolean;
    onFilesPicked?: (data: File[]) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
