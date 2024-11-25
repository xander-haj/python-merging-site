# Python Script Merger

A sleek, dark-themed website that allows users to upload two Python scripts via drag-and-drop or file selection and view their merged differences with color-coded highlights.

## Features

- **Dark Theme:** A modern and sleek dark interface.
- **Script Input:** Upload two Python scripts by dragging & dropping or selecting files.
- **Diff Visualization:** View differences similar to GitHub's pull request interface with color-coded additions and deletions.
- **User Feedback:** Confirms when files are successfully loaded.

## Technologies Used

- **HTML, CSS, JavaScript:** Core web technologies.
- **Diff2Html:** A library to convert diff outputs into beautiful HTML.
- **JsDiff:** A JavaScript library for generating diffs.

## Hosting

Hosted on [GitHub Pages](https://pages.github.com/).

## Usage

1. **Upload Scripts:**
    - **Drag & Drop:** Drag your Python `.py` files into the designated drop zones.
    - **Select Files:** Click the "Select File" buttons to manually choose your Python scripts.

2. **View Script Names:**
    - The names of the selected files will appear below the drop zones.

3. **Merge Scripts:**
    - Click the "Merge Scripts" button to generate and view the differences between the two scripts.

## Additional Notes

1. **Color Coding:**
    - **Additions (Script 2):** Highlighted in green.
    - **Deletions (Script 1):** Highlighted in red.

2. **Customization:**
    - You can further customize the colors and styles in `styles.css` to better match your preferred aesthetics.

3. **Responsiveness:**
    - The current design is responsive, but you can enhance it further using media queries if needed.

4. **Security:**
    - Since this is a static site, there's no backend processing. All script comparisons are done on the client-side, ensuring user scripts are not sent to any server.

---
