<template>
    <div>
        <nav>
            <div v-if="!props.log" class="disclaimer">
                <p>Disclaimer</p>
                <hr>
                <p>This is a site to showcase skills. Every username, password and message are stored and can be viewed.
                    Create passwords that you don't use anywhere else, and don't send any sensitive messages.</p>
            </div>
            <div v-if="props.log">
                <h3>User: {{ name }}</h3>
                <p>Active chat: {{ activeChat }}</p>
            </div>
            <div class="log">
                <register-as-user v-if="!props.log"></register-as-user>
                <sign-in @sign-in="emit" v-if="!props.log"></sign-in>
            </div>
            <button v-if="props.log" @click="logout">Logout</button>
        </nav>
    </div>
</template>

<script setup>

import { computed, defineEmits } from 'vue';

import SignIn from './user/SignIn.vue';
import RegisterAsUser from './user/RegisterAsUser.vue';

import { chatsStore } from '../stores/chats';
import { userStore } from '../stores/users'
const emits = defineEmits(['sign-in']);
const chats = chatsStore()
const users = userStore()

const props = defineProps(['log'])

const emit = (value) => {
    emits('sign-in', value)
}

const logout = () => {
    users.loggedUser = []
    emits('logout')
}

const activeChat = computed(() => {
    if (chats.outputSelected[0].name) {
        return chats.outputSelected[0].name
    } else {
        return 'No chat selected'
    }
})
const name = computed(() => {
    if (users.loggedUser[0]) {
        return users.loggedUser[0].name
    }
})


</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: rgb(0, 255, 255);
    background: linear-gradient(321deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.5) 43%, rgba(0, 0, 0, 0.3) 100%);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    color: white;

}

nav p {
    font-size: 14px;
}

button {
    height: 40px;
}

.log {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
@media only screen and (max-width: 600px) {
    .log {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}
   
}
</style>