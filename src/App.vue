<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref } from 'vue';

const balance = ref(0);
const balanceChange = ref(null);

const transactions = ref([
  {
    id: 1,
    type: 'income',
    amount: 1000,
    category: 'salary',
    date: '2023-01-01',
    description: 'Salary for January'
  },
  {
    id: 2,
    type: 'expense',
    amount: 500,
    category: 'housing',
    date: '2023-01-02',
    description: 'Rent for January'
  }
]);

const income = ref(0);
const expense = ref(0);

const incomeChange = ref(null);
const expenseChange = ref(null);

const addTransaction = (transaction) => {
  transactions.value.push(transaction);
  updateTotals();
};

const updateTotals = () => {
  income.value = transactions.value
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
  expense.value = transactions.value
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
  balance.value = income.value - expense.value;
  updateChanges();
};


const updateChanges = () => {
  incomeChange.value = calculateChange(income.value);
  expenseChange.value = calculateChange(expense.value);
};

const calculateChange = (value) => {
  const lastPeriodValue = transactions.value
    .filter(t => t.type === 'income' || t.type === 'expense')
    .slice(-1)[0]
    ?.amount || 0;
  return lastPeriodValue === 0 ? null : (((value - lastPeriodValue) / lastPeriodValue) * 100).toFixed(2);
};

const editTransaction = (transaction) => {
  transactions.value = transactions.value.map(t => t.id === transaction.id ? transaction : t);
  updateTotals();
};

const deleteTransaction = (id) => {
  transactions.value = transactions.value.filter(t => t.id !== id);
  updateTotals();
};

updateTotals();
</script>

<template>
  <div class="container mx-auto">
    <!-- <Header /> -->
    <!-- <Hero /> -->
    <Balance :balance="balance" :balanceChange="balanceChange"/>
    <IncomeExpense :income="+income" :expense="+expense" :incomeChange="+incomeChange" :expenseChange="+expenseChange"/>
    <TransactionList :transactions="transactions"/>
    <AddTransaction @add="addTransaction" @edit="editTransaction" @delete="deleteTransaction" />
  </div>
</template>

<style scoped>
</style>
