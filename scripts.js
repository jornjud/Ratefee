document.addEventListener('DOMContentLoaded', function() {
    createFeeTable('bank');
});

function calculateFee() {
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    let fee = 0;

    if (type === 'bank') {
        if (amount <= 500) fee = 20;
        else if (amount <= 10000) fee = 40;
        else if (amount <= 20000) fee = 80;
        else if (amount <= 100000) fee = 100;
    } else if (type === 'trueMoney') {
        if (amount <= 500) fee = 15;
        else if (amount <= 10000) fee = 30;
        else if (amount <= 20000) fee = 60;
        else if (amount <= 100000) fee = 75;
    }

    document.getElementById('fee').textContent = fee.toFixed(2);
}

function createFeeTable(type) {
    const tableBody = document.querySelector('#feeTable tbody');
    tableBody.innerHTML = '';

    let ranges;
    if (type === 'bank') {
        ranges = [
            {min: 1, max: 500, fee: 20},
            {min: 501, max: 10000, fee: 40},
            {min: 10001, max: 20000, fee: 80},
            {min: 20001, max: 100000, fee: 100}
        ];
    } else if (type === 'trueMoney') {
        ranges = [
            {min: 1, max: 500, fee: 15},
            {min: 501, max: 10000, fee: 30},
            {min: 10001, max: 20000, fee: 60},
            {min: 20001, max: 100000, fee: 75}
        ];
    }

    ranges.forEach(range => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${range.min} - ${range.max}</td><td>${range.fee}</td>`;
        tableBody.appendChild(row);
    });
}

document.getElementById('type').addEventListener('change', function() {
    createFeeTable(this.value);
});
