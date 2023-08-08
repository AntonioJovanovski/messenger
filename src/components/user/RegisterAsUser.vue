<template>
    <div>
        <div class="user-form">
            <h4>Register</h4>
            <form @submit.prevent="createUser">
                <input type="text" placeholder="Username" v-model="register.username">
                <input type="password" placeholder="Password" v-model="register.password">
                <button type="button" @click="createUser">Register</button>
            </form>
        </div>


    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { userStore } from '../../stores/users'
import { chatsStore } from '../../stores/chats';
import { database } from '../../stores/databse';


const users = userStore()
const chats = chatsStore()
const dataFirebase = database()

const register = reactive({
    username: '',
    password: ''
}
)

const local = []
const createUser = () => {
    if (register.username.length >= 20 || register.username.length < 4) {
        alert('Username and password must be between 4 and 20 letters');
        return;
    } else if (register.password.length >= 20 || register.password.length < 4) {
        alert('Username and password must be between 4 and 20 letters');
        return;
    }
    for (const chatObject of users.users) {
        if (chatObject.name === register.username) {
            alert('User already exists')
            return
        }
    }
    const user = {
        name: register.username,
        password: register.password,
        id: Math.floor(Math.random() * 10000),
        sMsg: [],
        rMsg: [],
        ids: []

    }
    users.users.push(user)
    dataFirebase.storeUser(users.users)

    register.username = ''
    register.password = ''
    alert('Successfully registered, please sign in')
}
onMounted(() => {
    dataFirebase.getUsers()
    dataFirebase.getChats()
})

</script>