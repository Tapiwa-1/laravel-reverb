<template>
  
   

  <table class="table table-bordered table-hovered">
  <thead>
    <tr>
      <th scope="col">#</th>

      <th scope="col">Name</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="member in members?.data?.data" :key="member.id">
        <td>{{ member.id }}</td>
        <td>{{ member.name }}</td>
        <td>{{ member.email }}</td>
    </tr>
   
  </tbody>
</table>
</template>

<script lang="ts" setup>
import { GetMemberType } from '../actions/GetMembers';
defineProps<{
  members:GetMemberType
}>()
</script>

<style>

</style>