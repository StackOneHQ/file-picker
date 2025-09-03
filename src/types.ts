export type File = {
    id: string;
    name?: string;
    path?: string;
    driveId?: string;
};

export type Folder = {
    id: string;
    name?: string;
    path?: string;
    driveId?: string;
};

export type Drive = {
    id: string;
    name?: string;
    type?: 'site';
    createdAt?: string;
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
        files?: File[]; 
        folders?: Folder[]; 
        drives?: Drive[];
    }) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
    onOpen?: () => void;
    onCancel?: () => void;
}
