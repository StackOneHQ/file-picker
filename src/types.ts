export type File = {
    id: string;
    name?: string;
    path?: string;
    driveId?: string;
    type?: 'file' | 'folder' | 'drive';
    [key: string]: any; // Allow for additional properties
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
    onFilesPicked?: (data: { 
        files: File[]; 
        folders?: File[]; 
        drives?: File[];
        [key: string]: any; // Allow for additional properties
    }) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
