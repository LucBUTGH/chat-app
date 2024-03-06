<script setup>
import { computed } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    message: {
        type: Object,
        required: true
    }
});

function formatDate(date) {
    let formattedDay = date.toLocaleDateString();
    let formattedTime = date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDay} à ${formattedTime}`;
}

const avatarUrl = computed(() => {
    if (!props.message.author.avatar_url)
        return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${props.message.author.username}`;
    return props.message.author.avatar_url;
});

const formattedDate = computed(() => {
    const date = new Date(props.message.created_at);
    return formatDate(new Date(date));
});

console.log(props.message);
const emit = defineEmits(['delete']);
</script>

<template>
    <div class="flex items-center hover:bg-discord_dark w-full">
        <img class="bg-slate-600 h-10 w-10 rounded-full mr-2" :src="avatarUrl" />
        <div>
            {{ message.author.username }}
            <span class="ml-2 text-xs text-opacity-40 text-gray-50">
                {{ formattedDate }}
            </span>
            <button @click="emit('delete', message.id)" class="p-2 ml-2 rounded-full">
                <TrashIcon class="w-4 h-4" />
            </button>
            <div>
                {{ message.content }}
            </div>
        </div>
    </div>
</template>
