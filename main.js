const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

function isValidEmail(email) {
    email = email.toLowerCase()
    regexed = email.match(emailRegex)
    if (!regexed) {return false}
    if (regexed.length > 1) {return false}
    if (regexed[0] !== email) {return false}
    
    return true
}

const isOlderDate = (d1, d2) => {return Date.parse(d1) < Date.parse(d2)}

const SENT_EMAIL_RECORDS_NAME = "SENT_EMAIL_RECORDS_for_Andre Bačić 2D portfolio"
const MAX_EMAILS_PER_DAY = 4

function getSentEmailRecords() {
    let records = localStorage.getItem(SENT_EMAIL_RECORDS_NAME)
    if (records) {
        return JSON.parse(records)
    } else {
        return []
    }
}
/**
 * Deletes records older than 1 day
 * @returns number of form emails sent in the past day
 */
function delOldSentEmailRecords() {
    let records = getSentEmailRecords()
    let yesterdayThisTime = new Date()
    yesterdayThisTime.setDate(yesterdayThisTime.getDate()-1)
    for (let i = 0; i < records.length; i++) {
        if (isOlderDate(records[i], yesterdayThisTime)) {
            records.splice(i, 1)
            i--
        }
    }
    let tally = records.length
    records = JSON.stringify(records)
    localStorage.setItem(SENT_EMAIL_RECORDS_NAME, records)
    return tally
}
function saveSentEmailRecord() {
    let now = new Date().toString()
    let records = getSentEmailRecords()
    records.push(now)
    records = JSON.stringify(records)
    localStorage.setItem(SENT_EMAIL_RECORDS_NAME, records)
}

const form = document.getElementById("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const templateParams = {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        message: form.message.value,
        dimension: '2'
    }
    
    if (!isValidContactFormData(templateParams)) {
        return
    }

    saveSentEmailRecord()
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
/**
 * Takes in form data and determines if an email can/may be sent
 * @param {object} templateParams 
 * @returns true if the data is fine, false if it's not
 */
function isValidContactFormData(templateParams) {
    if ( templateParams.from_name == '' || 
         templateParams.from_email == '' ||
         templateParams.message == '') {
        window.alert("Please fill in all contact form fields before sending a message.")
        return false
    }

    if (isValidEmail(templateParams.from_email) === false) {
        window.alert("Please give a valid email address before sending a message.")
        return false
    }

    if ( templateParams.from_name.length < 2) {
        window.alert("Name must be 2 or more characters long to send a message.")
        return false
    }
    if ( templateParams.message.length < 12) {
        window.alert("Your message must be 12 or more characters long to be sent.")
        return false
    }
    
    let numSentEmails = delOldSentEmailRecords()
    if (numSentEmails >= MAX_EMAILS_PER_DAY) {
        window.alert("I'm sorry, but you may not send more than four (4) messages "+
                        "through this form per day because I have only get a handful "+
                        "of free emails via EmailJS")
        return false
    }

    return true
}


let link = document.querySelector("link[rel~='icon']");
let lastBodyWidth = 1000 // assumes laptop
const changeFavicon = () => {
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