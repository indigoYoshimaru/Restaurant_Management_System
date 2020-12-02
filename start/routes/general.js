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
var query_service = require('./../../database/query_service');
Route.on('/').render('welcome') // take the 'welcome' template in view, render it --> create a website

/*******************************/
Route.get('/general/get-menu-item', async ({ request }) => { // if the route is "get", we call an anonymous function

    let items = await query_service.getMenuItems();   // then request the getMenuItems, since getMenuItem is async, we must call the await method
    if (!items) // if the item is null, the query cannot find the relative data
        return {
            error: 'no menu items found' // we announce the error
        }
    return {    // else, we return the result
        result: items
    }
})

/*******************************/
Route.post('/general/get-menu-items-by-id', async ({ request }) => {
    let query = request.all();
    let items = await query_service.getMenuItemById(parseInt(query.MenuItemId));
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})
/*******************************/
Route.post('/general/get-menu-items-type-id-by-type', async ({ request }) => {
    let query = request.all();
    let itemTypeId = await query_service.getItemTypeIdByItemType(query.itemType);
    console.log(itemTypeId);
    if (!itemTypeId)
        return {
            error: 'no menu items type id found'
        }
    return {
        result: itemTypeId
    }
})

/*******************************/
Route.post('/general/get-menu-items-by-bill-id', async ({ request }) => {
    let query = request.all();
    let items = await query_service.getMenuItemsByBillId(parseInt(query.billId));
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

/*******************************/
Route.post('/general/get-menu-items-by-combo-id', async ({ request }) => {
    let query = request.all();
    let itemTypeId = await query_service.getMenuItemsByComboId(parseInt(query.comboId)); // the function will be called here
    // the module.exports is used that other routes from ther files can call the function in this files
    // now it is quite similar to the non-parameter
    if (!itemTypeId)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

Route.post('/general/get-item-id', async ({ request }) => {
    let query = request.all();
    let items = await query_service.getMenuItemsByComboId(parseInt(query.comboId)); // the function will be called here
    // the module.exports is used that other routes from ther files can call the function in this files
    // now it is quite similar to the non-parameter
    if (!items)
        return {
            error: 'no menu items found'
        }
    return {
        result: items
    }
})

/*******************************/
Route.get('/general/get-combos', async ({ request }) => {
    let query = request.all();
    let combos = await query_service.getCombos();
    console.log(combos);
    if (!combos)
        return {
            error: 'no menu items found'
        }
    return {
        result: combos
    }

})

/*******************************/
Route.get('/general/get-staffs', async ({ request }) => {
    let query = request.all();
    let staff = await query_service.getStaffs();
    if (!staff)
        return {
            error: 'no staff found'
        }
    return {
        result: staff
    }
})

/*******************************/
Route.post('/general/get-staff-by-id', async ({ request }) => {
    let query = request.all();
    let staff = await query_service.getStaffById(parseInt(query.staffId));
    if (!staff)
        return {
            error: 'no staff found'
        }
    return {
        result: staff
    }
})

/*******************************/
Route.get('/general/get-tables', async ({ request }) => {
    let query = request.all();
    let table = await query_service.getTables();
    if (!table)
        return {
            error: 'no menu items found'
        }
    return {
        result: table
    }

})

/*******************************/
Route.post('/general/get-table-by-id', async ({ request }) => {
    let query = request.all();
    let table = await query_service.getTableById(parseInt(query.tableId));
    if (!table)
        return {
            error: 'no table found'
        }
    return {
        result: table
    }
})

/*******************************/
Route.post('/general/get-bills-by-id', async ({ request }) => {
    let query = request.all();
    let bill = await query_service.getBillById(parseInt(query.billId));
    if (!bill)
        return {
            error: 'no bill found'
        }
    return {
        result: bill
    }
})

/*******************************/
Route.post('/general/get-current-bill-by-table-id', async ({ request }) => {
    let query = request.all();
    let bill = await query_service.getCurrentBillByTableId(parseInt(query.tableId));
    if (!bill)
        return {
            result: {
                tag: "Available"
            }
        }
    return {
        result: {
            bill: bill,
            tag: "Not Available"
        }
    }
})

Route.post('/general/get-bill-details-by-id', async ({ request }) => {
    let query = request.all();
    let billDetail = await query_service.getBillDetailsById(parseInt(query.billDetailId));
    if (!billDetail)
        return {
            error: 'no bill detail found'
        }
    return {
        result: billDetail
    }
})



