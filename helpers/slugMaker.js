function slugMaker(text) {
        return text.toLocaleLowerCase().trim().split(" ").join("-")
}
    
module.exports = slugMaker