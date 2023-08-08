import { defineStore } from "pinia";
import { userStore } from "./users";
import { chatsStore } from "./chats";

export const database = defineStore('databse', {
    state: () => ({
        chat: [],
        data: [],
        chatsFromFirebase: []
    }),
    actions: {
        storeUser(userVal) {
            fetch('https://messenger-8610b-default-rtdb.firebaseio.com/users.json', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userVal
                }
                ),
            })
        }, //STORE USERS TO FIREBASE
        async getUsers() {
            const users = userStore()
            const response = await fetch('https://messenger-8610b-default-rtdb.firebaseio.com/users.json');
            const data = await response.json();

            for (const user in data) {
                this.data.push(data[user]);
            }
            for (const newUser of this.data[0]) {
                users.users.push(newUser)
            }

        }, // GET USERS FROM FIREBASE
        async getChats() {
            const users = userStore()
            const chats = chatsStore()
            const response = await fetch('https://messenger-8610b-default-rtdb.firebaseio.com/chats.json');
            const data = await response.json();

            for (const getChats in data) {
                if (!data[getChats].userVal.hasOwnProperty('messages')) {
                    data[getChats].userVal.messages = [];
                    chats.chat.push(data[getChats].userVal)
                } else if (data[getChats].userVal.hasOwnProperty('messages')) {
                    const newMSG = []
                    for (const newMessages in data[getChats].userVal.messages) {
                        newMSG.unshift(data[getChats].userVal.messages[newMessages]);
                    }
                    data[getChats].userVal.messages = newMSG;

                    chats.chat.push(data[getChats].userVal)

                }
                if (!data[getChats].userVal.hasOwnProperty('newId')) {
                    data[getChats].userVal.newId = getChats;
                }
            }

        }, // GET CHATS FROM FIREBASE
        deleteUsers() {
            fetch('https://messenger-8610b-default-rtdb.firebaseio.com/users.json', {
                method: 'DELETE',
            })
        },
        storeChat(userVal) {

            fetch('https://messenger-8610b-default-rtdb.firebaseio.com/chats.json', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    userVal
                }
                ),
            })
        },
        storeMessage(message, userID) {
            fetch(`https://messenger-8610b-default-rtdb.firebaseio.com/chats/${userID}/userVal/messages.json`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },

                body: [JSON.stringify(message)]
            })
        }
    }
})




