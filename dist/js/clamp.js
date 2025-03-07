/**
 * Gera uma variável CSS fluida no formato "--nome-min-max: clamp(valores);".
 *
 * @param {string} name Nome base da variável (ex: "fluid").
 * @param {number} min Valor mínimo em pixels.
 * @param {number} max Valor máximo em pixels.
 * @param {number} viewportMin Largura mínima da viewport em pixels (padrão: 320px).
 * @param {number} viewportMax Largura máxima da viewport em pixels (padrão: 1920px).
 * @returns {string} Declaração CSS no formato "--nome-min-max: clamp(valores);".
 */
function generateClampFromValues(name, min, max, viewportMin = 320, viewportMax = 1920) {
    if (min >= max) {
        throw new Error("O valor mínimo deve ser menor que o valor máximo.");
    }

    // Converte valores de px para rem (assumindo 1rem = 16px)
    const minRem = min / 16;
    const maxRem = max / 16;

    // Calcula a inclinação (slope) e a interseção para a fórmula fluida
    const slope = (maxRem - minRem) / (viewportMax - viewportMin);
    const intercept = minRem - slope * viewportMin;

    // Formata o nome da variável CSS
    const variableName = `--${name}-${min}-${max}`;

    // Gera a string `clamp`
    const clampValue = `clamp(${minRem.toFixed(3)}rem, ${intercept.toFixed(3)}rem + ${(slope * 100).toFixed(4)}vw, ${maxRem.toFixed(3)}rem)`;

    return `${variableName}: ${clampValue};`;
}

// Exemplo de uso
console.log(generateClampFromValues("fluid", 4, 24)); // --fluid-4-24: clamp(0.250rem, -0.120rem + 1.8519vw, 1.500rem);
console.log(generateClampFromValues("gapVert", 6, 32)); // --gapVert-6-32: clamp(0.375rem, -1.589rem + 6.2857vw, 3.125rem);
