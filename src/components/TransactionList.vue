<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        <div class="flex space-x-2">
          <button 
            @click="filter = 'all'"
            :class="[
              'px-3 py-1 text-xs rounded-full',
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            All
          </button>
          <button 
            @click="filter = 'income'"
            :class="[
              'px-3 py-1 text-xs rounded-full',
              filter === 'income' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            Income
          </button>
          <button 
            @click="filter = 'expense'"
            :class="[
              'px-3 py-1 text-xs rounded-full',
              filter === 'expense' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            Expenses
          </button>
        </div>
      </div>
  
      <!-- Transaction List -->
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li 
          v-for="transaction in filteredTransactions" 
          :key="transaction.id"
          class="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
        >
          <div class="flex items-center justify-between">
            <!-- Left side - Category and Description -->
            <div class="flex items-center space-x-4">
              <div 
                :class="[
                  'p-3 rounded-full',
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' 
                    : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                ]"
              >
                <component 
                  :is="getCategoryIcon(transaction.category)" 
                  class="h-5 w-5"
                />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ transaction.description || 'No description' }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatCategory(transaction.category) }} • 
                  {{ formatDate(transaction.date) }}
                </p>
              </div>
            </div>
  
            <!-- Right side - Amount and Actions -->
            <div class="flex items-center space-x-4">
              <p 
                :class="[
                  'font-semibold',
                  transaction.type === 'income' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                ]"
              >
                {{ transaction.type === 'income' ? '+' : '-' }} 
                {{ formatCurrency(transaction.amount) }} L.E
              </p>
              <button 
                @click="$emit('edit', transaction)"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Edit transaction"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click="$emit('delete', transaction.id)"
                class="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                aria-label="Delete transaction"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </li>
  
        <!-- Empty State -->
        <li v-if="filteredTransactions.length === 0" class="px-6 py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No transactions found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{
              filter === 'all' 
                ? 'Get started by adding your first transaction' 
                : `No ${filter} transactions found`
            }}
          </p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { 
    BanknotesIcon,
    ShoppingBagIcon,
    HomeIcon,
    TruckIcon,
    FilmIcon,
    GiftIcon,
    WifiIcon,
    HeartIcon,
    AcademicCapIcon,
    BeakerIcon
  } from '@heroicons/vue/24/outline'
  
  export default {
    props: {
      transactions: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        filter: 'all'
      }
    },
    computed: {
      filteredTransactions() {
        if (this.filter === 'all') return this.transactions
        return this.transactions.filter(t => t.type === this.filter)
      }
    },
    methods: {
      formatCurrency(amount) {
        return amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      },
      formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      },
      formatCategory(category) {
        return category
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      },
      getCategoryIcon(category) {
        const icons = {
          salary: BanknotesIcon,
          shopping: ShoppingBagIcon,
          housing: HomeIcon,
          transportation: TruckIcon,
          entertainment: FilmIcon,
          gifts: GiftIcon,
          utilities: WifiIcon,
          healthcare: HeartIcon,
          education: AcademicCapIcon,
          other: BeakerIcon
        }
        return icons[category] || BeakerIcon
      }
    }
  }
  </script>