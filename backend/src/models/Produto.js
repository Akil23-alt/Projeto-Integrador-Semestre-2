import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
    {  
        id: { type: Number, required: true, unique: true},
        name: { type: String, required: true},
        Sabor: { type: String, required: true}
        //Verificar se falta adicionar informações como a do 
        //Usuario.js
    }
);

export default mongoose.model("Produto", ProdutoSchema);