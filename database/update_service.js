const Database = use('Database');
var query_service = require('./query_service');


module.exports = {
    async addItem(itemName, itemPrice, duration, available, itemTypeId) {
        var isAdded = false;
        await Database.raw(`INSERT INTO MenuItems (Name, Price, DefaultDuration, Available, ItemTypeId) values (?, ?, ?, ?,?)`, [itemName, parseFloat(itemPrice), parseInt(duration), parseInt(available), parseInt(itemTypeId)]);
        isAdded = true;
        return isAdded;
    },
    async updateItem(itemId, itemName, itemPrice, duration, available, itemTypeId) {
        var updated = false;
        let params = [itemName, parseFloat(itemPrice), parseInt(duration), parseInt(available), parseInt(itemTypeId), parseInt(itemId)];
        await Database.raw(`UPDATE menuitems SET
	Name = ?,
	Price = ?,
	DefaultDuration = ?,
    Available = ?,
    ItemTypeId=?
	WHERE Id = ?`, params);
        updated = true;
        return updated;
    },

    async addCombo(comboName, comboPrice, mItemIds, available) {
        //console.log("run addCombo");
        //create new combo
        await Database.raw(`insert into Combos (Name, Price, Available) values (?, ?, ?)`, [comboName, parseFloat(comboPrice), parseInt(available)]);

        let combo = await query_service.getComboByName(comboName);
        //the add item into combo
        // provide new price for each item
        var newPrice = parseFloat(comboPrice / mItemIds.length);
        for (var i = 0; i < mItemIds.length; i++) {
            // then we update the comboitem table with the newPrice
            await this.addComboItem(mItemIds[i], combo.Id, newPrice);
        }
    },
    async addComboItem(menuItemId, comboId, newPrice) {
        console.log("run addComboItem");
        await Database.raw(`INSERT INTO comboitems (MenuItemsId, CombosId, Price) VALUES (?, ?, ?)`, [parseInt(menuItemId), parseInt(comboId), newPrice]);

    },
    async updateCombo(comboId, name, price, itemIds, available) {
        //update combo info
        await Database.raw(`UPDATE Combos SET
	Name = ?,
	Price = ?,
	Available = ?
	WHERE Id = ?`, [name, parseFloat(price), parseInt(available), parseInt(comboId)]);
        //delete old combo items
        await this.deleteComboItemByComboId(comboId);
        //console.log("delete old items");

        //add new combo items
        // provide new price for each item
        var newPrice = parseFloat(price / itemIds.length);
        for (var i = 0; i < itemIds.length; i++) {
            // then we update the comboitem table with the newPrice
            await this.addComboItem(itemIds[i], comboId, newPrice);
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
        console.log("staff Id: ", staff.Id);
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