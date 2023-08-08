<script setup>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { chatsStore } from "../../stores/chats";
import { database } from '../../stores/databse'
import { userStore } from "../../stores/users";

const chats = chatsStore()
const firebase = database()
const users = userStore()


const firebaseConfig = {
    databaseURL: "https://messenger-8610b-default-rtdb.firebaseio.com/",
};

const appFirebase = initializeApp(firebaseConfig);
const fdatabase = getDatabase(appFirebase);
const dataRef = ref(fdatabase, 'chats/');
const usersRef = ref(fdatabase, 'users/');
onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    users.users = data.userVal
})

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    const selectedChat = chats.outputSelected
    for (const chat in data) {
        if (chats.newChat === data[chat].userVal.id) {
            if (!data[chat].userVal.hasOwnProperty('newId')) {
                data[chat].userVal.newId = chat;
                data[chat].userVal.messages = [];
                chats.chat.push(data[chat].userVal)
                chats.chatByUser.push(data[chat].userVal)
                chats.newChat = ''
            }
        }


        if (selectedChat.length > 0 && data[chat].userVal.id === selectedChat[0].id) {
            const messagesObject = data[chat].userVal.messages;
            const messageKeys = Object.keys(messagesObject);
            const lastKey = messageKeys[messageKeys.length - 1];
            const lastMessage = messagesObject[lastKey];
            if (lastMessage !== undefined) {
                selectedChat[0].messages.unshift(lastMessage)

            }
        }
    }
});


</script>
