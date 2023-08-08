import { defineStore } from "pinia";
export const userStore = defineStore('userStore', {
    state: () => ({
        users: [],
        loggedUser: [],
    }),

    actions: {
        logUser(nameOf) {
            const found = this.users.filter(name => name.name === nameOf)
            this.loggedUser.push(found[0])
            this.getChats()
        },
        getChats() {
            const loggedPerson = this.users.filter(user => user.name === this.loggedUser[0].name)
           
        }
    },
    getters: {
        outputChat() {
            return this.users
        }
    }



})