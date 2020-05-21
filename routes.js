'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database'); // use database

Route.on('/').render('welcome') // take the 'welcome' template in view, render it --> create a website
// Route.get('/test', async () => {
//     let result = await Database.table('tests').select('*')
//     return result;
// })

// Route.get('/test-raw', async () => {
//     let [rows, _] = await Database.raw('select * from tests');

//     return rows;
// })


/*******************************/
Route.post('/api/get-menu-item', async ({ request }) => {
    let query = request.all();
    let items = await getMenuItems();
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

async function getMenuItems() {
    let [rows, _] = await Database.raw('select * from MenuItems');
    if (!rows.length)
        return null;

    return rows;
}

/*******************************/
Route.post('/api/get-menu-items-by-bill-id', async ({ request }) => {
    let query = request.all();
    let items = await getMenuItemsByBillId(parseInt(query.billId));
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

async function getMenuItemsByBillId(id) {
    let [rows, _] = await Database.raw('select * from MenuItems join BillDetails on MenuItems.Id = BillDetails.MenuItemId where BillDetails.BillId=?', [id]);
    if (!rows.length)
        return null;

    return rows;
}
/*******************************/
Route.post('/api/get-menu-items-by-combo-id', async ({ request }) => {
    let query = request.all();
    let items = await getMenuItemsByComboId(parseInt(query.comboId));
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

async function getMenuItemsByComboId(id) {
    let [rows, _] = await Database.raw('select * from MenuItems join ComboItems on ComboItems.MenuItemId = MenuItems.Id where CombosId =?', [id]);
    if (!rows.length)
        return null;

    return rows;
}

/*******************************/
Route.post('/api/get-combos', async ({ request }) => {
    let query = request.all();
    let combo = await getCombos();
    if (!combo)
        return {
            error: 'no menu items found'
        }
    return {
        result: combo
    }
})

async function getCombos() {
    let [rows, _] = await Database.raw('select * from Combos');
    if (!rows.length)
        return null;

    return rows;
}
/*******************************/
Route.post('/api/get-cooks', async ({ request }) => {
    let query = request.all();
    let cook = await getCooks();
    if (!cook)
        return {
            error: 'no menu items found'
        }
    return {
        result: cook
    }
})

async function getCooks() {
    let [rows, _] = await Database.raw('select * from Cooks');
    if (!rows.length)
        return null;

    return rows;
}

/*******************************/
Route.post('/api/get-cook-by-id', async ({ request }) => {
    let query = request.all();
    let cook = await getCookById(parseInt(query.cookId));
    if (!cook)
        return {
            error: 'no cook found'
        }
    return {
        result: cook
    }
})

async function getCookById(id) {
    let [rows, _] = await Database.raw('select * from Cooks where Cooks.Id = ?', [id]);
    if (!rows.length)
        return null;

    return rows[0];
}
/*******************************/
Route.post('/api/get-tables', async ({ request }) => {
    let query = request.all();
    let table = await getTables();
    if (!table)
        return {
            error: 'no menu items found'
        }
    return {
        result: table
    }
})

async function getTables() {
    let [rows, _] = await Database.raw('select * from Tables');
    if (!rows.length)
        return null;

    return rows;
}
/*******************************/
Route.post('/api/get-table-by-id', async ({ request }) => {
    let query = request.all();
    let table = await getTableById(parseInt(query.tableId));
    if (!table)
        return {
            error: 'no cook found'
        }
    return {
        result: table
    }
})

async function getTableById(id) {
    let [rows, _] = await Database.raw('select * from tables where tables.Id=?', [id]);
    if (!rows.length)
        return null;

    return rows[0];
}
/*******************************/
Route.post('/api/get-bills-by-id', async ({ request }) => {
    let query = request.all();
    let bill = await getBillById(parseInt(query.tableId));
    if (!bill)
        return {
            error: 'no cook found'
        }
    return {
        result: bill
    }
})

async function getBillById(id) {
    let [rows, _] = await Database.raw('select * from bills where biils.Id=?', [id]);
    if (!rows.length)
        return null;

    return rows[0];
}

/*******************************/
Route.post('/api/get-bill-details-by-id', async ({ request }) => {
    let query = request.all();
    let table = await getBillDetailsById(parseInt(query.billDetailId));
    if (!table)
        return {
            error: 'no cook found'
        }
    return {
        result: table
    }
})

async function getBillDetailsById(id) {
    let [rows, _] = await Database.raw('select * from billDetails where billDetails.Id = ?', [id]);
    if (!rows.length)
        return null;

    return rows[0];
}

/*******************************/
Route.post('/api/get-bill-total-by-bill-id', async ({ request }) => {
    let query = request.all();
    let billDetail = await getBillTotal(parseInt(query.billId));
    if (!billDetail)
        return {
            error: 'no cook found'
        }
    return {
        result: billDetail
    }
})

async function getBillDetailsByBillId(id) {
    let [rows, _] = await Database.raw('select * from billDetails where billDetails.billId = ?', [id]);
    if (!rows.length)
        return null;

    return rows;
}

async function getBillTotal(id) {
    let [rows, _] = await Database.raw(
        `select sum(billDetails.BillPrice) as total 
        from billDetails where billDetails.billId = ?`, [id]);
    if (!rows.length)
        return null;

    return rows[0];
}

//=================================TABLE=============================//
/****************** */
Route.post('/api/table/info', async ({ request, session }) => {
    let id = session.get('tableId', null);
    console.log(id);
    if (!id) {
        return {
            error: "Not set up yet"
        }
    }
    try {
        let bill = await getCurrentBillByTableId(id);
        let billDetail = await getBillDetailsByBillId(bill.Id);
        let totalMoney = await getBillTotal(bill.Id);
        return {
            result:
            {
                tableId: id,
                billId: bill.Id,
                orderedItems: billDetail,
                currentTotalMoney: totalMoney.total
            }

        }
    }
    catch (exc) {
        console.log(exc);
        return {
            debug: {
                tableId: session.get('tableId')
            },
            error: exc
        }
    }

})


async function getCurrentBillByTableId(tableId) {
    let [rows, _] = await Database.raw('select * from Bills where TableId = ? order by OpenTime desc', [tableId]);
    if (!rows.length)
        return null;

    return rows[0]; // only return the latest Bill of that table
}

/**************************** */

Route.post('/api/table/setup', async ({ request, session }) => {
    let query = request.all();
    let table = await getTableById(parseInt(query.tableId));
    if (!table) {
        return {
            error: "No table found"
        }
    }
    session.put('tableId', parseInt(table.Id));
    return {
        result: "Table set up"
    }

})
// later
async function openNewBill() {

}

/**************************** */
Route.post('/api/table/order', async ({ request, session }) => {
    let query = request.all();
    let tableId = session.get('tableId', null);
    let menuItemIds = query.menuItemIds;
    let comboIds = query.comboIds;

    if (!tableId) {
        return {
            error: "No table found"
        }
    }
    try {
        let billId = await getCurrentBillByTableId(tableId).Id;
        for (let itemId of menuItemIds) {
            let item = await getMenuItemById(parseInt(itemId));
            console.log(item);
            if (item) {
                await orderItem(billId, item);
            }
        }
        for (let comboId of comboIds) {
            let itemsInCombo = await getMenuItemsByComboId(parseInt(query.comboId));

            if (itemsInCombo) {
                for (let item of itemsInCombo) {
                    await orderItem(billId, item);
                }

            }
        }
    }
    catch (exc) {
        console.log(exc);
        return {
            debug: {
                billId: billId,
                menuItemIds: menuItemIds,
                itemId: itemId
            },
            error: exc
        }
    }

})

async function getMenuItemById(id) {
    let [rows, _] = await Database.raw(
        `select * from MenuItems where Id =?`, [id]);
    if (!rows.length)
        return null;

    return rows[0];
}

async function getLowestInQueueCook() {
    let [rows, _] = await Database.raw(
        `select Cooks.Id, count(cooks.Id) as count_Id 
        from Cooks join BillDetails on Cooks.Id = BillDetails.CookId
        group by Cooks.Id having count_Id > -1 order by(count_Id) asc`);
    if (!rows.length)
        return null;

    return rows[0];
}

async function orderItem(billId, item) {

    let cook = await getLowestInQueueCook();
    console.log(cook);
    //error here!
    await Database.raw(`INSERT INTO Billdetails
        (BillId,
        MenuItemId,
        CookId,
        BillPrice,
        State,
        BeginTime,
        PredictedServedTime,
        RealServedTime,
        Duration) values =(?,?,?,?,?,?,?,?,?)`,
        [billId, item.Id, cook.Id, item.Price, 0, null, null, null, item.DefaultDuration]);

}

// add oderItem(billId,item)
// add getComboById -> returns list of MenuItems in combo

Route.post('/api/table/payment', async ({ request, session }) => {
    // assume that this will always return okay
    let tableId = session.get('tableId', null);
    let bill = await getCurrentBillByTableId(tableId);
    let total = await getBillTotal(bill.Id);
    await closeCurrentBill(bill.Id);
    return {
        bill: bill,
        totalMoney: total,
        payment: "The payment is valid."
    }
})

async function closeCurrentBill(id) {
    let closeTime = new Date();
    await Database.raw("update Bills set CloseTime = ? where Id =?", [closeTime, id]);

}
/**********************************/
Route.post('/api/manager/table/add', async ({ request, session }) => {
    let query = request.all(); 
    let Code = query.Code;
    let ServedState = query.ServedState;
    let PayState = query.PayState;

    let table = await getTableByCode(Code)
    if (table) {
        return {
            error: "Table is already exist"
        }
    }
    var addState = await addTable(Code, ServedState, PayState);
    console.log('addState: ', addState);
    if (addState) {
        let table = await getTableByCode(Code);
        return {
            result: table
        }
    }
})

async function getTableByCode(Code) {
    let [rows, _] = await Database.raw('select * from Tables where Tables.Code = ?', [Code]);
    if (!rows.length)
        return null;

    return rows[0];
}

async function addTable(Code, ServedState, PayState) {
    var added = false;
    let params = [parseInt(Code), ServedState, PayState];
    await Database.raw(`INSERT INTO Tables 
    (Code, 
    ServedState, 
    PayState) VALUES (?,?,?)`, params);
    added = true;
    return added
}

/******************************/
Route.post('/api/manager/table/update', async ({ request, session }) => {
    let query = request.all();
    let id = query.tableId;
    let code = query.Code;
    let serve = query.ServedState;
    let pay = query.PayState;

    let table = await getTableById(tableId);
    if(!table) {
        return {
            error: "TableId does not exist"
        }
    }

    var updatedTable = await updateTable(id, code, serve, pay)
    console.log('Table is updated: ', updatedTable);
	if (updatedTable){
		return {
			result: "Update successfully"
		}
    }
})

async function updateTable(tableId, code, ServedState, PayState) {
    var updated = false;
    await Database.raw('UPDATE tables SET Code = ?, ServedState = ?, PayState = ? WHERE Id = ?',
    [code, ServedState, PayState, tableId]);
    updated = true;
    return updated;
}


//=================================COOK=============================//
/************************** */
Route.post('/api/cook/info', async ({ request, session }) => {
    let id = session.get("cookId", null);
    console.log(id);
    if (!id) {
        return {
            debug: {
                cookId: session.get('cookId')
            },
            error: "Not set up yet"
        }
    }
    try {
        let cook = await getCookById(id);
        let cbillDetail = await getCurrentBillDetailByCookId(id);
        let nbillDetail = await getNearestInQueueBillDetailByCookId(id);
        if (cook) {
            return {
                debug: {
                    cookId: session.get('cookId')
                },
                result:
                {
                    cook: cook,
                    currentItem: cbillDetail,
                    nextItem: nbillDetail
                }
            }
        }
    }
    catch (exc) {
        console.log(exc); // print the error to cmd
        return {
            debug: {
                cookId: session.get('cookId')
            },
            error: exc
        }
    }

    return {
        debug: {
            cookId: session.get('cookId')
        },
        error: "unknown error"
    }
})
async function getCurrentBillDetailByCookId(cookId) {
    let [rows, _] = await Database.raw(
        `select bDetails.Id, mItems.Name as ItemName, bDetails.State, bDetails.PredictedServedTime 
        from BillDetails as bDetails 
        join MenuItems as mItems on bDetails.MenuItemId = mItems.Id 
        where bDetails.CookId = ? and state=1 limit 1`, [parseInt(cookId)]);
    if (!rows.length) {
        return null;
    }
    return rows[0];
}
/************************** */
Route.post('/api/cook/setup', async ({ request, session }) => {
    let query = request.all();
    let cookId = query.cookId;
    let cook = await getCookById(cookId);
    if (!cook) {
        return {
            error: "No cook found."
        }
    }

    session.put('cookId', parseInt(cookId));
    return {
        result: "Cook set up",
        debug: {
            cookId: session.get('cookId')
        }

    }
})

/************************** */
Route.post('/api/cook/start', async ({ request, session }) => {
    let query = request.all();
    let cookId = session.get('cookId', null);

    if (!cookId) {
        return {
            error: "No cook found"
        }
    }

    let detail = await getNextBillDetailByCookId(cookId);

    if (!detail) {
        return {
            error: "No bill detail found."
        }
    }

    let minutes = query.time; // the predicted cooking time in minute

    var lbTime = new Date(); //get 'now' time as the lowerbound
    var ubTime = lbTime.setHours(lbTime.getHours() + 1); // get the upperbound of the predicted time
    //maximum cooking hour will be 1(hour)

    var predictedFinishTime = lbTime.setMinutes(lbTime.getMinutes() + minutes);   // transform the minute input to realtime 
    if (predictedFinishTime > lbTime && predictedFinishTime < ubTime) {
        //use proper name for our function
        await setBillDetailTime(detail.Id, lbTime, predictedFinishTime); //set lbTime as beginTime in db
        return {
            result: `The order is predicted to finish within: %hours hours, %minutes minutes`
        }
    }

    return {
        error: "False time set"
    }
})

async function getNearestInQueueBillDetailByCookId(cookId) { //OMG, the name :v
    let [rows, _] = await Database.raw(`
    select bDetails.Id, mItems.Name as ItemName, bDetails.State, bDetails.PredictedServedTime, bDetails.Duration 
    from BillDetails as bDetails join MenuItems as mItems
    on bDetails.MenuItemId = mItems.Id
    where bDetails.CookId = ? and state=0 limit 1`, [parseInt(cookId)]);
    if (!rows.length) {
        return null;
    }
    return rows[0];
}

async function getNextBillDetailByCookId(cookId) {
    let detail = await getCurrentBillDetailByCookId(cookId);
    if (detail)
        return null;
    let nInQueue = await getNearestInQueueBillDetailByCookId(cookId);

    return nInQueue;
}

async function setBillDetailTime(nId, nbeginTime, npredictedServedTime) {
    await Database.raw("update BillDetails set BeginTime = ?, predictedServedTime = ? , state = 1 where Id =?", [nbeginTime, npredictedServedTime, parseInt(nId)]);
}


/************************** */

Route.post('/api/cook/finish', async ({ request, session }) => {
    let id = session.get('cookId', null);
    if (!id) {
        return {
            error: "Not set up yet"
        }
    }
    let cook = await getCookById(id);
    var currentTime = new Date();
    let billDetail = await getCurrentBillDetailByCookId(id);
    if (!billDetail) {
        return {
            error: "No meal to finish"
        }
    }

    await setBillDetailFinishState(billDetail, currentTime);
    return {
        result: "Meal finished"
    }
})

async function setBillDetailFinishState(billDetail, realServeTime) {

    await Database.raw(`update BillDetails as bDetails set State = 2, RealServeTime = ? where Id = ?`, [realServeTime, billDetail.Id]);

}

/**************************************/
Route.post('/api/manager/cook/add', async ({ request, session }) => {
    let query = request.all(); 
    let personalId = query.personalId;
    let firstName = query.firstName;
    let lastName = query.lastName;

    let cook = await getCookByPersonalId(personalId)
    if (cook) {
        return {
            error: "Cook is already exist"
        }
    }
    var addState = await addCook(personalId, firstName, lastName);
    console.log('addState: ', addState);
    if (addState) {
        let cook = await getCookByPersonalId(personalId); // we can reuse the function here
        return {
            result: cook
        }
    }
})

async function getCookByPersonalId(id) {
    let [rows, _] = await Database.raw('select * from Cooks where Cooks.personalId = ?', [personalId]);
    if (!rows.length)
        return null;

    return rows[0];
}

async function addCook(personalId, firstName, lastName) {
    var added = false;
    // you can add all parameter to the param list, or can just put in the Database.raw directly
    let params = [parseInt(personalId), firstName, lastName]; // mind the type of the parameters
    await Database.raw(`INSERT INTO Cooks 
    (PersonalId, 
    FirstName, 
    LastName) VALUES (?,?,?)`, params);
    added = true;
    return added
}

/******************************/
Route.post('/api/manager/cook/update', async ({ request, session }) => {
    let query = request.all();
    let id = query.cookId;
    let perId = query.personalId;
    let FName = query.firstName;
    let LName = query.LName;

    let cook = await getCookById(cookId);
    if(!cook) {
        return {
            error: "CookId does not exist"
        }
    }

    var updatedCook = await updateCook(id, perId, FName, LName)
    console.log('Item is updated: ', updatedCook);
	if (updatedCook){
		return {
			result: "Update successfully"
		}
    }
})

async function updateCook(cookId, personalId, FirstName, LastName) {
    var updated = false;
    await Database.raw('UPDATE cooks SET PersonalId = ?, FirstName = ?, LastName = ? WHERE Id = ?',
    [personalId,FirstName,LastName,cookId]);
    updated = true;
    return updated;
}