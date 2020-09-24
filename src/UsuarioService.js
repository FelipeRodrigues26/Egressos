import axios from "axios";
import React from 'react'
import jwt from "jsonwebtoken"
const UsuarioService = {

    isTokenValido: async function (token) {
        
        const config = { headers: {'Authorization': token} }
        return await axios.get('http://localhost:8080/',config);
     },

   getUsuarioPorToken: async function (token) {
       let usuario={};
        var jwtDecoded = jwt .decode(token.replace('Bearer','').trim(),{complete:true})
        if(jwtDecoded!=null){
            console.log(jwtDecoded.payload.sub)
            let login = jwtDecoded.payload.sub
            const config = { headers: {'Authorization': token} }
               return await axios.get('http://localhost:8080/usuarios/'+login,config)
               
        }
    }
};

export default UsuarioService;