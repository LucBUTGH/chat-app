<script setup>
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { supabase } from '../../supabase';
import router from '@/router';
import { ref } from 'vue';

const { user } = storeToRefs(useUserStore())

const loading = ref(false)

const signOut = async () => {
    loading.value = true;
    await supabase.auth.signOut();
    router.push({name: 'login'})
}

</script>

<template>
    <header class="flex items-align p-2">
        <div>Username : 
            <span class="hover: underline"> {{  user?.username }} </span>
        </div>
        <button @click="signOut" class="ml-auto outline rounded-lg p-2">
        <span v-if=loading>...</span>
        <span v-else>Se déconnecter</span>
        </button>
    </header>
</template>