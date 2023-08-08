<template>
    <div>
        <div class="main-display">
            <div class="display">
                <div class="user-one" v-for="msg in messages">
                    <li>{{ msg }}</li>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <form @submit.prevent="sendMessage">
                <input v-model="message" placeholder="Send a message">
                <i @click="sendMessage" class="fa-regular fa-paper-plane"></i>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { chatsStore } from '../../stores/chats.js';
import { userStore } from '../../stores/users';
import { database } from '../../stores/databse';
const chats = chatsStore()
const users = userStore()
const firebase = database()

const message = ref('')


const messages = computed(() => {
    if (chats.chat[0]) {
        return chats.outputSelected[0].messages
    }
})

const sendMessage = () => {
    if (message.value === '') {
        return
    }
    chats.pushMessage(message.value, users.loggedUser[0].name)
    message.value = ''
}

onMounted(() => {
    /*  firebase.getChats()
     console.log(chats.chat); */
})





</script>

<style scoped>
i {
    color: rgb(0, 100, 255);
}

i:hover {
    cursor: pointer;
}

.display {
    width: 400px;
    height: 400px;
    background-color: rgba(164, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 20px;
    position: relative;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}

li {
    background-color: rgb(255, 255, 255);
    margin: 5px 0;
    width: fit-content;
    border-radius: 20px;
    padding: 10px;
    font-size: 12px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
}

form {
    text-align: center;
}

input {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    outline: none;
    border: none;
}

@media only screen and (max-width: 600px) {
    .display {
        width: 320px;
        margin-top: 20px;
    }
}
</style>    