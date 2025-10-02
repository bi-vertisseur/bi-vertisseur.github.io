function convert(action, result_needed = true, useResult = null, useBase = null) {
    const buttonconvert = document.getElementById('convert');
    const buttonconvertback = document.getElementById('convertback');
    const input = document.getElementById('inputnum');
    const result_box = document.querySelector('#result');
    const input2 = document.getElementById('inputbase');

    let value = "";
    let base = "";

    if (useResult) {
        value = String(useResult);
    } else {
        value = input.value.trim();
    }

    if (useBase) {
        base = String(useBase);
    } else {
        base = input2.value.trim();
    }

    if (value === "") {
        result_box.textContent = "Veuillez entrer un nombre !";
        result_box.style.color = "red";
    } else if (base === "") {
        result_box.textContent = "Veuillez entrer une base pour convertir !";
        result_box.style.color = "red";
    } else if (base < 2 || base > 36) {
        result_box.textContent = "Veuillez entrer une base comprise entre 2 et 36 !";
        result_box.style.color = "red";
    } else if (value < 0) {
        result_box.textContent = "Veuillez entrer un nombre supérieur ou egal à 0 !";
        result_box.style.color = "red";
    } else if (value === "0") {
        result_box.textContent = "0";
        result_box.style.color = "white";
    } else {
        try {
            if (action === "invert") {
                const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let result = 0n;
                let len = value.length;

                for (let i = 0; i < len; i++) {
                    let char = value[len - i - 1].toUpperCase();
                    let digit = digits.indexOf(char);

                    if (digit === -1 || digit >= Number(base)) {
                        result_box.textContent = `Caractère invalide "${char}" pour la base ${base}`;
                        result_box.style.color = "red";
                        return;
                    }

                    result += BigInt(digit) * (BigInt(base) ** BigInt(i));
                }

                if (result_needed) {
                    result_box.textContent = result;
                    result_box.style.color = "white";
                
                    buttonconvertback.textContent = "Nombre converti !";
                    setTimeout(() => buttonconvertback.textContent = "Revenir base 10 !", 1000);
                } else {
                    return result;
                }
            } else {
                let num;
                num = BigInt(value);
                const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let result = "";
                while (num > 0n) {
                    let remainder = num % BigInt(base);
                    result = digits[Number(remainder)] + result;
                    num = num / BigInt(base);
                }

                if (result_needed) {
                    result_box.textContent = result;
                    result_box.style.color = "white";

                    buttonconvert.textContent = "Nombre converti !";

                    setTimeout(() => buttonconvert.textContent = "Convertir !", 1000);
                } else {
                    return result;
                }
            }
        } catch(e) {
            result_box.textContent = "Erreur lors de la conversion : " + e
            result_box.style.color = "red"
        }
    }
}

function invert() {
    const input = document.querySelector('input');
    const result_box = document.querySelector('#result');
    const button = document.getElementById('invert');

    const errorMessages = [
    "Veuillez entrer un nombre !",
    "Veuillez entrer une base pour convertir !",
    "Veuillez entrer une base comprise entre 2 et 36 !",
    "Veuillez entrer un nombre supérieur ou egal à 0 !",
    "Apparaîtra ici votre résultat",
    ];

    if (
        !errorMessages.includes(result_box.textContent) &&
        !result_box.textContent.startsWith("Caractère invalide") &&
        !result_box.textContent.startsWith("Erreur lors de la conversion")
    ) {
        input.value = result_box.textContent;
    } else {
        input.value = "";
        result_box.textContent = "Apparaîtra ici votre résultat";
        result_box.style.color = "gray";
        return;
    }
    result_box.textContent = "Apparaîtra ici votre résultat";
    result_box.style.color = "gray";

    button.textContent = "Résultat repris";

    setTimeout(() => button.textContent = "Reprendre le résultat !", 1000);
}

function convert16() {
    const result_box = document.querySelector('#result');
    const button = document.getElementById('convert16');

    let result16 = convert("invert", false);

    if (result16) {
        result_box.textContent = convert('convert', false, result16, 16);
        result_box.style.color = "white";

        button.textContent = "Nombre converti !";

        setTimeout(() => button.textContent = "Convertir base X en base 16 !", 1000);
    }
}

function reset() {
    const input = document.querySelector('input');
    const result_box = document.querySelector('#result');
    const base = document.getElementById('inputbase');
    const button = document.getElementById('reset');

    input.value = "";
    base.value = "";
    result_box.textContent = "Apparaîtra ici votre résultat";
    result_box.style.color = "gray";

    button.textContent = "Bi-vertisseur reset !";

    setTimeout(() => button.textContent = "Remettre tout à zéro !", 1000);
}

function showTuto() {
    const tuto = document.querySelector('.tuto');
    const button = document.getElementById('tutoBtn');
    
    tuto.classList.toggle('show');

    button.textContent = tuto.classList.contains('show') ? "Masquer les conseils !" : "Montrer les conseils !";
}
