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
    fields = ['name', 'path', 'driveId'],
    showBranding = false,
    folderSelectionEnabled = true,
    driveSelectionEnabled = true,
    onFilesPicked = (data) => {
        // data may contain files, folders, and/or drives based on what was selected
        if (data.files) {
            console.log('Selected files:', data.files);
        }
        if (data.folders) {
            console.log('Selected folders:', data.folders);
        }
        if (data.drives) {
            console.log('Selected drives:', data.drives);
        }
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
| **fields**        | string[] | No       | Which fields from the raw picked file will be mapped on the files picked callback.                                        |
| **showBranding**  | boolean  | No       | Show StackOne footer on the file picker, it is defaulted to true.                                                         |
| **folderSelectionEnabled**   | boolean  | No       | Enable the selection of folders on the unified and native pickers.                                             |
| **driveSelectionEnabled**     | boolean  | No       | Enable the selection of drives on the unified and native pickers.                                             |
| **onFilesPicked** | function | No       | Called when files are selected.                                                                                           |
| **onOpen()**      | function | No       | Called when the file picker is opened.                                                                                    |
| **onClose()**     | function | No       | Called every time the file picker is closed regardless of whether a file has been picked or not.                          |
| **onCancel()**    | function | No       | Called when the file picker is closed without a file being selected.                                                      |
| **onError()**     | function | No       | Called when the file picker has an error.                                                                                 |

### Callback Data Structure
When you get the callback from the `onFilesPicked` function, you will receive an object that may contain one or more of the following properties based on what was selected:
- `files` (optional): An array of selected files
- `folders` (optional): An array of selected folders when `folderSelectionEnabled` is true
- `drives` (optional): An array of selected drives/sites when `driveSelectionEnabled` is true

Note: The callback will only include the arrays that have items. For example, if only files are selected, only the `files` property will be present.

### File and Folder Types
Files and folders share the same structure:
| Name              | Type     | Required | Description                                                                                                               |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| **id**            | string   | **Yes**  | The Unified Id for the file.                                                                                              |
| **name**          | string   | No       | The name of the file or folder.                                                                                          |
| **path**          | string   | No       | The URL or path of the file or folder.                                                                                   |
| **driveId**       | string   | No       | The Drive ID where the file or folder is located.                                                                        |

### Drive Type
Drives have a different structure:
| Name              | Type     | Required | Description                                                                                                               |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| **id**            | string   | **Yes**  | The Unified Id for the drive.                                                                                             |
| **name**          | string   | No       | The name of the drive or site.                                                                                           |
| **type**          | string   | No       | Will be 'site' for drives.                                                                                               |
| **createdAt**     | string   | No       | The creation date of the drive.                                                                                          |
## Contribute & Release

This repose uses [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/). The repo use semantic-release and the package version is automatically determined based on the commit messages.

## Release

Use the Manual release workflow to trigger a release. The package version and changelog will automatically be generated based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
