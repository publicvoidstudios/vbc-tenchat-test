import {defineStore} from "pinia";

export const useAuthStore = defineStore("AuthStore", {
    state: () => ({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        image: ''
    }),
    actions: {
        storeUsername(value: string):void {
            this.username = value;
        },
        storeEmail(value: string):void {
            this.email = value;
        },
        storePassword(value: string):void {
            this.password = value;
        },
        storeFirstName(value: string):void {
            this.firstName = value;
        },
        storeLastName(value: string):void {
            this.lastName = value;
        },
        storeImage(value: string):void {
            this.image = value;
        },
        logout():void {
            this.username = '';
            this.email = '';
            this.password = '';
            this.firstName = '';
            this.lastName = '';
            this.image = '';
        }
    }
})