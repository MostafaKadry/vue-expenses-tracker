<script setup>
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';
import SuccessToast from './components/SuccessToast.vue'
import FaildToast from './components/FaildToast.vue'
import { ref, watch } from 'vue'

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
])

const balance = ref(0);
const balanceChange = ref(null);
const showSuccessToast = ref(false)
const showFaildToast = ref(false)
const message = ref('')


const income = ref(0);
const expense = ref(0);

const incomeChange = ref(null);
const expenseChange = ref(null);

const addTransaction = (transaction) => {
  if (!transaction.type || !transaction.amount || !transaction.category || !transaction.date){
    message.value = 'Please fill all required fields'
    showFaildToast.value = true;
    return
  }
  if(typeof transaction.amount !== 'number'){
    message.value = 'Amount must be a number'
    showFaildToast.value = true
    return
  } 
  else if (transaction.type === 'expense' && transaction.amount > balance.value){
    message.value = 'You don\'t have enough balance'
    showFaildToast.value = true
    return
  } 
  
  // Create a new transaction object with a unique ID
  const newTransaction = {
    ...transaction,
    id: Date.now(), // Generate a unique ID using timestamp
    amount: parseFloat(transaction.amount) // Ensure amount is a number
  };
  
  // Use array spread to create a new array for Vue's reactivity
  transactions.value = [...transactions.value, newTransaction];
  
  message.value = 'Transaction added successfully'
  showSuccessToast.value = true

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
watch(showSuccessToast, () => {
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
})
watch(showFaildToast, () => {
  setTimeout(() => {
    showFaildToast.value = false
  }, 3000)
})
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <Header />
    <RouterView v-slot="{ Component, route }">
        <component
          :is="Component"
          :key="route.path"
          :transactions="transactions"
          @add="addTransaction"
          @edit="editTransaction"
          @delete="deleteTransaction"
          class="py-4"
        />
      </RouterView>

    
    <SuccessToast 
      :message="message" 
      :success="showSuccessToast" 
    
    />
    <FaildToast 
      :message="message" 
      :faild="showFaildToast"
    
    />
  </div>
</template>

