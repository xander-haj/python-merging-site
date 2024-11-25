// script.js

document.getElementById('mergeButton').addEventListener('click', () => {
    const script1 = document.getElementById('script1').value;
    const script2 = document.getElementById('script2').value;

    if (!script1 || !script2) {
        alert('Please input both Python scripts.');
        return;
    }

    // Perform a line-by-line diff
    const diff = generateDiff(script1, script2);

    // Render the diff using Diff2Html
    const diffHtml = Diff2Html.html(diff, { drawFileList: false, matching: 'lines' });

    document.getElementById('diffOutput').innerHTML = diffHtml;
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
