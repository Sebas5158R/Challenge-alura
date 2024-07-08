function processText(action) {
    let inputText = document.getElementById('inputText').value;
    let validationResult = validateText(inputText);

    if (validationResult) {
        showErrorMessage(validationResult);
        return;
    }

    let shift = action === 'encrypt' ? 3 : -3;
    let processedText = caesarCipher(inputText, shift);
    document.getElementById('outputText').innerText = processedText;
    document.getElementById('outputTitle').innerText = action === 'encrypt' ? 'Texto encriptado:' : 'Texto desencriptado:';
    document.getElementById('outputMessage').innerText = '';
    document.getElementById('copyButton').style.display = 'block';
}

function validateText(text) {
    if (/[áéíóúÁÉÍÓÚ]/.test(text)) {
        return 'El texto no puede contener tildes';
    }
    if (/[A-Z]/.test(text)) {
        return 'El texto no puede contener mayúsculas';
    }
    return null;
}

function showErrorMessage(message) {
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('outputText').innerText = '';
    document.getElementById('outputTitle').innerText = '';
    document.getElementById('outputMessage').innerText = message;
}

function caesarCipher(str, shift) {
    return str.split('').map(char => {
        let charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            return String.fromCharCode((charCode - 65 + shift + 26) % 26 + 65);
        }
        if (charCode >= 97 && charCode <= 122) {
            return String.fromCharCode((charCode - 97 + shift + 26) % 26 + 97);
        }
        return char;
    }).join('');
}

function copyToClipboard() {
    let outputText = document.getElementById('outputText').innerText;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}