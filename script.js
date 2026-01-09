function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

/* ================= VEHICLES ================= */
let vehicles = [];
let editVehicle = -1;

function saveVehicle() {
    let v = {
        number: vNumber.value,
        model: vModel.value,
        type: vType.value,
        capacity: vCapacity.value
    };

    if (!v.number || !v.model) return alert("Fill required fields");

    if (editVehicle === -1) vehicles.push(v);
    else vehicles[editVehicle] = v;

    editVehicle = -1;
    vNumber.value = vModel.value = vType.value = vCapacity.value = "";
    renderVehicles();
}

function renderVehicles() {
    vehicleTable.innerHTML = "";
    vehicles.forEach((v, i) => {
        vehicleTable.innerHTML += `
        <tr>
            <td>${v.number}</td>
            <td>${v.model}</td>
            <td>${v.type}</td>
            <td>${v.capacity}</td>
            <td>
                <button class="edit" onclick="editV(${i})">Edit</button>
                <button class="delete" onclick="delV(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

function editV(i) {
    let v = vehicles[i];
    vNumber.value = v.number;
    vModel.value = v.model;
    vType.value = v.type;
    vCapacity.value = v.capacity;
    editVehicle = i;
}

function delV(i) {
    vehicles.splice(i, 1);
    renderVehicles();
}

/* ================= DRIVERS ================= */
let drivers = [];
let payments = [];
let editDriver = -1;
let selectedDriver = -1;

function saveDriver() {
    let d = {
        name: dName.value,
        phone: dPhone.value,
        altPhone: dAltPhone.value,
        dl: dDL.value,
        address: dAddress.value,
        salaryType: dSalaryType.value,
        salary: Number(dSalary.value),
        taken: 0
    };

    if (!d.name || d.salary <= 0) return alert("Invalid data");

    if (editDriver === -1) drivers.push(d);
    else {
        d.taken = drivers[editDriver].taken;
        drivers[editDriver] = d;
    }

    editDriver = -1;
    dName.value = dPhone.value = dAltPhone.value = dDL.value = dAddress.value = dSalary.value = "";
    renderDrivers();
}

function renderDrivers() {
    driverTable.innerHTML = "";
    drivers.forEach((d, i) => {
        driverTable.innerHTML += `
        <tr onclick="selectD(${i})">
            <td>${d.name}</td>
            <td>${d.phone}</td>
            <td>${d.dl}</td>
            <td>${d.salary}</td>
            <td>${d.taken}</td>
            <td>${d.salary - d.taken}</td>
            <td>
                <button class="edit" onclick="event.stopPropagation();editD(${i})">Edit</button>
                <button class="delete" onclick="event.stopPropagation();delD(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

function editD(i) {
    let d = drivers[i];
    dName.value = d.name;
    dPhone.value = d.phone;
    dAltPhone.value = d.altPhone;
    dDL.value = d.dl;
    dAddress.value = d.address;
    dSalaryType.value = d.salaryType;
    dSalary.value = d.salary;
    editDriver = i;
}

function delD(i) {
    drivers.splice(i, 1);
    payments = payments.filter(p => p.driver !== i);
    selectedDriver = -1;
    renderDrivers();
    paymentTable.innerHTML = "";
}

function selectD(i) {
    selectedDriver = i;
    renderPayments();
}

/* ================= PAYMENTS ================= */
function addPayment() {
    if (selectedDriver === -1) return alert("Select driver");

    let amt = Number(pAmount.value);
    let driver = drivers[selectedDriver];

    if (driver.taken + amt > driver.salary)
        return alert("Advance salary se zyada");

    driver.taken += amt;

    payments.push({
        driver: selectedDriver,
        date: pDate.value,
        amount: amt,
        reason: pReason.value
    });

    pAmount.value = pReason.value = "";
    renderDrivers();
    renderPayments();
}

function renderPayments() {
    paymentTable.innerHTML = "";
    payments.filter(p => p.driver === selectedDriver)
        .forEach(p => {
            paymentTable.innerHTML += `
            <tr>
                <td>${p.date}</td>
                <td>${p.amount}</td>
                <td>${p.reason}</td>
            </tr>`;
        });
}
