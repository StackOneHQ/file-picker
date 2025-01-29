import { UnifiedFile } from './UnifiedFile';
import { HubStyles } from './HubStyles';

export interface StartOptions {
    sessionToken: string;
    apiUrl?: string;
    styles?: HubStyles;
    onPick?: (picker_files: UnifiedFile) => void;
    onCancel?: () => void;
    onClose?: () => void;
}