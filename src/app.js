
import express from 'express';

import productManager from "./ProductManager.js";

 const app = express();

 app.use(express.urlencoded({ extended: true }));

 const prodManager = new productManager();


 app.get("/products", async (req, res)=>{

    try {

         let allProds = await prodManager.getProducts();

        let LimitProducts = req.query.limit;
        

            if (LimitProducts > 0 ) {

                     let ProdsFiltered = await allProds.slice(0, LimitProducts)

                     await res.send(ProdsFiltered)
                    
            }else{

                    await res.send(allProds)
            }

        
         
        
    } catch (error) {

        res.send(`El error es: ${error}`);
        
    }
 


 })


 app.get("/products/:pid", async (req,res)=>{

        try {
                let allProds = await prodManager.getProducts();
                let filterId = await allProds.filter(prod => prod.id == req.params.pid)

                await res.send(filterId)
                
        } catch (error) {
                res.send(`El error es: ${error}`);
        }

                

 })

 app.listen(8080, ()=>{

    console.log("escuchando en 8080");


 })


