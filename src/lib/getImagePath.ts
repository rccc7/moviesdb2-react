const getImagePath = (imagePath?: string, fullSize?:boolean)=>{
    // If there is no image path, then return a generic image
    return imagePath ? 
    `http://image.tmdb.org/t/p/${fullSize?"original": "w500"}/${imagePath}`
    : "https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&w=800";
}

export default getImagePath;