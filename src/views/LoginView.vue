<script setup>
import { ref } from 'vue';
import { supabase } from '../../supabase';
import { useRouter } from 'vue-router';
import AppButton from '@/components/AppButton.vue';

const { push: routerPush } = useRouter();
const email = ref('');
const password = ref('');

const onSubmit = async () => {
    if (!email.value || !password.value) return;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });
    if (error) {
        alert(error.message);
    } else {
        routerPush({ name: 'chat' });
    }
    return data;
};
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2 p-4 mx-auto max-w-96">
        <div class="flex flex-col">
            <label for="email">Email</label>
            <input
                placeholder="Entrez un mail valide"
                type="email"
                id="email"
                v-model="email"
                class="p-2 bg-slate-500"
                required
            />
        </div>
        <div class="flex flex-col">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" class="p-2 bg-slate-500" />
        </div>
        <AppButton> Se connecter </AppButton>
    </form>
</template>
