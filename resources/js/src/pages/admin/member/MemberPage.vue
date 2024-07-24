<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12 col-lg-10">
            <div class="card">
                <div class="card-header">
                    Members
                    <RouterLink style="float: right;" to="/create-members" class="btn btn-primary">Create Member</RouterLink>
                </div>
                <div class="card-body">
                
                    <MemberTable :members="memberData"/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import MemberTable from './components/MemberTable.vue';
import { onMounted } from 'vue';
import { useGetMembers } from './actions/GetMembers';

const { getMembers, loading,memberData} = useGetMembers()

async function showListOfMembers(){
    
    await getMembers()
}
onMounted(async ()=>{
    showListOfMembers()
    
})
</script>

<style>

</style>