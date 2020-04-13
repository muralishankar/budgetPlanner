export const addNewTransaction = async ({ title, type, note, amount,budget_id }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "note": note,
        "type": type,
        "title": title,
        "amount": amount,
        "budget_id": budget_id
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("/transaction", requestOptions);
    let result = await response.json();
    return result.response;
}

export const updatedTransaction = async (item) => {
    debugger;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "note": item.note, "type": item.type, "title": item.title, "amount": item.amount, "budget_id": item.budget_id });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch(`/transaction/${item.id}`, requestOptions);
    let result = await response.json();
    return result.response;
}

export const removeTransaction = async (item) => {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    let response = await fetch(`/transaction/${item.id}`, requestOptions);
    let result = await response.json();
    console.log("data ", result)
    return result.response;

}

export const getTransactions = async (budget_id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let response = await fetch(`/transactions/${budget_id}`, requestOptions);
    let result = await response.json();
    console.log("data ", result)
    return result.response;
}
