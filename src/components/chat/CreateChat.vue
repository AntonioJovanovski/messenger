<template>
    <div class="container">
        <p>Click to chat:</p>
        <hr>
        <div v-for="user in users.users" class="user-buttons">
            <button @click="createChat(user.name)" ref="user"><i class="fa-regular fa-user"></i> {{ user.name }}</button>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { chatsStore } from '../../stores/chats';
import { userStore } from '../../stores/users'
import { database } from '../../stores/databse'

const chats = chatsStore()
const firebase = database()
const users = userStore()

const nameInput = ref('')

const local = []
const createChat = (nameOf) => {
    for (const chatObject of chats.chatByUser) {
        if (chatObject.by === nameOf || chatObject.and === nameOf) {
            alert('Chat already crated with that user')
            return
        }


    }

    const pushItems = {
        name: nameOf + ' ' + 'and' + ' ' + users.loggedUser[0].name,
        id: Math.floor(Math.random() * 10000),
        isSelected: false,
        by: nameOf,
        and: users.loggedUser[0].name,
        messages: [],
    }

    firebase.storeChat(pushItems)
    chats.newChat = pushItems.id
   /*  chats.chat.push(pushItems)
    chats.chatByUser.push(pushItems) */
   
    nameInput.value = ''
    chats.outputSelected[0].isSelected = false
}

</script>

<style scoped>
i {
    color: rgb(0, 100, 255);
}

div {
    margin-left: 20px;


}

.container {
    background-color: rgba(240, 248, 255, 0.8);
    border: 1px solid black;
    padding: 10px;
    height: 400px;
    overflow-y: scroll;

}

button {
    margin: 2px 0;
    border-bottom: 2px dotted black;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
}

.container p {
    font-size: 14px;
}

@media only screen and (max-width: 600px) {
    .container {
        margin-top: 20px;
        height: auto;
    }

    button {
        width: -webkit-fill-available;
        height: 40px;
    }

    .user-buttons {

        margin: 0;
    }
}
</style>    