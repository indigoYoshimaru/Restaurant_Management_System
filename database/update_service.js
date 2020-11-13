const Database = use('Database');
var query_service = require('./query_service');


module.exports = {
    async addItem(itemName, itemPrice, duration, available) {
        var isAdded = false;
        await Database.raw(`INSERT INTO MenuItems (Name, Price, DefaultDuration, Available) values (?, ?, ?, ?)`, [itemName, parseFloat(itemPrice), parseInt(duration), parseInt(available)]);
        isAdded = true;
        return isAdded;
    },
    async updateItem(itemId, itemName, itemPrice, duration, available) {
        var updated = false;
        let params = [itemName, parseFloat(itemPrice), parseInt(duration), parseInt(available), parseInt(itemId)];
        await Database.raw(`UPDATE menuitems SET
	Name = ?,
	Price = ?,
	DefaultDuration = ?,
	Available = ?
	WHERE Id = ?`, params);
        updated = true;
        return updated;
    },

    async addCombo(name, price, mItemIds, available) {
        //console.log("run addCombo");
        //create new combo
        await Database.raw(`insert into Combos (Name, Price, Available) values (?, ?, ?)`, [name, parseFloat(price), parseInt(available)]);

        let combo = await general.getComboByName(name);
        //the add item into combo
        for (var i = 0; i < mItemIds.length; i++) {
            await addComboItem(mItemIds[i], combo.Id);
        }
    },
    async addComboItem(menuItemId, comboId) {
        console.log("run addComboItem");
        let menuItem = await general.getMenuItemById(menuItemId);
        await Database.raw(`INSERT INTO comboitems (MenuItemsId, CombosId, Price) VALUES (?, ?, ?)`, [parseInt(menuItemId), parseInt(comboId), menuItem.Price]);

    },
    async updateCombo(comboId, name, price, itemIds, available) {
        //update combo info
        await Database.raw(`UPDATE Combos SET
	Name = ?,
	Price = ?,
	Available = ?
	WHERE Id = ?`, [name, parseFloat(price), parseInt(available), parseInt(comboId)]);
        //delete old combo items
        await deleteComboItemByComboId(comboId);
        //console.log("delete old items");

        //add new combo items
        for (var i = 0; i < itemIds.length; i++) {
            await addComboItem(itemIds[i], comboId);
        }
        //console.log("add new items")
    },

    async deleteComboItemByComboId(id) {
        await Database.raw(`delete from ComboItems where ComboItems.CombosId = ?`, parseInt(id));
    },

    async setBillDetailTime(nId, nbeginTime, npredictedServedTime) {
        await Database.raw("update BillDetails set BeginTime = ?, predictedServedTime = ? , state = 1, RealServedTime=? where Id =?", [nbeginTime, npredictedServedTime, null, parseInt(nId)]);
    },

    async setBillDetailFinishState(billDetail, realServeTime) {
        await Database.raw(`update BillDetails as bDetails set State = 2, RealServedTime = ? where Id = ?`, [realServeTime, billDetail.Id]);

    },

    async openNewBill(tableId) {
        await Database.raw(`INSERT INTO Bills (TableId, OpenTime) VALUES (?,Now())`, [tableId]);
        return await query_service.getCurrentBillByTableId(tableId);
    },
    async orderItem(billId, item) {
        let staff = await query_service.getLowestInQueueStaff(item.ItemTypeId);

        let params = [parseInt(billId), parseInt(item.Id), parseInt(staff.Id), parseFloat(item.Price), 0, null, null, null, parseInt(item.DefaultDuration)];
        console.log('params', params);
        await Database.raw(`INSERT INTO Billdetails
        (BillId,
        MenuItemId,
        StaffId,
        BillPrice,
        State,
        BeginTime,
        PredictedServedTime,
        RealServedTime,
        Duration) values (?,?,?,?,?,?,?,?,?)`,
            params);

    },
    async closeCurrentBill(billId) {
        await Database.raw("update Bills set CloseTime = Now() where Id =?", [billId]);

    }

}