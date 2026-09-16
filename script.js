    // Inisialisasi Elemen DOM
const incomeSource = document.querySelector('#income-source');
const incomeAmount = document.querySelector('#income-amount');
const addIncomeBtn = document.querySelector('#add-income-button');

const expenseTitle = document.querySelector('#expense-title');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseBtn = document.querySelector('#add-expense-btn');

const totalIncomeEl = document.querySelector('#total-income');
const totalExpenseEl = document.querySelector('#total-expense');
const balanceEl = document.querySelector('#balance');

const incomeList = document.querySelector('#income-list');
const expenseList = document.querySelector('#expense-list');
const resetBtn = document.querySelector('#reset-btn');

// Ambil Data dari LocalStorage
const localStorageIncomes = JSON.parse(localStorage.getItem('incomes'));
let incomes = localStorage.getItem('incomes') !== null ? localStorageIncomes : [];

const localStorageExpenses = JSON.parse(localStorage.getItem('expenses'));
let expenses = localStorage.getItem('expenses') !== null ? localStorageExpenses : [];

// Fungsi Membuat ID Acak
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Fungsi Tambah Pemasukan
function addIncome(e) {
    e.preventDefault();

    if (incomeSource.value.trim() === '' || incomeAmount.value.trim() === '') {
        alert('Mohon masukkan sumber dan jumlah pemasukan!');
        return;
    }

    const income = {
        id: generateID(),
        source: incomeSource.value.trim(),
        amount: parseFloat(incomeAmount.value)
    };

    incomes.push(income);
    addIncomeDOM(income);
    updateTotalAmount();
    updateLocalStorage();

    incomeSource.value = '';
    incomeAmount.value = '';
}

// Fungsi Tambah Pengeluaran
function addExpense(e) {
    e.preventDefault();

    if (expenseTitle.value.trim() === '' || expenseAmount.value.trim() === '') {
        alert('Mohon masukkan nama dan jumlah pengeluaran!');
        return;
    }

    const expense = {
        id: generateID(),
        title: expenseTitle.value.trim(),
        amount: parseFloat(expenseAmount.value)
    };

resetBtn.addEventListener('click', function () {
  const confirmReset = confirm(
    'Apakah Anda yakin ingin menghapus semua data pemasukan dan pengeluaran?'
    );

  if (!confirmReset) {
    return;
  }

  incomes = [];
  expenses = [];

  localStorage.removeItem('incomes');
  localStorage.removeItem('expenses');

  init();
});
     
expenses.push(expense);
addExpenseDOM(expense);
updateTotalAmount();
updateLocalStorage();

expenseTitle.value = '';
expenseAmount.value = '';
}

// Menampilkan Pemasukan ke Elemen List
function addIncomeDOM(income) {
    const li = document.createElement('li');
    li.classList.add('income-item');

    li.innerHTML = `
        <span>${income.source}</span>
        <div>
          <span class="item-amount">+Rp ${income.amount.toLocaleString('id-ID')}</span>
          <button class="delete-btn" onclick="removeIncome(${income.id})">X</button>
        </div>
      `;

      incomeList.appendChild(li);
}

// Menampilkan Pengeluaran ke Elemen List
function addExpenseDOM(expense) {
    const li = document.createElement('li');
    li.classList.add('expense-item');

    li.innerHTML = `
      <span>${expense.title}</span>
      <div>
        <span class="item-amount">-Rp ${expense.amount.toLocaleString('id-ID')}</span>
        <button class="delete-btn" onclick="removeExpense(${expense.id})">X</button>
      </div>
    `;

    expenseList.appendChild(li);
}

// Menghitung Total Pemasukan, Pengeluaran, dan Selisih
function updateTotalAmount() {
    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
    const balance = totalIncome - totalExpense;

    totalIncomeEl.innerText = `Rp ${totalIncome.toLocaleString('id-ID')}`;
    totalExpenseEl.innerText = `Rp ${totalExpense.toLocaleString('id-ID')}`;
    balanceEl.innerText = `Rp ${balance.toLocaleString('id-ID')}`;
}

// Fungsi Hapus Transaksi
function removeIncome(id) {
    incomes = incomes.filter(income => income.id !== id);
    updateLocalStorage();
    init();
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateLocalStorage();
    init();
}

// Simpan Perubahan ke LocalStorage
function updateLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Event Listener
addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);

// Inisialisasi Tampilan Pertama
function init() {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    incomes.forEach(addIncomeDOM);
    expenses.forEach(addExpenseDOM);

    updateTotalAmount();
}
init();