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
    function handleFile(file, textarea) {
        const reader = new FileReader();
        reader.onload = (e) => {
            textarea.value = e.target.result;
        };
        reader.onerror = () => {
            alert('Error reading file.');
        };
        reader.readAsText(file);
    }

    dropZone1.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0], script1));
    dropZone2.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0], script2));

    selectButton1.addEventListener('click', () => fileInput1.click());
    selectButton2.addEventListener('click', () => fileInput2.click());

    fileInput1.addEventListener('change', () => handleFile(fileInput1.files[0], script1));
    fileInput2.addEventListener('change', () => handleFile(fileInput2.files[0], script2));

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
        const content1 = script1.value.split("\n");
        const content2 = script2.value.split("\n");
    
        if (!content1.length || !content2.length) {
            alert('Please select or drop both Python scripts.');
            return;
        }
    
        simulateProgress(() => {
            let mergedHtml = "";
            const file1Set = new Set(content1);
    
            content1.forEach(line => {
                // Green for lines from File 1 (base file)
                mergedHtml += `<span style="background-color: rgba(76, 175, 80, 0.2);">${line}</span><br>`;
            });
    
            content2.forEach(line => {
                if (file1Set.has(line)) {
                    // Purple for duplicate lines
                    mergedHtml += `<span style="background-color: rgba(156, 39, 176, 0.2);">${line}</span><br>`;
                } else {
                    // Blue for new lines from File 2
                    mergedHtml += `<span style="background-color: rgba(33, 150, 243, 0.2);">${line}</span><br>`;
                }
            });
    
            // Set the merged output as HTML
            diffOutput.innerHTML = mergedHtml;
        });
    });
    
    
});
