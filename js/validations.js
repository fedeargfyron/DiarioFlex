const regExpressions = {
    "pass": /^[a-zA-Z0-9]+$/,
    "email": /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "telefono": /(\-*\_*\-*\s*\(*\)*)/g,
    "direccion": /(\-*\_*\-*\s*\(*\)*)/g
}

const fieldsValidations = {
    "name": (value) => validateNameLength(value),
    "apellido": (value) => validateNameLength(value),
    "pass": (value) => validatePass(value),
    "email": (value) => validateEmail(value),
    "telefono": (value) => validateTelefono(value),
    "direccion": (value) => validateDireccion(value)
}

const validateNameLength = (value) => value.length < 4 && "Debe tener más de 3 letras";

const validatePass = (value) => {
    let regex = regExpressions["pass"];
    return value.length < 8 && !value.match(regex) && "Al menos 8 caracteres, formados por letras y números.";
}

const validateEmail = (value) => {
    let regex = regExpressions["email"];
    return !value.match(regex) && "Debe tener un formato de email válido.";
}

const validateTelefono = (value) => {
    let regex = regExpressions["telefono"];
    if(value.length < 7 || !value.match(regex)){
        return "Número de al menos 7 dígitos, no aceptar espacios, guiones ni paréntesis.";
    }
}

const validateDireccion = (value) => {
    let regex = regExpressions["direccion"];
    if(value.length < 5 || !value.match(regex)){
        return "Al menos 5 caracteres, con letras, números y un espacio en el medio.";
    }
}

const validations = (e) => {
    let alertValue = fieldsValidations[e.id](e.value);
    if(alertValue){
        let label = document.getElementById(`lbl${e.id}`);
        label.innerHTML = alertValue;
        label.classList.add("visible");
        e.classList.add("error");
    }
}

const validationsListener = (e) => {
    validations(e.target);
}

const removeLabel = (e) => {
    let element = document.getElementById(e.target.id);
    element.classList.remove("error");

    let label = document.getElementById(`lbl${e.target.id}`);
    label.classList.remove("visible");
}

const submit = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");
    inputs.forEach(x => validations(x));
    if(document.getElementsByClassName("error").length > 0){
        return alert("Error en al menos 1 campo");
    }
    e.submit();
}

window.onload = () => {
    document.getElementById("submitBtn").addEventListener("click", submit)
    let inputs = document.querySelectorAll("input");
    inputs.forEach(x => x.addEventListener("blur", validationsListener))
    inputs.forEach(x => x.addEventListener("focus", removeLabel))
}