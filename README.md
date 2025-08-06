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
    accountId = 'your-account-id', // Optional: simplifies authentication flow
    containerId = 'file-picker-container',
    baseUrl = 'https://app.stackone.com',
    fields = ['name', 'path', 'driveId'],
    showBranding = false,
    folderSelectionEnabled = true,
    driveSelectionEnabled = true,
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
| **accountId**     | string   | No       | Account ID for simplified authentication. When provided, removes the need for additional provider and origin owner validation. |
| **containerId**   | string   | No       | ID of the container element where the file picker will be mounted.                                                        |
| **baseUrl**       | string   | No       | Which API instance should it connect to.                                                                                  |
| **fields**        | string[] | No       | Which fields from the raw picked file will be mapped on the files picked callback.                                        |
| **showBranding**  | boolean  | No       | Show StackOne footer on the file picker, it is defaulted to true.                                                         |
| **folderSelectionEnabled**   | boolean  | No       | Enable the selection of folders on the unified and native pickers.                                             |
| **driveSelectionEnabled**     | boolean  | No       | Enable the selection of drives on the unified and native pickers.                                             |
| **onFilesPicked** | function | No       | Called when files are selected.                                                                                           |
| **onOpen()**      | function | No       | Called when the file picker is opened.                                                                                    |
| **onClose()**     | function | No       | Called every time the file picker is closed regardless of whether a file has been picked or not.                          |
| **onCancel()**    | function | No       | Called when the file picker is closed without a file being selected.                                                      |
| **onError()**     | function | No       | Called when the file picker has an error.                                                                                 |

### File Type
When you get the callback from the `onFilesPicked` function, you will receive an array of files you selected with the following parameters:
| Name              | Type     | Required | Description                                                                                                               |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| **id**            | string   | **Yes**  | The Unified Id for the file.                                                                                              |
| **name**          | string   | No       | The Name of the file.                                                                                                     |
| **path**          | string   | No       | The URL of the file.                                                                                                      |
| **driveId**       | string   | No       | The Drive Id of the file.                                                                                                 |
## Contribute & Release

This repose uses [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/). The repo use semantic-release and the package version is automatically determined based on the commit messages.

## Release

Use the Manual release workflow to trigger a release. The package version and changelog will automatically be generated based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
