type File = {
    id: string;
    name?: string;
    path?: string;
    driveId?: string;
};

export interface FilePickerOptions {
    sessionToken: string;
    containerId?: string;
    baseUrl?: string;
    fields?: string[];
    onFilesPicked?: (data: File[]) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
