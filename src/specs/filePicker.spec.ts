// dummy tests - DELETE ME
import { openFilePicker } from '../filePicker';

describe('#FilePicker', () => {
    describe('.openFilePicker', () => {
        it('returns true', async () => {
            const result = await openFilePicker();

            expect(result).toBe(true);
        });
    });
});
