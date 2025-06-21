import Item from "../model/itemModel.js"

export const create = async(req,res)=>{
    try {
        const newItem = new Item(req.body)
        const savedData = await newItem.save();
        res.status(200).json(savedData)

    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getAllItems = async(req,res)=>{
    try {
        const itemsData = await Item.find();
        if(!itemsData || itemsData.lenght ===0){
            return res.status(404).json({message:"Items Not Found"})
        }
        res.status(200).json(itemsData)
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}


export const getItemById= async(req,res)=>{
    try {
        
        const id=req.params.id;
        const itemExist= await Item.findById(id);
        if(!itemExist){
            return res.status(404).json({message:"Item not found."})
        }
        res.status(200).json(itemExist)
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteItem= async (req,res)=>{
    try {
        
        const id= req.params.id;
        const itemExist=await Item.findById(id);
        if(!itemExist){
            return res.status(404).json({message:error.message})
        }

        await Item.findByIdAndDelete(id);
        res.status(200).json({message:"Item deleted successfully"})

    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
}