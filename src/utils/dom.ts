export const createIFrameInDocument = (rootElement?: HTMLElement): HTMLIFrameElement => {
    const filePickerIFrame = document.createElement('iframe');
    filePickerIFrame.id = 'filePickerIFrame';
    filePickerIFrame.name = 'File Picker';

    filePickerIFrame.style.position = 'fixed';
    filePickerIFrame.style.zIndex = '9999';
    filePickerIFrame.style.left = '0';
    filePickerIFrame.style.right = '0';
    filePickerIFrame.style.top = '0';
    filePickerIFrame.style.bottom = '0';
    filePickerIFrame.style.width = '100%';
    filePickerIFrame.style.height = '100vh';
    filePickerIFrame.style.backgroundColor = 'transparent';
    filePickerIFrame.style.border = 'none';

    if (rootElement) {
        if (getComputedStyle(rootElement).position === 'static') {
            rootElement.style.position = 'relative';
        }
        rootElement.appendChild(filePickerIFrame);
    } else {
        document.body.appendChild(filePickerIFrame);
    }

    return filePickerIFrame;
};
