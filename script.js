// script.js

document.addEventListener('DOMContentLoaded', () => {
    const dropZone1 = document.getElementById('dropZone1');
    const dropZone2 = document.getElementById('dropZone2');
    const fileInput1 = document.getElementById('fileInput1');
    const fileInput2 = document.getElementById('fileInput2');
    const selectButton1 = document.getElementById('selectButton1');
    const selectButton2 = document.getElementById('selectButton2');
    const fileName1 = document.getElementById('fileName1');
    const fileName2 = document.getElementById('fileName2');
    const script1 = document.getElementById('script1');
    const script2 = document.getElementById('script2');
    const mergeButton = document.getElementById('mergeButton');
    const diffOutput = document.getElementById('diffOutput');

    // Prevent default behaviors for drag-and-drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, preventDefaults, false);
        dropZone2.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone when item is dragged over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone1.addEventListener(eventName, () => highlight(dropZone1), false);
        dropZone2.addEventListener(eventName, () => highlight(dropZone2), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, () => unhighlight(dropZone1), false);
        dropZone2.addEventListener(eventName, () => unhighlight(dropZone2), false);
    });

    function highlight(zone) {
        zone.classList.add('dragover');
    }

    function unhighlight(zone) {
        zone.classList.remove('dragover');
    }

    // Handle dropped files
    dropZone1.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0], fileInput1, fileName1, script1);
        }
    }, false);

    dropZone2.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0], fileInput2, fileName2, script2);
        }
    }, false);

    // Handle file selection via button
    selectButton1.addEventListener('click', () => fileInput1.click());
    selectButton2.addEventListener('click', () => fileInput2.click());

    fileInput1.addEventListener('change', () => {
        if (fileInput1.files.length) {
            handleFile(fileInput1.files[0], fileInput1, fileName1, script1);
        }
    });

    fileInput2.addEventListener('change', () => {
        if (fileInput2.files.length) {
            handleFile(fileInput2.files[0], fileInput2, fileName2, script2);
        }
    });

    function handleFile(file, inputElement, fileNameElement, textarea) {
        const validTypes = ['text/x-python', 'application/octet-stream'];
        if (file.type && !validTypes.includes(file.type)) {
            alert('Please select a valid Python (.py) file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            textarea.value = e.target.result;
            fileNameElement.textContent = file.name;
        };
        reader.onerror = () => {
            alert('Error reading file.');
        };
        reader.readAsText(file);
    }

    mergeButton.addEventListener('click', () => {
        const content1 = script1.value;
        const content2 = script2.value;

        if (!content1 || !content2) {
            alert('Please provide both Python scripts by dragging & dropping or selecting files.');
            return;
        }

        // Perform a line-by-line diff
        const diff = generateDiff(content1, content2);

        // Render the diff using Diff2Html
        const diffHtml = Diff2Html.html(diff, { drawFileList: false, matching: 'lines' });

        diffOutput.innerHTML = diffHtml;
    });

    /**
     * Generates a unified diff string between two texts.
     * @param {string} oldStr 
     * @param {string} newStr 
     * @returns {string} Unified diff
     */
    function generateDiff(oldStr, newStr) {
        const JsDiff = window.JsDiff || Diff;

        const diff = JsDiff.createTwoFilesPatch('Script1.py', 'Script2.py', oldStr, newStr);
        return diff;
    }
});
