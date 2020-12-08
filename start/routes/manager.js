const Route = use('Route')
const Database = use('Database'); // use database

const { getMenuItemByName } = require('./../../database/query_service');
var query_service = require('./../../database/query_service');
var update_service = require('./../../database/update_service');
//------------------ITEM-----------------------//
//----------------add item//
Route.post('/manager/item/add', async ({ request, session }) => {
    let query = request.all();
    let itemName = query.itemName;
    let itemPrice = query.itemPrice;
    let duration = query.duration;
    let available = query.available;
    let itemType = query.itemType;

    let item = await query_service.getMenuItemByName(itemName);

    let itemTypeId = await query_service.getItemTypeIdByItemType(itemType);

    console.log(itemTypeId);

    if (item) {
        return {
            error: "Item already exists!"
        }
    }
    var isAdded = await update_service.addItem(itemName, itemPrice, duration, available, itemTypeId);
    //console.log('Item is added: ', isAdded);
    if (isAdded) {
        let item = await query_service.getMenuItemByName(itemName);
        return {
            result: item
        }
    }
})


//----------------update item// 		
Route.post('/manager/item/update', async ({ request, session }) => {
    let query = request.all();
    let itemId = query.itemId;
    let itemName = query.itemName;
    let itemPrice = query.itemPrice;
    let duration = query.duration;
    let available = query.available;
    let itemType = query.itemType;
    let item = await query_service.getMenuItemById(itemId);
    let itemTypeId = await query_service.getItemTypeIdByItemType(itemType);
    console.log([itemId, itemName, itemPrice, duration, available, itemTypeId])

    if (!item) {
        return {
            error: "Item Id does not exists!"
        }
    }

    var isUpdated = await update_service.updateItem(itemId, itemName, itemPrice, duration, available, itemTypeId);
    if (isUpdated) {
        return {
            result: "Update successfully"
        }
    }
})

//---------------------------------COMBO---------------------------------//
//-----------------add combo
Route.post('/manager/combo/add', async ({ request, session }) => {
    let query = request.all();
    let comboName = query.comboName;
    let comboPrice = query.comboPrice;
    let mItemIds = query.mItemIds;
    let available = query.available;

    let combo = await query_service.getComboByName(comboName);
    let itemNames = []
    if (combo) {
        return {
            error: "Combo already exists!"
        }
    }
    else {
        //check if id exists
        for (var i = 0; i < mItemIds.length; i++) {
            console.log("check if item exists");
            let menuItem = await query_service.getMenuItemById(mItemIds[i]);
            if (!menuItem) {
                return {
                    error: "Item added to combo does not exist!"
                }

            }
            itemNames.push(menuItem.Name);
        }
        await update_service.addCombo(comboName, comboPrice, mItemIds, available);
        let combo = await query_service.getComboByName(comboName);

        return {
            result: {
                comboId: combo.Id,
                comboName: combo.Name,
                comboPrice: combo.Price,
                available: combo.available,
                itemNames: itemNames

            }
        }
    }
})

//----------------updatecombo
Route.post('/manager/combo/update', async ({ request, session }) => {
    let query = request.all();
    let comboId = query.comboId;
    let name = query.comboName;
    let price = query.comboPrice;
    let itemIds = query.itemIds;
    let available = query.available;
    //console.log('received data:', [comboId, name, price, itemIds, available]);

    let combo = await query_service.getComboById(comboId);
    //console.log(combo);
    if (!combo) {
        return {
            error: "Combo does not exist!"
        }
    }
    else {
        //check if id exists
        for (var i = 0; i < itemIds.length; i++) {
            console.log("check if item exists");
            let menuItem = await query_service.getMenuItemById(itemIds[i]);
            if (!menuItem) {
                return {
                    error: "Item added to combo does not exist!"
                }
            }
        }
        await update_service.updateCombo(comboId, name, price, itemIds, available);
        return {
            result: "Update successfully"
        }
    }
})




