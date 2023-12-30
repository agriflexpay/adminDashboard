export function checkEmties(input: string) {
    if (input.length !== 0) {
        return true
    }
    return false
}
export function checkEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
}
export function checkPassword(password: string) {
    const passwordRegex = /^(?=.{8,})(?=.*[A-Za-z0-9]).*$/
    return passwordRegex.test(password)
}
export function loginCheckPassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z0-9]).*$/
    return passwordRegex.test(password)
}
export function checkConfirmPassword(password: string, confirmPassword: string) {
    return password === confirmPassword
}
export function checkPhoneNumber(phoneNumber: string) {
    const phoneNumberRegex = /^\d{10}$/
    return phoneNumberRegex.test(phoneNumber)
}
export function checkName(name: string) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return nameRegex.test(name)
}
export function checkAddress(address: string) {
    const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/
    return addressRegex.test(address)
}
export function checkCity(city: string) {
    const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cityRegex.test(city)
}
export function checkState(state: string) {
    const stateRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return stateRegex.test(state)
}
export function checkZipCode(zipCode: string) {
    const zipCodeRegex = /^\d{5}$/
    return zipCodeRegex.test(zipCode)
}
export function checkCountry(country: string) {
    const countryRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return countryRegex.test(country)
}
export function checkCardNumber(cardNumber: string) {
    const cardNumberRegex = /^\d{16}$/
    return cardNumberRegex.test(cardNumber)
}
export function checkCardName(cardName: string) {
    const cardNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardNameRegex.test(cardName)
}
export function checkCardExpiry(cardExpiry: string) {
    const cardExpiryRegex = /^\d{2}\/\d{2}$/
    return cardExpiryRegex.test(cardExpiry)
}
export function checkCardCvv(cardCvv: string) {
    const cardCvvRegex = /^\d{3}$/
    return cardCvvRegex.test(cardCvv)
}
export function checkCardZipCode(cardZipCode: string) {
    const cardZipCodeRegex = /^\d{5}$/
    return cardZipCodeRegex.test(cardZipCode)
}
export function checkCardAddress(cardAddress: string) {
    const cardAddressRegex = /^[#.0-9a-zA-Z\s,-]+$/
    return cardAddressRegex.test(cardAddress)
}
export function checkCardCity(cardCity: string) {
    const cardCityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardCityRegex.test(cardCity)
}
export function checkCardState(cardState: string) {
    const cardStateRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardStateRegex.test(cardState)
}
export function checkCardCountry(cardCountry: string) {
    const cardCountryRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardCountryRegex.test(cardCountry)
}
export function checkCardType(cardType: string) {
    const cardTypeRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardTypeRegex.test(cardType)
}
export function checkCardHolderName(cardHolderName: string) {
    const cardHolderNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return cardHolderNameRegex.test(cardHolderName)
}
