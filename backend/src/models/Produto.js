import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        id: { type: Number, required: true, unique: true},
        tamanho: { type: String, required: true},
        cor: { type: String, required: true}
        //Verificar se falta adicionar informações como a do 
        //Usuario.js
    }
);

export default mongoose.model("Produto", ProdutoSchema);