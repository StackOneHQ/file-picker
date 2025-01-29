// dummy tests - DELETE ME
import { useFilePicker } from '../filePicker';

describe('#FilePicker', () => {
    describe('.openFilePicker', () => {
        it('returns true', async () => {
            const result = useFilePicker();

            expect(result).toBe(true);
        });
    });
});
