import * as React from 'react';
import useScript from 'react-script-hook';
import { StartOptions } from './entities/StartOptions';

type ConnectStatus = 'closed' | 'opening' | 'open';

function useFilePicker({ connectUrl }: { connectUrl?: string } = {}) {
    const [status, setStatus] = React.useState<ConnectStatus>('closed');
    const [options, setOptions] = React.useState<StartOptions>();
    const [loading, error] = useScript({
        src: connectUrl || 'https://app.stackone.com/stackone/connect.js',
        checkForExisting: true,
    });

    React.useEffect(() => {
        if (status === 'open' || status === 'closed') return;
        if (error) {
            if (status === 'opening') setStatus('closed');
            return;
        }
        if (loading) return;

        if (status === 'opening' && options) {
            setStatus('open');
            FilePicker.start({
                ...options,
                onClose: () => {
                    setStatus('closed');
                    options.onClose?.();
                },
                onCancel: () => {
                    setStatus('closed');
                    options.onCancel?.();
                },
            });
        }
    }, [error, loading, status, options]);

    const startFilePicker = React.useCallback(
        (options: StartOptions) => {
            if (error) throw 'Could not initiate StackOne Hub.';
            if (status === 'open') return;

            setOptions(options);
            setStatus('opening');
        },
        [loading, error],
    );

    return { startFilePicker };
}

export { useFilePicker };