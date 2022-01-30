export function personNameValidation(message) {
    const config = {
        name: 'personNameValidation',
        message: message ?? 'Enter only alphabets',
        test: value => {
            return /^[a-zA-Z ]*$/.test(value)
        }
    }

    return config
}