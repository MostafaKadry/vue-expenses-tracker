<script setup>
import Balance from '../components/Balance.vue';
import IncomeExpense from '../components/IncomeExpense.vue';
import AddTransaction from '../components/AddTransaction.vue';

import { ref, watch, computed } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
}) 
console.log(props.transactions)

const emit = defineEmits(['add', 'edit', 'delete'])

const balance = computed(() => {
  return props.transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
  }, 0);
});

const income = computed(() => {
  return props.transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

const expense = computed(() => {
  return props.transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

const balanceChange = computed(() => null);
const incomeChange = computed(() => null);
const expenseChange = computed(() => null);

</script>

<template>
    <Balance :balance="balance" :balanceChange="balanceChange"/>
    <IncomeExpense :income="+income" :expense="+expense" :incomeChange="+incomeChange" :expenseChange="+expenseChange"/>
    <AddTransaction :transactions="transactions" @add="emit('add', $event)" />
</template>