export interface UnifiedFile {
    id?: string | null;
    name?: string | null;
    description?: string | null;
    url?: string | null;
    size?: number | null;
    file_format: {
        value?: string | null;
        source_value?: string | null;
    } | null;
    path?: string | null;
    owner_id?: string | null;
    folder_id?: string | null;
    drive_id?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    remote_id?: string | null;
    remote_owner_id?: string | null;
    remote_folder_id?: string | null;
    remote_drive_id?: string | null;
}