<script setup>
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue';

const messageText = ref('');
const messageList = ref([]);
const textarea = ref(null)

const addMessage = () => {
    if(!messageText.value){
        return;
    }

    messageList.value.push({
        id: Math.random().toString(32).slice(2),
        text: messageText.value,
        date: new Date(),
        user: {
            username: 'Kuramaa',
            avatarUrl: 'https://media.tenor.com/EFw1DIQfx5kAAAAC/reshiram-pokemon-reshiram.gif'
        }
    });
    messageText.value = '';
    textarea.value.focus()
}

const deleteMessage = (id) => {
    messageList.value = messageList.value.filter((message) => message.id !== id)
}

</script>

<template>
    <div>
        <div v-for="(message, index) in messageList" class="p-4" :key="index">
            <ChatMessage @delete="deleteMessage" :message="message"></ChatMessage>
        </div>
        
        <div class="flex align-center mx-auto fixed bottom-0 left-0 right-0 p-4" >
            <textarea
                ref="textarea"
                @keyup.enter.exact="addMessage"
                v-model="messageText" name="message" id="message" rows="1" 
                class="bg-discord_light resize-none rounded-md mx-auto w-full p-2 text-white" 
                placeholder="Envoyer un message">
            </textarea>
            <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
        </div>
    </div>
</template>
