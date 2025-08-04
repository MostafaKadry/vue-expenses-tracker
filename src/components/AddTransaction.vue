<template>
  <div class="flex items-center justify-center my-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full">
      <SuccessToast message="Transaction added successfully" :success="showSuccessToast" />
      <FaildToast message="Transaction deleted successfully" />
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ editingTransaction ? 'Edit Transaction' : 'Add New Transaction' }}
        </h2>
        <button class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="px-6 py-4">
        <!-- Type Toggle -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <div class="flex rounded-md shadow-sm">
            <button type="button" @click="form.type = 'income'" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-l-md border focus:z-10 focus:outline-none',
              form.type === 'income'
                ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-600 dark:text-green-200'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
            ]">
              Income
            </button>
            <button type="button" @click="form.type = 'expense'" :class="[
              'flex-1 py-2 px-4 text-sm font-medium rounded-r-md border focus:z-10 focus:outline-none',
              form.type === 'expense'
                ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-600 dark:text-red-200'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
            ]">
              Expense
            </button>
          </div>
        </div>

        <!-- Amount -->
        <div class="mb-4">
          <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount
            (L.E)</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">
                {{ form.type === 'income' ? '+' : '-' }}
              </span>
            </div>
            <input type="number" id="amount" v-model="form.amount" step="0.01" min="0"
              class="block w-full pl-8 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00" required />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">L.E</span>
            </div>
          </div>
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select id="category" v-model="form.category"
            class="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            required>
            <option value="" disabled>Select a category</option>
            <option v-for="category in filteredCategories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </div>

        <!-- Date -->
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <input type="date" id="date" v-model="form.date"
            class="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            required />
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description
            (Optional)</label>
          <textarea id="description" v-model="form.description" rows="3"
            class="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            placeholder="Add any details about this transaction..."></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3">
          <button type="button"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {{ editingTransaction ? 'Update' : 'Add' }} Transaction
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SuccessToast from './SuccessToast.vue'
import FaildToast from './FaildToast.vue'

// Props
const props = defineProps({
  editingTransaction: {
    type: Object,
    default: null
  }
})
const showSuccessToast = ref(false)
const showFaildToast = ref(false)
// Emits
const emit = defineEmits(['add', 'update'])

// Reactive form state
const form = ref({
  type: 'expense',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: ''
})

// Category options
const categories = [
  // Income
  { value: 'salary', label: 'Salary', type: 'income' },
  { value: 'freelance', label: 'Freelance', type: 'income' },
  { value: 'investment', label: 'Investment', type: 'income' },
  { value: 'gift', label: 'Gift', type: 'income' },
  { value: 'other_income', label: 'Other Income', type: 'income' },

  // Expense
  { value: 'housing', label: 'Housing', type: 'expense' },
  { value: 'transportation', label: 'Transportation', type: 'expense' },
  { value: 'food', label: 'Food', type: 'expense' },
  { value: 'utilities', label: 'Utilities', type: 'expense' },
  { value: 'healthcare', label: 'Healthcare', type: 'expense' },
  { value: 'entertainment', label: 'Entertainment', type: 'expense' },
  { value: 'shopping', label: 'Shopping', type: 'expense' },
  { value: 'education', label: 'Education', type: 'expense' },
  { value: 'other_expense', label: 'Other Expense', type: 'expense' }
]

// Computed filtered categories
const filteredCategories = computed(() => {
  return categories.filter(cat => cat.type === form.value.type)
})

// Watch for editingTransaction changes
watch(
  () => props.editingTransaction,
  (newVal) => {
    if (newVal) {
      form.value = {
        ...newVal,
        date: newVal.date.split('T')[0]
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Methods
function resetForm() {
  form.value = {
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  }
}

function handleSubmit() {
  const transactionData = {
    ...form.value,
    amount: parseFloat(form.value.amount),
    date: new Date(form.value.date).toISOString()
  }

  if (props.editingTransaction) {
    emit('update', {
      id: props.editingTransaction.id,
      ...transactionData
    })
  } else {
    emit('add', transactionData)
  }

  resetForm()
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)

}


if (showSuccessToast.value) {
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

if (showFaildToast.value) {
  setTimeout(() => {
    showFaildToast.value = false
  }, 3000)
}

</script>