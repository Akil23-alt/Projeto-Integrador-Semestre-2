import { defineStore } from "pinia";
import api from "../services/api";

export const usePedidoStore = defineStore("user", {
  state: () => ({
    pedidos: [],
    loading: false,
    error: null
  }),
  getters: {
    totalPedidos: (state) => state.pedidos.length
  },
  actions: {
    async fetchPedidos() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/pedidos");
        this.pedidos = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar pedidos";
      } finally {
        this.loading = false;
      }
    },
    async addPedidos(user) {
      this.error = null;
      try {
        const res = await api.post("/pedidos", user);
        this.pedidos.unshift(res.data);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar pedido";
      }
    },
    async updateUPedidos(id, payload) {
      this.error = null;
      try {
        const res = await api.put(`/pedidos/${id}`, payload);
        const idx = this.pedidos.findIndex(u => u._id === id);
        if (idx !== -1) this.pedidos[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar pedido";
      }
    },
    async removePedidos(id) {
      this.error = null;
      try {
        await api.delete(`/pedidos/${id}`);
        this.pedidos = this.pedidos.filter(u => u._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover pedido";
      }
    }
  }
});
