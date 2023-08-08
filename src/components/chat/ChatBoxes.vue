<template>
    <main>
        <div class="main-container">
            <div class="chat" v-for="info in chats" :key="info.id" @click="chatStore.selectChat(info.id)">
                <li :class="{ active: info.isSelected }"><i class="fa-regular fa-envelope"></i> Chat
                    <hr> {{ info.name }}
                </li>
            </div>
        </div>
    </main>
</template>
  
<script setup>
import { onMounted } from 'vue';

import { chatsStore } from '../../stores/chats';
import { database } from '../../stores/databse';
import { userStore } from '../../stores/users';


const chatStore = chatsStore()
const firebase = database()
const chats = chatStore.outputChats
const users = userStore()


</script>
  
<style scoped>
.active {
    color: white;
}

.main-container {
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.chat {
    margin: 10px;
    width: 160px;
    padding: 15px 10px 20px 10px;
    border-radius: 5px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    background: rgb(255, 208, 255);
    background: linear-gradient(321deg, rgba(255, 208, 255, 1) 0%, rgba(208, 208, 255, 1) 60%, rgba(145, 145, 255, 1) 100%);
    font-size: 14px;
}



.chat:hover {
    cursor: pointer;
}

@media only screen and (max-width: 600px) {
    .chat {
        margin: 10px;
        width: 320px;
        height: 50px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        background: rgb(208, 208, 255);
        font-size: 14px;
    }

    .main-container {
        height: 280px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
}
</style>