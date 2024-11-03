document.getElementById("generateBtn").addEventListener("click", async () => {
    const numWords = parseInt(document.getElementById("numWords").value);
    const capitalize = document.getElementById("capitalize").checked;

    try {
        const response = await fetch(`/generate?numWords=${numWords}&capitalize=${capitalize}`);
        const password = await response.text();
        document.getElementById("output").textContent = `Tu contraseña generada es: ${password}`;
    } catch (error) {
        document.getElementById("output").textContent = 'Error al generar la contraseña';
    }
});
