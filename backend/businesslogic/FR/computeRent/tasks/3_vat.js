export default function(contract, rentDate, previousRent, settlements, rent) {
    if (contract.vatRate) {
        const rate = contract.vatRate || 0;

        rent.preTaxAmounts.forEach((preTaxAmount) => {
            rent.vats.push({
                description: `${preTaxAmount.description} T.V.A. (${rate*100}%)`,
                amount: preTaxAmount.amount*rate,
                rate
            });
        });

        rent.charges.forEach((charges) => {
            rent.vats.push({
                description: `${charges.description} T.V.A. (${rate*100}%)`,
                amount: charges.amount*rate,
                rate
            });
        });

        rent.discounts.forEach((discount) => {
            rent.vats.push({
                description: `${discount.description} T.V.A. (${rate*100}%)`,
                amount: discount.amount*rate*(-1),
                rate
            });
        });
    }

    return rent;
}
