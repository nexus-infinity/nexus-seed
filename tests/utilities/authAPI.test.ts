import { connectToGmail, connectToGoogleDrive } from '../../src/utilities/authAPI';

test('should connect to Gmail', async () => {
  const credentials = { /* your credentials */ };
  const result = await connectToGmail(credentials);
  expect(result).toBeDefined();
});

test('should connect to Google Drive', async () => {
  const credentials = { /* your credentials */ };
  const result = await connectToGoogleDrive(credentials);
  expect(result).toBeDefined();
});
