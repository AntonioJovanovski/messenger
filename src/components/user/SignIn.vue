<template>
    <div>
        <h4>Sign In</h4>
        <form @submit.prevent="signIn">
            <input v-model="logUser.user" placeholder="Username">
            <input type="password" v-model="logUser.password" placeholder="Password">
            <button type="button" @click="signIn">LOG</button>
        </form>


    </div>
</template>

<script setup>
import { userStore } from '../../stores/users'
import { reactive, ref } from 'vue';
import { chatsStore } from '../../stores/chats';
import { database } from '../../stores/databse';

const chat = chatsStore()
const dataFirebase = database()
const users = userStore()

const emit = defineEmits(['sign-in']);
const logUser = reactive({
    user: '',
    password: ''
})

const signIn = () => {
    users.logUser(logUser.user)
    emit('sign-in', logUser)

    const found = users.users.filter(user => user.name === logUser.user)
    findChat()
}

const found = []

const findChat = () => {
    for (const chatObject of chat.chat) {
        if (chatObject.by === logUser.user || chatObject.and === logUser.user) {
            chat.chatByUser.push(chatObject);
        }

    }

}

</script>