<script setup>
import { onMounted, ref } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import {
    messageList,
    insertMessage,
    deleteMessageFromDB,
    fetchMessage,
    subscribeToMessage
} from '@/api/message';

const { user } = storeToRefs(useUserStore());

const messageText = ref('');
const textarea = ref(null);

onMounted(async () => {
    await fetchMessage();
    textarea.value.focus();
    scrollToBottom();
});

subscribeToMessage();

const addMessage = async () => {
    if (!messageText.value) return;

    insertMessage(messageText.value, user.value.id);

    messageText.value = '';
    textarea.value.focus();
};

const messageContainer = ref(null);

const scrollToBottom = () => {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
};
</script>

<template>
    <div class="flex flex-col overflow-hidden h-full">
        <AppNavbar />
        <div class="overflow-auto grow" ref="messageContainer">
            <div v-for="(message, index) in messageList" class="p-4" :key="index">
                <ChatMessage
                    @delete="deleteMessageFromDB(message.id)"
                    :message="message"
                ></ChatMessage>
            </div>
        </div>

        <div class="flex align-center p-4">
            <textarea
                ref="textarea"
                @keyup.enter.exact="addMessage"
                v-model="messageText"
                name="message"
                id="message"
                rows="1"
                class="bg-discord_light resize-none rounded-md mx-auto w-full p-2 text-white"
                placeholder="Envoyer un message"
            >
            </textarea>
            <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
        </div>
    </div>
</template>
@/api/messages@/api/message
