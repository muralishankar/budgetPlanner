
export const getBudgetPlans = async () => {
    var requestOptions = {
        method: 'GET',
        headers: { "Access-Control-Allow-Origin": "*" },
        redirect: 'follow'
    };
    let response = await fetch("/plans", requestOptions);
    let result = await response.json();
    return result.response;
};
export const addBudgetPlan = async ({ title, month, note }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "title": title, "budget_year": new Date().getFullYear() + " " + month, "budget_description": note });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("/plan", requestOptions)
    let result = await response.json();
    return result.response;
}
export const updateBudgetPlan = async ({ title, budget_year, budget_description, id }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ title, budget_year, budget_description });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch(`/plan/${id}`, requestOptions);
    let result = await response.json();
    return result.response;
}
export const removeBudgetPlan = async (id) => {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    let response = await fetch(`/plan/${id}`, requestOptions)
    let result = await response.json();
    return result.response;
}