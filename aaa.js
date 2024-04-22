function generateRandomAlphaNumeric(length) {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
        result += alphanumericCharacters.charAt(randomIndex);
    }
    return result;
}

// Contoh: Menghasilkan kombinasi acak dengan panjang 8
const randomString = generateRandomAlphaNumeric(8);
console.log(randomString);

/// index.js = QZifesY36CCPxwA2Z2y3i8YYulshetJvDXizjwLDxxnw7PbJV1eVQ2x5as8bbmIy0AIqVOa3zRR
/// (nama di localStorage), btn signin / btn signout, hal index = k6xNYyej


/// <script src="read-excel-file.min.js"></script><script src="export-to-excel.js"><script>
