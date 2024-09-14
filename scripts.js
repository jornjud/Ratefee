document.addEventListener('DOMContentLoaded', function() {
    createFeeTable('bank');
});

function calculateFee(amount, type) {
    if (type === 'bank') {
        if (amount <= 500) return 20;
        return Math.ceil(amount / 10000) * 40;
    } else if (type === 'trueMoney') {
        if (amount <= 300) return 5;
        if (amount <= 500) return 10;
        if (amount <= 1000) return 15;
        return Math.ceil(amount / 10000) * 40;
    }
    return 0;
}

function updateFeeDisplay() {
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fee = calculateFee(amount, type);
    document.getElementById('fee').textContent = fee.toLocaleString();
    document.getElementById('calculatedAmount').textContent = amount.toLocaleString();
}

function createFeeTable(type) {
    const tableBody = document.querySelector('#feeTable tbody');
    tableBody.innerHTML = '';

    let ranges;
    if (type === 'bank') {
        ranges = [
            {min: 1, max: 800, fee: 20},
            {min: 801
			 , max: 10000, fee: 40},
            {min: 10001, max: 20000, fee: 80},
            {min: 20001, max: 30000, fee: 120},
            {min: 30001, max: 40000, fee: 160},
            {min: 40001, max: 50000, fee: 200},
            {min: 50001, max: 100000, fee: 400},
            {min: 100001, max: 'ขึ้นไป', fee: 'เพิ่ม 40 บาท ต่อทุก 10,000 บาท'}
        ];
    } else if (type === 'trueMoney') {
        ranges = [
            {min: 1, max: 300, fee: 5},
            {min: 301, max: 500, fee: 10},
            {min: 501, max: 1000, fee: 15},
            {min: 1001, max: 10000, fee: 40},
            {min: 10001, max: 20000, fee: 80},
            {min: 20001, max: 30000, fee: 120},
            {min: 30001, max: 40000, fee: 160},
            {min: 40001, max: 50000, fee: 200},
            {min: 50001, max: 100000, fee: 400},
            {min: 100001, max: 'ขึ้นไป', fee: 'เพิ่ม 40 บาท ต่อทุก 10,000 บาท'}
        ];
    }

    ranges.forEach(range => {
        const row = document.createElement('tr');
        const maxDisplay = typeof range.max === 'number' ? range.max.toLocaleString() : range.max;
        const feeDisplay = typeof range.fee === 'number' ? range.fee.toLocaleString() : range.fee;
        row.innerHTML = `
            <td data-label="ยอดโอน (บาท)" class="fee-range">${range.min.toLocaleString()} - ${maxDisplay}</td>
            <td data-label="ตัวอย่างจำนวนเงิน" class="fee-example">${range.max === 'ขึ้นไป' ? '-' : maxDisplay}</td>
            <td data-label="ค่าบริการ (บาท)" class="fee-value">${feeDisplay}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('type').addEventListener('change', function() {
    createFeeTable(this.value);
    updateFeeDisplay();
});

document.getElementById('amount').addEventListener('input', updateFeeDisplay);