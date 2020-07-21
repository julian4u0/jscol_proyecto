const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const err = urlParams.get('error')
if (err) {
    switch (err) {
        case "already_exists":
            document.getElementById("errorRegistro").innerHTML = "El usuario ya se encuentra registrado"

            break;

        default:
            break;
    }
}
const new_user = urlParams.get('new_user')
if (new_user) {
    document.getElementById("email").value = new_user

}

const err_login = urlParams.get('error_login')
if (err_login) {
    switch (err_login) {
        case "wrong_pass":
            document.getElementById("errorLogin").innerHTML = "Contraseña incorrecta!"

            break;
        case "not_existing_user":
            document.getElementById("errorLogin").innerHTML = "Este usuario no existe!"

            break;

        default:
            break;
    }
}