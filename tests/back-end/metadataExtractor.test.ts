import { MetadataExtractor } from '../../src/back-end/metadataExtractor';

describe('MetadataExtractor', () => {
    let metadataExtractor: MetadataExtractor;

    beforeEach(() => {
        metadataExtractor = new MetadataExtractor();
    });

    test('should extract metadata from a valid media file', () => {
        const filePath = 'path/to/media/file.mp4';
        const expectedMetadata = {
            title: 'Sample Title',
            artist: 'Sample Artist',
            duration: 120,
        };

        const metadata = metadataExtractor.extract(filePath);
        expect(metadata).toEqual(expectedMetadata);
    });

    test('should return null for an invalid media file', () => {
        const filePath = 'path/to/invalid/file.txt';
        const metadata = metadataExtractor.extract(filePath);
        expect(metadata).toBeNull();
    });

    test('should handle errors gracefully', () => {
        const filePath = 'path/to/nonexistent/file.mp4';
        const metadata = metadataExtractor.extract(filePath);
        expect(metadata).toBeNull();
    });
});