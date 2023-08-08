<template>
  <main>
    <!-- NAV -->
    <div class="nav-container">
      <the-nav @sign-in="auth" @logout="logout" :log="login"></the-nav>
    </div>
    <!-- MAIN CONTENT -->
    <div class="main-container" v-if="login">
      <div class="chat-container">
        <chat-boxes :chats="chats"></chat-boxes>
      </div>
      <div class="display">
        <chat-display @message="sendMessage"></chat-display>
      </div>
      <create-chat></create-chat>
      <chats-from-firebase></chats-from-firebase>
    </div>

  </main>
</template>

<script setup>
import ChatBoxes from './components/chat/ChatBoxes.vue'
import ChatDisplay from './components/chat/ChatDisplay.vue'
import TheNav from './components/TheNav.vue'
import CreateChat from './components/chat/CreateChat.vue'
import ChatsFromFirebase from './components/chat/ChatsFromFirebase.vue'


import { chatsStore } from './stores/chats.js'
import { userStore } from './stores/users'
import { ref } from 'vue'
import { database } from './stores/databse'


const chats = chatsStore()
const users = userStore()
const firebase = database()

let login = ref(null)

const auth = (value) => {
  let found = false
  for (const allUsers of users.users) {
    if (value.user === allUsers.name && value.password === allUsers.password) {
      login.value = true;
      found = true
    }
  }
  if (!found) {
    alert('Incorrect username or password')
    found = false
    login.value = false;
    return
  }
}

const messageToSend = ref('')

const sendMessage = (value) => {
  messageToSend = value
}

const logout = () => {
  login.value = false
  window.location.reload();
}


</script>

<style scoped>
.main-container {
  display: flex;

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  background-color: rgba(245, 245, 220, 0.2);
  border-radius: 20px;
  padding: 20px;
}

.chat-container.hide {
  display: none;
}

@media only screen and (max-width: 600px) {
  .main-container {
    display: flex;
    width: 320px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  main {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 90%;
    margin-left: 0;
  }


}
</style>