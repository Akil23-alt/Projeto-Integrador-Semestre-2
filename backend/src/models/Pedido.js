import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
    {
        idConjunto: { type: Number, required: true, unique: true},
        produto: { type: String, required: true},
        aprovacao: { type: Boolean, required: true},
        status: { type: String, required: true},
        ordem: { type: Number, required: true},
        quantidade: { type: Number, required: true}
        //Verificar se falta adicionar informações como a do 
    },
    { timestamps: true } // Carimbo de data e hora do cadastro
);

export default mongoose.model("Pedido", PedidoSchema);