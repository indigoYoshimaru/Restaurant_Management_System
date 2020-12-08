
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database'); // use database
var query_service = require('./../../database/query_service');
var update_service = require('./../../database/update_service');
//=================================TABLE=============================//
/****************** */
Route.get('/table/info', async ({ request, session }) => {
    let id = session.get('tableId', null);
    console.log(id);
    if (!id) {
        return {
            error: "Not set up yet"
        }
    }
    try {
        let bill = await query_service.getCurrentBillByTableId(id);
        let table = await query_service.getTableById(id);
        if (!bill) {
            return {
                result: {
                    tableId: id,
                    tableCode: table.Code,
                    orderedItems: []
                }
            }
        }
        let billDetail = await query_service.getBillDetailsByBillId(bill.Id);
        let totalMoney = await query_service.getBillTotal(bill.Id);


        return {
            result:
            {
                tableId: id,
                tableCode: table.Code,
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



/**************************** */

Route.post('/table/setup', async ({ request, session }) => {
    let query = request.all(); // get all request from the client
    // get the table by its id
    let table = await query_service.getTableById(parseInt(query.tableId));
    // if there is no such table, we return error
    if (!table) {
        return {
            error: "No table found"
        }
    }
    // if there is no error

    session.put('tableId', parseInt(table.Id));// and form the session
    return { //then return the success result
        result: "Table set up"
    }

})

/**************************** */
Route.post('/table/order', async ({ request, session }) => {
    let query = request.all();
    let tableId = session.get('tableId', null);
    let menuItemIds = query.menuItemIds;
    let comboIds = query.comboIds;


    let bill = await query_service.getCurrentBillByTableId(tableId);

    if (!bill) //if the table has not got any bill at that moment
        bill = await update_service.openNewBill(tableId);
    console.log('Bill ID: ', bill.Id);
    if (!tableId) {
        return {
            error: "No table found"
        }
    }

    try {
        //logic

        console.log('bill id', bill.Id);
        for (var itemId of menuItemIds) {
            let item = await query_service.getMenuItemById(parseInt(itemId));
            //console.log('item', item.ItemTypeId);
            if (item) {
                await update_service.orderItem(bill.Id, item);
            }
        }
        for (var comboId of comboIds) {
            console.log('comboIds', comboIds);
            let itemsInCombo = await query_service.getMenuItemsByComboId(parseInt(comboId));

            if (itemsInCombo) {
                for (let item of itemsInCombo) {
                    console.log('ItemInComboTypeId', item);
                    await update_service.orderItem(bill.Id, item);
                }

            }
        }

    }
    catch (exc) {
        console.log(exc);
        return {
            debug: {
                billId: bill.Id,
                menuItemIds: menuItemIds,
                itemId: itemId
            },
            error: exc
        }
    }

    return {
        result: "Ordered successfully."
    }

})

Route.post('/table/payment', async ({ request, session }) => {
    // assume that this will always return okay
    let tableId = session.get('tableId', null);
    let bill = await query_service.getCurrentBillByTableId(tableId);
    //let total = await query_service.getBillTotal(bill.Id);
    await update_service.closeCurrentBill(bill.Id);
    return {
        result: "The payment is valid."
    }
})



