function images(){
    let allImages = {}
    for(let i=1;i<=151;i++){
        allImages[i] = `./pokemon-sprites/${i}.png`
    }
    return allImages
}

export default images