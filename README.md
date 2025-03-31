# StackOne File Picker

Allow your users to select files from your integrations. The `@stackone/file-picker` introduces an easy-to-use SDK to embed the StackOne file picker into your application.

## Install

```
# NPM
npm install --save @stackone/file-picker

# Yarn
yarn add @stackone/file-picker
```

## Usage

Initialize the File Picker with your options, and then call the `open` method to open the file picker. Listen to the callbacks to know when a file has been picked or whether
the flow has been cancelled. The callback will give you the information about the file picked - you may
also retrieve this information by using webhooks or the API. For example purposes, we used React as the framework, but you can use any framework built on top of Javascript/Typescript.

```jsx
import { FilePicker } from '@stackone/file-picker';

export const FilePickerButton = () => {
  const [filePicker, setFilePicker] = useState<FilePicker | null> (null);

  useEffect(() => {
    const initializePicker = async () => {
      const { sessionToken } = await retrieveAPISessionToken();

      setFilePicker(new FilePicker({ sessionToken }));
    };

    initializePicker();
  }, []);

  const handleClick = useCallback(() => {
    filePicker?.open();
  }, [filePicker]);

  return (
    <button onClick={handleClick} disabled={!filePicker}>
      Open File Picker
    </button>
  );
};
```

### File Picker Options

Apart from the `sessionToken`, you may pass a few options to customize the File Picker.

```jsx
// Example of Options object
const options = {
    sessionToken = 'your-session-token',
    containerId = 'file-picker-container',
    baseUrl = 'https://app.stackone.com',
    onFilesPicked = (files) => {
        console.log('Selected files:', files);
    },
    onOpen = () => {
            console.log('File picker opened');
        },
    onClose = () => {
        console.log('File picker closed');
    },
    onCancel = () => {
        console.log('File selection canceled');
    }
};

const filePicker = new FilePicker(options);
```

| Name              | Type     | Required | Description                                                                                                               |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| **sessionToken**  | string   | **Yes**  | API session token created in the backend. The session token allows users to have access to their file picker integration. |
| **containerId**   | string   | No       | ID of the container element where the file picker will be mounted.                                                        |
| **baseUrl**       | string   | No       | Which API instance should it connect to.                                                                                  |
| **onFilesPicked** | function | No       | Called when files are selected.                                                                                           |
| **onOpen()**      | function | No       | Called when the file picker is opened.                                                                                    |
| **onClose()**     | function | No       | Called every time the file picker is closed regardless of whether a file has been picked or not.                          |
| **onCancel()**    | function | No       | Called when the file picker is closed without a file being selected.                                                      |

## Contribute & Release

This repose uses [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/). The repo use semantic-release and the package version is automatically determined based on the commit messages.

## Release

Use the Manual release workflow to trigger a release. The package version and changelog will automatically be generated based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
