<script setup>
import { computed } from 'vue';

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

const formattedDate = computed(() => {
    const date = props.message.date;
    return formatDate(date);
});

</script>

<template>
    <div class="flex hover:bg-discord_dark w-full">
        <img class="bg-slate-600 h-10 w-10 rounded-full mr-2" :src="message.user.avatarUrl">
        <div>
            {{ message.user.username }}
            <span class="ml-2 text-xs text-opacity-40 text-gray-50">        
                {{ formattedDate }}
            </span>
            <div>
                {{ message.text }}
            </div>
        </div>
    </div>
</template>
