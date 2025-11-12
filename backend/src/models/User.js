import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Email inválido'] },
        cep: { type: Number, required: true, trim: true, minlength: [8, 'Cep deve ter no min e no max 8 caracteres'] },
        senha: { type: String, required: true, trim: true, minlength: [6, 'Senha deve ter no mínimo 6 caracteres'] }
        //Verificar se falta adicionar informações como a do 
        //carrinho ou até mesmo de produto
    },
    { timestamps: true } // Carimbo de data e hora do cadastro
);

export default mongoose.model("User", UserSchema); 