const mediaFactory = (data) => {

    const {id, photographerId, title, image, likes, date, price} = data;

    let mediaType;
    if(image){
      mediaType = "image";
    }else if(video){
        mediaType = "video";
    }

    function getMediaDom(){
         switch (mediaType) {
            case "image":
                console.log("image");
                break;
            case "video":
                console.log("video");
                break;
        default:
            console.log("media non pris en charge");
         }


    }
     

    return id, photographerId, title, image, likes, date, price;

}