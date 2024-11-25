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

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone1.addEventListener(eventName, preventDefaults, false);
        dropZone2.addEventListener(eventName, preventDefaults, false);
    });

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

    mergeButton.addEventListener('click', () => {
        const content1 = script1.value;
        const content2 = script2.value;

        if (!content1 || !content2) {
            alert('Please select two Python scripts.');
            return;
        }

        const diff = JsDiff.createTwoFilesPatch('Script1.py', 'Script2.py', content1, content2);
        const diffHtml = Diff2Html.html(diff, { drawFileList: false, matching: 'lines' });
        diffOutput.innerHTML = diffHtml;
    });
});
