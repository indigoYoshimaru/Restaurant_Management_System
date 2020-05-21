// client for table 
// this function getCurrentInfo of the table


async function getJson(testRoute, param) {
    let r = await (await fetch(testRoute, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })).json();

    console.log(r);
    return r;
}

//=================================TABLE=============================//
async function getMenuItemsByComboId(comboId) {
    let data = await getJson('/api/general/get-menu-items-by-combo-id', comboId);
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */

async function getCurrentTableInfo() {
    //let text = await testPost('/api/get-current-table-info', {});
    let data = await (await fetch('/api/table/info')).json();

    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */
async function setUpTable(tableId) {
    let data = await getJson('/api/table/setup', { tableId });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */
async function orderItems(menuItemIds, comboIds) {
    let data = await getJson('/api/table/order', { menuItemIds, comboIds });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function checkPayment(cardNo, cvv) {
    let data = await getJson('/api/table/payment', { cardNo, cvv });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

//=================================COOK=============================//
/************************** */
async function getCurrentCookInfo() {
    let data = await getJson('/api/cook/info', {});
    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function setUpCook(cookId) {
    let data = await getJson('/api/cook/setup', { cookId });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function startCooking(time) {
    let data = await getJson('/api/cook/start', { time });// the predicted cooking time in minute
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */
async function finishCooking() {
    let data = await getJson('/api/cook/finish', {});
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

//=================================MANAGER=============================//
/*************************** */
async function addCook(personalId, firstName, lastName) {
    let data = await getJson('/api/manager/cook/add', { personalId, firstName, lastName });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addTable(code) {
    let data = await getJson('/api/manager/table/add', { code });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addItem(Name, Price, DefaultDuration, Available) {
    let data = await getJson('/api/manager/item/add', { Name, Price, DefaultDuration, Available });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addCombo(Name, Price, Available) {
    let data = await getJson('/api/manager/combo/add', { Name, Price, Available });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}