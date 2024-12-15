document.addEventListener('DOMContentLoaded', () => {
    const dropZone1 = document.getElementById('dropZone1');
    const dropZone2 = document.getElementById('dropZone2');
    const fileInput1 = document.getElementById('fileInput1');
    const fileInput2 = document.getElementById('fileInput2');
    const selectButton1 = document.getElementById('selectButton1');
    const selectButton2 = document.getElementById('selectButton2');
    const script1 = document.getElementById('script1');
    const script2 = document.getElementById('script2');
    const mergeButton = document.getElementById('mergeButton');
    const diffOutput = document.getElementById('diffOutput');
    const progressBar = document.getElementById('progressBar');
    const progress = progressBar.querySelector('.progress');

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Prevent default drag-and-drop behavior
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, preventDefaults, false);
        dropZone2.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zones
    function highlight(zone) {
        zone.classList.add('highlight');
    }

    function unhighlight(zone) {
        zone.classList.remove('highlight');
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone1.addEventListener(eventName, () => highlight(dropZone1), false);
        dropZone2.addEventListener(eventName, () => highlight(dropZone2), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, () => unhighlight(dropZone1), false);
        dropZone2.addEventListener(eventName, () => unhighlight(dropZone2), false);
    });

    // Handle file reading
    function handleFile(file, codeElement) {
        const reader = new FileReader();
        reader.onload = (e) => {
            codeElement.textContent = e.target.result; // Display raw text content
        };
        reader.onerror = () => {
            alert('Error reading file.');
        };
        reader.readAsText(file); // Read file as plain text
    }

    dropZone1.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0], document.querySelector('#script1 code')));
    dropZone2.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0], document.querySelector('#script2 code')));

    selectButton1.addEventListener('click', () => fileInput1.click());
    selectButton2.addEventListener('click', () => fileInput2.click());

    fileInput1.addEventListener('change', () => handleFile(fileInput1.files[0], document.querySelector('#script1 code')));
    fileInput2.addEventListener('change', () => handleFile(fileInput2.files[0], document.querySelector('#script2 code')));

    // Simulate progress bar
    function simulateProgress(callback) {
        progressBar.classList.remove('hidden');
        let width = 0;
        const interval = setInterval(() => {
            width += 10;
            progress.style.width = `${width}%`;
            if (width >= 100) {
                clearInterval(interval);
                progressBar.classList.add('hidden');
                callback();
            }
        }, 100);
    }

    // Merge and display diffs
    mergeButton.addEventListener('click', () => {
        const content1 = document.querySelector('#script1 code').textContent;
        const content2 = document.querySelector('#script2 code').textContent;
        const diffCode = document.querySelector('#diffOutput code');

        if (!content1 || !content2) {
            alert('Please select or drop both files.');
            return;
        }

        simulateProgress(() => {
            const diff = JsDiff.diffLines(content1, content2);
            const diffHtml = diff.map(part => {
                const color = part.added
                    ? 'rgba(50, 205, 50, 0.5)' // Green for additions
                    : part.removed
                        ? 'rgba(255, 69, 0, 0.5)' // Red for deletions
                        : 'rgba(240, 240, 240, 1)'; // Gray for unchanged
                return `<span style="background-color: ${color}; display: block; white-space: pre-wrap;">${part.value}</span>`;
            }).join("");
            diffCode.innerHTML = diffHtml;
        });
    });
});
