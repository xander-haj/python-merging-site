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

    // Prevent default behavior for drag-and-drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, preventDefaults, false);
        dropZone2.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone on drag events
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

    // Handle file reading and display content in textarea
    function handleFile(file, codeElement) {
        const reader = new FileReader();
        reader.onload = (e) => {
            codeElement.textContent = e.target.result; // Set textContent for raw text
        };
        reader.onerror = () => {
            alert('Error reading file.');
        };
        reader.readAsText(file);
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
        const content1 = document.querySelector('#script1 code').textContent.split("\n");
        const content2 = document.querySelector('#script2 code').textContent.split("\n");
        const diffCode = document.querySelector('#diffOutput code');
        
        if (!content1.length || !content2.length) {
            alert('Please select or drop both Python scripts.');
            return;
        }
    
        simulateProgress(() => {
            let mergedHtml = "";
            let maxLines = Math.max(content1.length, content2.length);
    
            for (let i = 0; i < maxLines; i++) {
                const line1 = content1[i] || ""; // Line from File 1
                const line2 = content2[i] || ""; // Line from File 2
    
                if (line1 && line2 && line1 === line2) {
                    // Purple: Matching lines
                    mergedHtml += `<span style="background-color: rgba(0, 255, 0, 0.5);">${line1}</span>\n`;
                } else {
                    if (line1) {
                        // Green: Only in File 1
                        mergedHtml += `<span style="background-color: rgba(131, 0, 170, 1);">${line1}</span>\n`;
                    }
                    if (line2) {
                        // Blue: Only in File 2
                        mergedHtml += `<span style="background-color: rgba(50, 131, 255, 1);">${line2}</span>\n`;
                    }
                }
            }
    
            diffCode.innerHTML = mergedHtml;
        });
    });
    
    
    
    
});
