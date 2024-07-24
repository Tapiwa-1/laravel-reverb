<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-lg-6">
                <form @submit.prevent="createOrUpdate">
                    <div class="form-group">
                        <Error label="Name" :errors="v$.name.$errors">
                            <BaseInput v-model="memberInput.name" />
                        </Error>
                    </div>
                    <div class="form-group">
                        <Error label="E-mail" :errors="v$.email.$errors">
                            <BaseInput v-model="memberInput.email" />
                        </Error>
                    </div>
                    <br/>
                    <RouterLink to="/members">See Members List</RouterLink>
                    <br/>

                    <div class="form-group">
                        <!-- <BaseBtn :class="memberStore.edit
                         ? 'btn btn-warning':'btn btn-primary'" 
                         :label="memberStore.edit?'Update Member':'Create Member'" 
                         :loading="loading" /> -->
                         <BaseBtn label="Create Member" :loading="loading"/>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import BaseInput from "../../../components/BaseInput.vue";
import BaseBtn from "../../../components/BaseBtn.vue";
import Error from "../../../components/Error.vue";
import { memberInput, useCreateOrUpdateMember } from "./actions/createMember";

const rules = {
    email: { required, email }, // Matches state.firstName
    name: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, memberInput);
const { loading, createOrUpdate } = useCreateOrUpdateMember();
async function submitMember() {
    const result = await v$.value.$validate();

    if (!result) return;

    await createOrUpdate();
    v$.value.$reset()

}
</script>

<style scoped>

</style>