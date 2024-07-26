<template>
  <div class="row">
    <div class="row">
      <div class="col-md-4">
        <input type="text" @keydown="search" v-model="query" class="form-control" placeholder="Search...">
        <span style="color: blue;" v-show="loading == true?true:false"><b>Loading</b></span>
      </div>
    </div>
    <div class="row">
        <table class="table table-hovered table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members?.data?.data" :key="member.id">
                <td>{{ member.id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>
                  <button class="btn btn-outline-primary" @click="emit('editMember',member)">Edit</button>
                </td>
            </tr>
          
          </tbody>
        </table>
        <slot name="pagination"></slot>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { GetMemberType, MemberType } from '../actions/GetMembers';
import { myDebounce} from '../../../../helper/util'
defineProps<{
  members:GetMemberType;
  loading:boolean;
}>()

const emit = defineEmits<{
    (e: "editMember", member: MemberType): void;
    (e: "getMember", page:number,query: string,): Promise<void>;
}>();

const query = ref("");
const search = myDebounce(async function () {
    await emit("getMember",1,query.value,);
}, 200);
</script>

<style>

</style>