<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <!-- Income Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Income</h3>
            <p class="mt-1 text-2xl font-semibold text-green-600 dark:text-green-400">
              + {{ formattedIncome }} L.E
            </p>
          </div>
          <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p v-if="incomeChange" class="mt-2 text-xs text-green-600 dark:text-green-400">
          <span :class="incomeChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ incomeChange > 0 ? '↑' : '↓' }} {{ Math.abs(incomeChange) }}% from last period
          </span>
        </p>
      </div>
  
      <!-- Expense Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expenses</h3>
            <p class="mt-1 text-2xl font-semibold text-red-600 dark:text-red-400">
              - {{ formattedExpense }} L.E
            </p>
          </div>
          <div class="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <p v-if="expenseChange" class="mt-2 text-xs text-red-600 dark:text-red-400">
          <span :class="expenseChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
            {{ expenseChange > 0 ? '↑' : '↓' }} {{ Math.abs(expenseChange) }}% from last period
          </span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      income: {
        type: Number,
        default: 0
      },
      expense: {
        type: Number,
        default: 0
      },
      incomeChange: {
        type: Number,
        default: null
      },
      expenseChange: {
        type: Number,
        default: null
      }
    },
    computed: {
      formattedIncome() {
        return this.income.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      },
      formattedExpense() {
        return this.expense.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  };
  </script>