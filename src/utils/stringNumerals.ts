/**
 * Liczebnik główny
 *
 * Pytanie: ile? dwa, trzy, siedem, piętnaście
 */
export const numberToPolishNumeral = (
    comments: number,
    {
        one,
        many,
        exceptions,
    }: any,
) => {
    comments = Math.abs(comments);

    const onesDigit = comments % 10;
    const tensInRange = comments % 100;

    if (comments === 1) {
        return one;
    }

    if (onesDigit >= 2 && onesDigit <= 4 && (tensInRange < 10 || tensInRange >= 20)) {
        return exceptions;
    }

    return many;
};

/**
 * Liczebniki porządkowe
 *
 * Pytanie: który z kolei? drugi, trzecia, siódmy, piętnaste
 */
export const numberToPolishOrdinalNumeral = (
    comments: number, {
        one,
        many,
        exceptions,
    }: any,
) => {
    comments = Math.abs(comments);

    const onesDigit = comments % 10;
    const tensInRange = comments % 100;

    if (onesDigit === 1 && tensInRange !== 11) {
        return one;
    }

    if (onesDigit >= 2 && onesDigit <= 4 && (tensInRange < 10 || tensInRange >= 20)) {
        return exceptions;
    }

    return many;
};

/**
 * TODO:
 * Liczebniki zbiorowe – dwoje, troje, czworo, pięcioro, sześcioro, dwadzieścioro dwoje, dwadzieścioro troje
 * Liczebniki ułamkowe – półtora, trzy czwarte, pięć siódmych
 * Liczebniki nieokreślone – kilka, kilkanaście, kilkadziesiąt, wiele, dużo, sporo, moc
 * Liczebniki mnożne – podwójnie, trzykrotnie, potrójny
 * Liczebniki wielorakie – dwojako, trojako
 */
