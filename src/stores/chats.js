import { defineStore } from "pinia";
import { userStore } from "./users";
import { database } from "./databse";


export const chatsStore = defineStore('chatsStore', {
    state: () => ({
        chat: [],
        chatByUser: [],
        user: false,
        newChat: '',
    }),

    actions: {
        async selectChat(chat) {
            const firebase = database()
            this.chatByUser.map((item) => {
                if (item.id === chat) {
                    item.isSelected = true;
                    firebase.getChats()

                } else {
                    item.isSelected = false;
                }
            });

        },
       
        
        pushMessage(sendMessage, user) {
            const firebase = database()
            const chat = this.chatByUser.filter(selected => selected.isSelected === true)
            const newMessage = user + ' ' + 'said:' +  ' ' + sendMessage;
            firebase.storeMessage(newMessage, chat[0].newId)
            
        },

    },
    getters: {
        chatWith() {
            const users = userStore()
            for (const user of this.chat) {
                return user.name
            }
        },
        outputChats() {
            return this.chatByUser
        },
        outputSelected() {
            const sel = this.chatByUser.filter(sel => sel.isSelected === true)
            if (sel[0]) {
                return sel
            } else {
                return 'Not chosen'
            }
        },
        messages() {
            const sel = this.chatByUser.filter(sel => sel.isSelected === true)
            if (sel[0]) {
                return sel.messages
            }
        }
    },

})

