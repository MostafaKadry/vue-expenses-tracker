<template>
    <div class="flex justify-center items-center py-4 my-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
      <div class="text-center">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
          Your Balance
        </p>
        <div class="flex items-center justify-center space-x-2">
          <span class="text-4xl font-bold text-gray-700 dark:text-gray-200">L.E</span>
          <p 
            class="text-4xl font-extrabold text-gray-900 dark:text-white"
            :class="{
              'text-green-600 dark:text-green-400': balance > 0,
              'text-red-600 dark:text-red-400': balance < 0
            }"
          >
            {{ formattedBalance }}
          </p>
        </div>
        <p 
          v-if="balanceChange !== null"
          class="mt-2 text-sm"
          :class="balanceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
        >
          <span v-if="balanceChange >= 0">↑</span>
          <span v-else>↓</span>
          {{ Math.round(Math.abs(balanceChange)) }}% from last period
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      balance: {
        type: Number,
        default: 0
      },
      balanceChange: {
        type: Number,
        default: null
      }
    },
    computed: {
      formattedBalance() {
        return Math.abs(this.balance).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
    }
  }
  </script>