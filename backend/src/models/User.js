import mongoose from "mongose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        cep: { type: Number, required: true, trim: true },
        senha: { type: String, required: true, trim: true }
        //Verificar se falta adicionar informações como a do 
        //carrinho ou até mesmo de produto
    },
    { timestamps: true } // Carimbo de data e hora do cadastro
);

export default mongoose.model("User", UserSchema);