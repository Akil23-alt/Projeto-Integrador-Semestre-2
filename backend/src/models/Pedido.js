import mongoose from "mongose";

const PedidoSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true},
        produtos: { type: String, required: true},
        aprovacao: { type: Boolean, required: true},
        status: { type: String, required: true}
        //Verificar se falta adicionar informações como a do 
    },
    { timestamps: true } // Carimbo de data e hora do cadastro
);

export default mongoose.model("Pedido", PedidoSchema);