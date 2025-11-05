import { Router } from "express";
import Pedido from "../models/Pedido.js";

const router = Router();

// CREATE 
router.post("/", async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    return res.status(201).json(pedido);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar pedido", details: err.message });
  }
});

// READ  
router.get("/", async (_req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ createdAt: -1 });
    return res.json(pedidos);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});

// READ Único
router.get("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    return res.json(pedido);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

// UPDATE 
router.put("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    return res.json(pedido);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

// DELETE 
router.delete("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
