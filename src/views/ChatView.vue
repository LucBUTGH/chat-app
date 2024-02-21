<script setup>
import { onMounted, ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { insertMessage, fetchMessage } from '@/api/message';


const { user } = storeToRefs(useUserStore());

const messageText = ref('');
const messageList = ref([]);
const textarea = ref(null)

onMounted(async () => {
    messageList.value = await fetchMessage();
    textarea.value.focus()
})

const  addMessage = async () => {

    if(!messageText.value) return;

    insertMessage(messageText.value, user.value.id);

    messageText.value = '';
    textarea.value.focus()
}

const deleteMessage = (id) => {
    messageList.value = messageList.value.filter((message) => message.id !== id)
}

</script>

<template>
    <AppNavbar/>
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
