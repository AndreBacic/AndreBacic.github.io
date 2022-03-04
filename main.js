emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

function isValidEmail(email) {
    regexed = email.match(emailRegex)
    if (!regexed) {return false}
    if (regexed.length > 1) {return false}
    if (regexed[0] !== email) {return false}
    
    return true
}

isMoreRecentDate = (d1, d2) => {return Date.parse(d1) < Date.parse(d2)}

const form = document.getElementById("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const templateParams = {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        message: form.message.value
    }

    if ( templateParams.from_name == '' || 
        !isValidEmail(templateParams.from_email) ||
        templateParams.message == '') {
            window.alert("Please fill in all fields before sending a message.")
            return
        }

    // TODO: prevent one person from using up all of my free emails
    emailjs.send("contact_service_1", "template_b4128z3", templateParams)
        .then((response) => {
                window.alert("Your message was sent!");
            }).catch((error) => {
                    window.alert("There was an error in sending your message.");
                });
    form.from_name.value = ""
    form.from_email.value = ""
    form.message.value = ""
})

const SENT_EMAIL_RECORDS_NAME = "SENT_EMAIL_RECORDS"
const MAX_EMAILS_PER_DAY = 4
function numSentFormEmails() {
    // get records from LS
    // delete expired records
    // return tally
}
function saveSentEmailRecord() {
    let now = new Date().toString()
    let records = JSON.parse(localStorage.getItem(SENT_EMAIL_RECORDS_NAME))
    records.push(now)
    localStorage.setItem(SENT_EMAIL_RECORDS_NAME, records)
}


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