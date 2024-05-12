export const isValidEmail = (email: string) => {

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(email)) {
        return email
    } else {
        throw new Error('The provided email has an incorrect format. Please provide a correct one: example@domain.extension.');
    }
}