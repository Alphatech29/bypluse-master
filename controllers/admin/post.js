const asyncHandler = require("../../helpers/asyncHandler");
const { getDateFormatForPost } = require("../../helpers/dateTime");
const { openToken } = require("../../helpers/jwt");
const { paginateData, getNextOffset } = require("../../helpers/pagination");
const { createPostFunction, updatePostById, getPostById, deletePostById, adminGetPostById, editPostById, adminGetPostFunction } = require("../../helpers/post");
const fs = require("fs");
const slugMaker = require("../../helpers/slugMaker");
const logger = require("../../helpers/logger");

//Get All Post For Admin
exports.adminPostListGet = asyncHandler(async (req, res, next) => {

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1, search = req.query.search, type = req.query.type;
   
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const posts = await adminGetPostFunction(limit, getNextOffset(currentPage, limit));
    
    await posts.map(p => {
        p.post_created_at = getDateFormatForPost(p.post_created_at)
    })

    //Pagination
    const pageData = await adminGetPostFunction(99999999999, 0);
    paginationArr = paginateData(limit, pageData.length);
 
    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && paginationArr[paginationArr.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };

    //Pagination Link
    const url = req.originalUrl.split("?")[0];

    link = `${url}?`
    
    //Response Back
    return res.render("admin/pages/post/postLists", {
        title: "Posts",
        posts,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })


});


//NEW POST (GET)
exports.adminNewPostGet = asyncHandler(async (req, res, next) => {
    //Response Back
    return res.render("admin/pages/post/newPost", {
        title: "New Post"
    })


});


//CREATE POST (POST)
exports.adminCreatePost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);


    if (!req.imageName) {
    //Make Slug
    req.body.post_slug = slugMaker(req.body.post_slug);
    req.body.post_author = id;
    
    let { insertId } = await createPostFunction(req.body);

    return res.send({ status: true, id: insertId, slug: req.body.post_slug, message: "Post Created!" });
    
    } else {

        await editPostById(req.query.id,{ post_image: req.imageName });

        return res.send({ status: true, message: "Post Created!" });
        
        
    }

    

});




//Get POST For edit
exports.adminGetPostForEditGet = asyncHandler(async (req, res, next) => {
    const post = await getPostById(req.params.id);

    if (!post) {
        return res.render("error/error", {
            title: "Post Not Found",
            text: "Post You Are Looking For Cannot Be Found, Perhaps It Have Been Moved Or Broken",
            button: {
                link: "/admin/posts",
                text: "Back"
            }
        })
    }

    return res.render("admin/pages/post/getPostForEdit", {
        title: "Edit Post",
        post
    })

});

//Edit Finish, Then POST
exports.adminEditPostPut = asyncHandler(async (req, res, next) => {
    
    if (!req.imageName) {
    //Make Slug
    req.body.post_slug = slugMaker(req.body.post_slug);
    
    await editPostById(req.params.id,req.body);

    return res.send({ status: true, message: "Post Successfully!", slug: slugMaker(req.body.post_slug) });
    
    } else {
        //Delete Old One
        const post = await adminGetPostById(req.params.id);

        if(post && post.post_image) fs.unlink(`public${post.post_image}`, (err) => {
            if (err) logger.debug(err)
        });
        
        await req.files.forEach(async img => {
            
            await editPostById(req.params.id,{ post_image: `/img/attachment/${img.filename}` });
            
        });


        return res.send({ status: true, message: "Post Edited Successfully!" });
        
        
    }

});


//DELETE POST
exports.adminPostDelete = asyncHandler(async (req, res, next) => {
    const post = await adminGetPostById(req.query.id);

    if (!post) res.send({ status: false, message: "Post Not Found!" });

    if(post.post_image) fs.unlink(`public${post.post_image}`, (err) => {
        if (err) logger.debug(err)
    });
    
    
    await deletePostById(req.query.id);
    res.send({status:true,message:"Post Deleted!"})
})
