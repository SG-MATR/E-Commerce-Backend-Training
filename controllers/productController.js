const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createProduct = async (req,res)=>{
    try {
        if(!req.body.name) return res.status(422).json({error:'Name is required'});
        if(!req.body.price){
            return res.status(422).json({error:'Price is required'});
        }else{
            if(typeof(req.body.price)!=='number'||req.body.price<0){
                return res.status(422).json({error:'Price must be a number and a non-negative'});
            }
        }
        if(!req.body.categoryId){
            return res.status(422).json({error:'Category id is required'});
        }else{
            const existCategory = await prisma.category.findUnique({where:{id:req.body.categoryId}});
            if(!existCategory) {
                return res.status(404).json({error:'Category not found'})
            };
        }
        const newProduct = await prisma.product.create({
            data:req.body,
             include:{
                category:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            },
            omit:{
                categoryId:true
            }
        })
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

exports.getAllProducts = async(req,res)=>{
    try {
        const products = await prisma.product.findMany({
            include:{
                category:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            },
            omit:{
                categoryId:true
            }
        });
        return res.status(200).json({products:products})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


exports.getProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const existProduct = await prisma.product.findUnique({
            where:{
                id:parseInt(id)
            },
            include:{
                category:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            },
            omit:{
                categoryId:true
            }
        });
        if(!existProduct){
            return res.status(404).json({error:'Product Not Found'})
        }
        return res.status(200).json({product:existProduct})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


exports.updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        if(req.body.name!==undefined&&req.body.name.trim()===''){
           return res.status(422).json({error:'name can not be empty'})
        }
        if(req.body.price!==undefined&&(typeof (req.body.price)!=='number'||req.body.price<0)){
            return res.status(422).json({error:'Price must be a non-negative number'})
        }
        // check the category that user want to update to ,if the category already exist or not
        if(req.body.categoryId!==undefined){
            const existCategory = await prisma.category.findUnique({where:{id:req.body.categoryId}});
            if(!existCategory){
                return res.status(404).json({error:'Category not found'})
            }
        }
        const existProduct = await prisma.product.findUnique({where:{id:parseInt(id)}});
        if(!existProduct){
            return res.status(404).json({error:'Product Not Found'})
        }
        const updateProduct = await prisma.product.update({
            data:req.body,
            where:{
                id:existProduct.id
            },
             include:{
                category:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            },
            omit:{
                categoryId:true
            }
        });
        return res.status(200).json({newProduct:updateProduct}) 
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const findProduct = await prisma.product.findUnique({where:{id:parseInt(id)}});
        if(!findProduct){
            return res.status(404).json({error:'Product not found'});
        }
        const deleteProduct = await prisma.product.delete({where:{id:parseInt(id)}});
        return res.status(200).json({message:'Product Deleted Successfully'});
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

// It is a way to get category product
exports.getProductByCategoryId = async(req,res)=>{
    try {
        const {categoryId} = req.params;
        const findCategory = await prisma.category.findUnique({
            where:{id:parseInt(categoryId)},
            include:{
                products:{
                    omit:{
                    categoryId:true
            }
                }
            },
           
            }
        );
        if(!findCategory){
            return res.status(404).json({error:'Category Not Foudn'});
        }
        return res.status(200).json({categoryProducts:findCategory.products})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



// It is another way to get category product
exports.getProductByCategoryIdAnotherWay = async(req,res)=>{
    try {
        const {categoryId} = req.params;
        const findCategory = await prisma.category.findUnique({
            where:{id:parseInt(categoryId)},
            }
        );
        if(!findCategory){
            return res.status(404).json({error:'Category Not Foudn'});
        }
        const products = await prisma.product.findMany({
            where:{
                categoryId:parseInt(categoryId)
            },
            include:{
                category:true
            },
            omit:{
                categoryId:true
            }
        })
        return res.status(200).json({categoryProducts:products})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}