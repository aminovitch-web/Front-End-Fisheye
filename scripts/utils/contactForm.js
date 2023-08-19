const initializeForm = (contactButton,name) => {

    const close_modal = document.getElementById("close_modal");
    const modal = document.getElementById("contact_modal");
    const informationContact = document.querySelector(".informationContact");

    const displayModal = () => {
        contactButton.addEventListener("click", () => {
            modal.style.display = "block";
            informationContact.innerHTML ="Contactez-moi </br>" + name;
            document.body.style.overflow = "hidden"; 
            document.getElementById("main").style.filter = "blur(40px)";
        });
    }

    const closeModal = () => {
        close_modal.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; 
            document.getElementById("main").style.filter = "none";
     
        });
    }

    displayModal();
    closeModal();

}