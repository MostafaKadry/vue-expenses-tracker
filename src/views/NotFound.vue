<template>
    <div class="flex flex-col items-center justify-center p-6 text-center">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <!-- Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
          <ExclamationTriangleIcon class="h-8 w-8 text-red-500" />
        </div>
        
        <!-- Text Content -->
        <div class="space-y-3">
          <h1 class="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>
          <p class="text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        
        <!-- Action Button -->
        <router-link 
          to="/"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <ArrowLeftIcon class="-ml-1 mr-2 h-4 w-4" />
          Go back home
        </router-link>
        

      </div>
    </div>
  </template>
  
  <script setup>
  import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';
  import { RouterLink } from 'vue-router';
  </script>