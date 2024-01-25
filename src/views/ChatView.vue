<script setup>
import {ref} from 'vue'
import ChatMessage from '@/components/ChatMessage.vue';

const messageText = ref('je suis un message');
const messageList = ref([]);

const addMessage = () => {
    if(!messageText.value){
        return;
    }

    messageList.value.push({
        text: messageText.value,
        date: new Date(),
        user: {
            username: 'Kuramaa',
            avatarUrl: 'https://media1.tenor.com/m/WdiSwx1hWEAAAAAC/reshiram-pokemon.gif'
        }
    });
    messageText.value = '';
}

</script>

<template>
    <div v-for="(message, index) in messageList" class="p-4" :key="index">
        <chat-message :message="message"></chat-message>
    </div>
    <div class="flex align-center">
        <textarea v-model="messageText" name="message" id="message" rows="1" class="text-black rounded-md"></textarea>
        <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
    </div>
</template>