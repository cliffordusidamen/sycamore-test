function payWithPaystack(email, amount, successCallback, errorCallback) {
    let handler = PaystackPop.setup({
        key: 'pk_test_ec89eb990d322fe43de3927d08d4de52a4165e03', // Replace with your public key
        email: email,
        amount: amount,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        // label: "Optional string that replaces customer email"
        onClose: function () {
            if (errorCallback && errorCallback instanceof Function) {
                errorCallback()
            }
        },
        callback: function (response) {
            if (successCallback && successCallback instanceof Function) {
                successCallback(response)
            }
        }
    });
    handler.openIframe();
}

const pay = (customer, amount, successCallback) => {
    console.log('paying...', )
    return payWithPaystack(customer.email, amount, successCallback, errorCallback)
}

export default pay