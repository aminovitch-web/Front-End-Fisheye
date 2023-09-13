function validateForm () {
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Nom : " + nom);
    console.log("Prénom : " + prenom);
    console.log("Email : " + email);
    console.log("Message : " + message);

    // Masquer la modale
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("main").style.filter = "none";
};
