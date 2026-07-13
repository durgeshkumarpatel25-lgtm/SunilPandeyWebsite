const fs = require('fs');
const path = require('path');

const directoryToDelete = path.join(__dirname, 'frontend_html');

if (fs.existsSync(directoryToDelete)) {
  try {
    fs.rmSync(directoryToDelete, { recursive: true, force: true });
    console.log('\x1b[32m%s\x1b[0m', '✅ Success: The unnecessary frontend_html folder has been permanently deleted.');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Could not delete the folder. Make sure no files are open in your editor.', err);
  }
} else {
  console.log('\x1b[33m%s\x1b[0m', '⚠️ Notice: The frontend_html folder does not exist or has already been deleted.');
}
