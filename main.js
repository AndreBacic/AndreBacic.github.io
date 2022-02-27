
const form = document.getElementById("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const templateParams = {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        message: form.message.value
    }
    // TODO: Uncomment for production
    // emailjs.send("contact_service_1", "template_b4128z3", templateParams)
    //     .then((response) => {
    //             window.alert("Your message was sent!");
    //         }).catch((error) => {
    //                 window.alert("There was an error in sending your message");
    //             });
    form.from_name.value = ""
    form.from_email.value = ""
    form.message.value = ""
})

let link = document.querySelector("link[rel~='icon']");
let lastBodyWidth = 1000 // assumes laptop
changeFavicon = () => {
    currentBodyWidth = document.body.clientWidth
    if ((currentBodyWidth <= 768 && lastBodyWidth <= 768) || (currentBodyWidth > 768 && lastBodyWidth > 768)) {
        lastBodyWidth = currentBodyWidth
        return // no need to change the favicon
    }
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'favicon_laptop.ico';
    if (document.body.clientWidth <= 768) {
        link.href = 'favicon_phone.ico';
    }
    lastBodyWidth = currentBodyWidth
}

addEventListener('resize', (event) => {
    event.preventDefault()
    changeFavicon()
})

changeFavicon()