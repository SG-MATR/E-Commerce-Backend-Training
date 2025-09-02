const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.createCategory = async (req,res)=>{
    try {
        if(!req.body.name){
            return res.status(422).json({error:"name is required"})
        }
        // we use category name because you use the model name which you created in prisma schema
        const existCategory = await prisma.category.findUnique({where:{name:req.body.name}});
        if(existCategory){
            return res.status(409).json({error:`${existCategory.name} Category Is Already Exists`})
        }
        const newCategory = await prisma.category.create({
            data:{
                name:req.body.name
            }
        })
       return res.status(201).json(newCategory)
    } catch (error) {
       return res.status(500).json({error:error.message})
    }
}


exports.findAllCategories = async(req,res)=>{
    try {
        const categories = await prisma.category.findMany({
            include:{
                products:true
                }
            }
        );
        return res.status(200).json({categories})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

exports.updateCategory = async(req,res)=>{
    try {
        const {id} = req.params; // this id is string and you must convert it to integer because the id in database is integer
        const existCategory = await prisma.category.findUnique({where:{id:parseInt(id)}});
        if(!existCategory) {
            return res.status(404).json({error:"Category Not Found"});
        }
        if(!req.body.name){
            return res.status(422).json({error:"name is required"})
        }
        if(existCategory.name === req.body.name){
            return res.status(409).json({error:`${existCategory.name} is already the same as you want to update`})
        }
        const updateCategory = await prisma.category.update({
            data:{name:req.body.name},
            where:{id:existCategory.id}
        })
        return res.status(200).json(updateCategory)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

exports.deleteCategory = async (req,res)=>{
   try {
    const {id} = req.params;
    const existCategory = await prisma.category.findUnique({where:{id:parseInt(id)}});
     if(!existCategory) {
        return res.status(404).json({error:"Category Not Found"});
     }
     const deletedCategory = await prisma.category.delete({where:{id:existCategory.id}});
     return res.status(200).json({message:"Category is deleted successfully"})
   } catch (error) {
     return res.status(500).json({error:error.message})
   }
}