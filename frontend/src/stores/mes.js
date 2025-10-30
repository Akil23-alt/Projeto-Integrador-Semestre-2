    import { defineStore } from "pinia";
import api from "../services/api";

export const useMachineStore = defineStore("machine", {
  state: () => ({
    machines: [],
    loading: false,
    error: null
  }),
    actions: {
    async fetchMachines() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/machines");
        this.machines = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar usuários";
      } finally {
        this.loading = false;
      }
    },
    async updateMachine(id, payload) {
      this.error = null;
      try {
        const res = await api.put(`/machines/${id}`, payload);
        const idx = this.machines.findIndex(u => u._id === id);
        if (idx !== -1) this.machines[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar maquina";
      }}}});