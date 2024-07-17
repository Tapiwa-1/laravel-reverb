<script lang="ts" setup>
import { ref } from 'vue';
const count = ref<number>(0)
</script>

<template>
    <div class="container">
         <RouterView/>
    </div>
</template>