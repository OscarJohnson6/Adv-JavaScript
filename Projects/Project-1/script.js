// Runs on webpage being open
const init = () => {
    const buttonListener = document.getElementById("submitButton");
    buttonListener.addEventListener("click", outputTaxResults);

    const clearPage = document.getElementById("resetButton");
    clearPage.addEventListener("click", clearDiv);
}

// Listener on submit button in form to output a tax table result.
const outputTaxResults = () => {
    const table = document.getElementById("resultsTables");
    const grossPay = document.getElementById("grossSalary").value || 0;
    const fedTax = calculateFederalTax(grossPay);
    const stateTax = calculateStateTax(grossPay);
    const medTax = calculateMedTax(grossPay);
    const ssnTax = calculateSsnTax(grossPay);
    const totalTax = fedTax + stateTax + ssnTax + medTax;
    const netTax = grossPay - totalTax;

    table.innerHTML = `<table class='min-w-full divide-y divide-gray-200'>`
                    + `<tr class='border-spacing-px border border-slate-600'>`;
                    + `<th class='px-6 py-3'>Gross Pay</th><td class='px-6 py-3'>$${grossPay}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>Federal Tax</th><td class='px-6 py-3'>$${Math.round(fedTax * 100) / 100}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>State Tax</th><td class='px-6 py-3'>$${Math.round(stateTax * 100) / 100}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>Medicare Tax</th><td class='px-6 py-3'>$${Math.round(medTax * 100) / 100}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>SSN Tax</th><td class='px-6 py-3'>$${Math.round(ssnTax * 100) / 100}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>Total Tax</th><td class='px-6 py-3'>$${Math.round(totalTax * 100) / 100}</td></tr>`
                    + `<tr class='border-spacing-px border border-slate-600'>`
                    + `<th class='px-6 py-3'>Net Tax</th><td class='px-6 py-3'>$${Math.round(netTax * 100) / 100}</td></tr>`
                    + `</table>`;

    document.body.appendChild(table);
}

// Empties div table when clear button clicked
const clearDiv = () => {
    const tableDiv = document.getElementById("resultsTables");
    tableDiv.innerHTML = "";
    document.body.appendChild(tableDiv);
}

// Calculation for federal tax
const calculateFederalTax = taxableIncome => {
    let rateAmount = 0;

    if (taxableIncome > 518400) {
        rateAmount += (taxableIncome - 518400) * 0.37;
        taxableIncome = 518400;
    }
    if (taxableIncome > 207350) {
        rateAmount += (Math.min(taxableIncome, 518400) - 207350) * 0.35;
        taxableIncome = 207350;
    }
    if (taxableIncome > 163300) {
        rateAmount += (Math.min(taxableIncome, 207350) - 163300) * 0.32;
        taxableIncome = 163300;
    }
    if (taxableIncome > 85525) {
        rateAmount += (Math.min(taxableIncome, 163300) - 85525) * 0.24;
        taxableIncome = 85525;
    }
    if (taxableIncome > 40125) {
        rateAmount += (Math.min(taxableIncome, 85525) - 40125) * 0.22;
        taxableIncome = 40125;
    }
    if (taxableIncome > 9875) {
        rateAmount += (Math.min(taxableIncome, 40125) - 9875) * 0.12;
        taxableIncome = 9875;
    }

    return rateAmount += Math.min(taxableIncome, 9875) * 0.1;
}

// Calculation for state tax
const calculateStateTax = income => {
    let result = 0;

    if (income > 23930) {
        result += (income - 23930) * 0.0627;
        income = 23930;
    }
    if (income > 11970) {
        result += (Math.min(income, 23930) - 11970) * 0.0465;
        income = 11970;
    }

    return result += Math.min(income, 11970) * 0.0354;
}

// Calculation for social security tax
const calculateSsnTax = income => {
    return Math.min(income, 137000) * .062;
}

// Calculation for medicare tax
const calculateMedTax = income => {
    let result = income * .0145;

    if (income > 200000) {
        result += (income - 20000) * .009;
    }

    return result;
}

window.onload = init;