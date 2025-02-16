const asyncHandler = require("../../helpers/asyncHandler");
const { getGenerationsPercentage, editGenerationById, deleteGenerationById, createNewGeneration } = require("../../helpers/generation");

//LIST GENERATION
exports.adminGenerationList = asyncHandler(async (req, res, next) => {
    
    const generation = await getGenerationsPercentage();

    res.render("admin/pages/generation/generationList", {
        title: "Uplines Generation Settings",
        generation
    })

})

//CREATE NEW GENERATION
exports.adminGenerationPost = asyncHandler(async (req, res, next) => {
    
    await createNewGeneration(req.body);

    //Response To User
    return res.json({status:true,message:"Generation Created"})

})

//EDIT GENERATION
exports.adminGenerationPut = asyncHandler(async (req, res, next) => {
    
    await editGenerationById(req.query.id, req.body);

    //Response To User
    return res.json({status:true,message:"Changes Saved"})

})

//DELETE GENERATION
exports.adminGenerationDelete = asyncHandler(async (req, res, next) => {
    
    await deleteGenerationById(req.query.id);

    //Response To User
    return res.json({status:true,message:"Generation Deleted"})

})


