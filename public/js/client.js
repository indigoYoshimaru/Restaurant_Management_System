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

    //console.log(r);
    return r;
}

//=================================TABLE=============================//
/************************** */

async function getTables() {
    let data = await (await fetch('/general/get-tables')).json();

    if (data.error) {
        throw new Error();
    }

    return data.result;

}
// newly added
async function getMenuItems() {
    let response = await fetch('/general/get-menu-item');
    let data = await response.json();

    if (data.error) {
        throw new Error();
    }

    return data.result;
}

async function getCombos() {
    let response = await fetch('/general/get-combos');
    let data = await response.json();

    if (data.error) {
        throw new Error();
    }

    return data.result;
}
//
async function getMenuItemsByComboId(comboId) {
    let data = await getJson('/general/get-menu-items-by-combo-id', { comboId }); // call the server and pass the 

    if (data.error)
        throw new Error(data.error);
    return data.result;
}

async function getCurrentBillByTableId(tableId) {
    let data = await getJson('/general/get-current-bill-by-table-id', { tableId }); // call the server and pass the 

    if (data.error)
        throw new Error(data.error);
    return data.result;
}

async function getCurrentTableInfo() {
    //let text = await testPost('/get-current-table-info', {});
    let data = await (await fetch('/table/info')).json();

    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */
async function setUpTable(tableId) {
    let data = await getJson('/table/setup', { tableId }); // call the server and pass the 
    //tableId to the request
    if (data.error) // if the return has error, we throw that error
        throw new Error(data.error);
    return data.result; // else return the result
}

/************************** */
async function orderItems(menuItemIds, comboIds) {
    let data = await getJson('/table/order', { menuItemIds, comboIds });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function checkPayment(cardNo, cvv) {
    let data = await getJson('/table/payment', { cardNo, cvv });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

//=================================STAFF=============================//
async function getStaffList() {
    let data = await (await fetch('/general/get-staffs')).json();

    if (data.error) {
        throw new Error();
    }

    return data.result;

}
/************************** */
async function getCurrentStaffInfo() {
    let data = await (await fetch('/staff/info')).json();

    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function setUpStaff(staffId) {
    let data = await getJson('/staff/setup', { staffId });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}
/************************** */
async function startProcessing(time) {
    let data = await getJson('/staff/start', { time });// the predicted cooking time in minute
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/************************** */
async function finishProcessing() {
    let data = await getJson('/staff/finish', {});
    if (data.error)
        throw new Error(data.error);
    return data.result;
}


//=================================MANAGER=============================//
/*************************** */
async function addCook(personalId, firstName, lastName) {
    let data = await getJson('/manager/cook/add', { personalId, firstName, lastName });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addTable(Code) {
    let data = await getJson('/manager/table/add', { Code });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addItem(itemName, itemPrice, duration, available,itemType) {
    let data = await getJson('/manager/item/add', { itemName, itemPrice, duration, available, itemType });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function addCombo(name, price, mItemIds, available) {
    let data = await getJson('/manager/combo/add', { name, price, mItemIds, available });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/**************************** */
async function updateCook(cookId, personalId, firstName, lastName) {
    let data = await getJson('/manager/cook/update', { cookId, personalId, firstName, lastName });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/***************************** */
async function updateTable(tableId, Code, ServedState, PayState) {
    let data = await getJson('/manager/table/update', { tableId, Code, ServedState, PayState });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/****************************** */
async function updateItem(itemId, itemName, itemPrice,  duration, available, itemType) {
    let data = await getJson('/manager/item/update', { itemId, itemName, itemPrice, duration, available,itemType });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}

/******************************* */
async function updateCombo(comboId, comboName, comboPrice, itemIds, available) {
    let data = await getJson('/manager/combo/update', { comboId, comboName, comboPrice, itemIds, available });
    if (data.error)
        throw new Error(data.error);
    return data.result;
}