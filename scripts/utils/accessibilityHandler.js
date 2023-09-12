window.onload = function () {

    const tagBody = document.body.getElementsByTagName('*');
  
    for (let i = 0; i < tagBody.length; i++) {
        const tagB = tagBody[i];
  
        if (tagB.classList.contains('lightBoxContainer')) {
            tagB.tabIndex = -1;
        }
    }
  }
  