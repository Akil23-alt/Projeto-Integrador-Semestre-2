import { defineStore } from "pinia";
import api from "../services/api";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: []
}),

actions: {
    async fetchUsers() {
        const res = await api.get("/users");
        this.users = (res.data);
    },

    async addUser(user) {
        const res = await api.post("/users", user);
        this.user.push(res.data);
    },

    async deleteUser(id) {
        await api.delete(`/user/${id}`);
        this.users = this.users.filter(u => u._id !== id)
    }
}
});
