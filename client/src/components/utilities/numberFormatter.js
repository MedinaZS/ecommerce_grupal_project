const numberFormatter = (number) => {
    let numberFormatted = new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG' }).format(Number(number));
    if (numberFormatted === 'NaN') {
        numberFormatted = '0';
    }
    return numberFormatted;
}

export { numberFormatter as default };