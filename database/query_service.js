const Database = use('Database');

module.exports = {
    async getMenuItems() {
        let [rows, _] = await Database.raw('select * from MenuItems'); // the raw query 
        if (!rows.length) // if the query returns nothing, we return null 
            return null;

        return rows; // else we return the result
    },

    async getMenuItemsByBillId(id) {
        let [rows, _] = await Database.raw(`select * from MenuItems join BillDetails 
    on MenuItems.Id = BillDetails.MenuItemId where BillDetails.BillId=?`, [id]);
        if (!rows.length)
            return null;

        return rows;
    },
    async getCombos() {
        let [rows, _] = await Database.raw('select * from Combos');
        if (!rows.length)
            return null;

        return rows;
    },

    async getStaffs() {
        let [rows, _] = await Database.raw(`select * from KitchenStaffs`);
        if (!rows.length)
            return null;

        return rows;
    },
    async getTables() {
        let [rows, _] = await Database.raw('select * from Tables');
        if (!rows.length)
            return null;

        return rows;
    },
    async getBillById(id) {
        let [rows, _] = await Database.raw('select * from bills where bills.Id=?', [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },
    async getBillDetailsById(id) {
        let [rows, _] = await Database.raw('select * from billDetails where billDetails.Id = ?', [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    /*==========================TABLE===========================*/
    async getTableById(id) {
        let [rows, _] = await Database.raw('select * from tables where tables.Id=?', [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getBillDetailsByBillId(id) {
        let [rows, _] = await Database.raw(`select * from billDetails join MenuItems on MenuItems.Id = billDetails.MenuItemId
        where billDetails.billId = ? `, [id]);
        if (!rows.length)
            return null;

        return rows;
    },

    async getBillTotal(id) {
        let [rows, _] = await Database.raw(
            `select sum(billDetails.BillPrice) as total 
            from billDetails where billDetails.billId = ?`, [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getMenuItemById(id) {
        let [rows, _] = await Database.raw(
            `select * from MenuItems where Id =?`, [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },


    async getCurrentBillByTableId(tableId) {
        let [rows, _] = await Database.raw('select * from Bills where TableId = ? and CloseTime IS NULL', [tableId]);
        if (!rows.length)
            return null;

        return rows[0]; // only return the latest Bill of that table
    },

    async getMenuItemsByComboId(id) {
        // we at first also call the function for the raw sql query
        let [rows, _] = await Database.raw(`select mi.Id as Id, mi.Name as Name,ci.Price as Price, DefaultDuration, ItemTypeId
        from MenuItems mi 
        join ComboItems ci on ci.MenuItemsId = mi.Id
        where ci.CombosId =  ? `, [parseInt(id)]); // the question mark will be interpreted as the requirements of passing arguments
        // furthermore, we must use the parseInt function to make sure the datatype of the field 
        if (!rows.length)
            return null;

        return rows;
    },

    /*=================KITCHEN STAFFS==================*/

    async getStaffById(id) {
        let [rows, _] = await Database.raw(`select * from KitchenStaffs
        join stafftypes on kitchenstaffs.stafftypeId = stafftypes.Id
        where kitchenstaffs.Id = ?`, [id]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getCurrentBillDetailByStaffId(staffId) {
        let [rows, _] = await Database.raw(
            `select bDetails.Id, mItems.Name as ItemName, bDetails.State, bDetails.PredictedServedTime 
        from BillDetails as bDetails 
        join MenuItems as mItems on bDetails.MenuItemId = mItems.Id 
        where bDetails.StaffId = ? and state=1 limit 1`, [parseInt(staffId)]);
        if (!rows.length) {
            return null;
        }
        return rows[0];
    },

    async getNextBillDetailByStaffId(staffId) {
        let detail = await getCurrentBillDetailByStaffId(staffId);
        if (detail)
            return null;
        let nInQueue = await getNearestInQueueBillDetailByStaffId(staffId);

        return nInQueue;
    },

    async getNearestInQueueBillDetailByStaffId(staffId) {
        let [rows, _] = await Database.raw(`
    select bDetails.Id, mItems.Name as ItemName, bDetails.State, bDetails.PredictedServedTime, bDetails.Duration 
    from BillDetails as bDetails join MenuItems as mItems
    on bDetails.MenuItemId = mItems.Id
    where bDetails.StaffId = ? and state=0 limit 1`, [parseInt(staffId)]);
        if (!rows.length) {
            return null;
        }
        return rows[0];

    },

    // get the staff that has the fewest prepared food/drink
    async getLowestInQueueStaff(itemType) {
        let [rows, _] = await Database.raw(
            `select KitchenStaffs.Id, count(KitchenStaffs.Id) as count_Id, KitchenStaffs.StaffTypeId
        from KitchenStaffs join BillDetails on KitchenStaffs.Id = BillDetails.StaffId
        group by KitchenStaffs.Id having count_Id > -1 and KitchenStaffs.StaffTypeId = ?
        order by(count_Id) asc`, [itemType]);
        if (!rows.length)
            return null;

        return rows[0];
    },


    /*===================MANAGER================*/

    async getStaffByPersonalId(personalId) {
        let [rows, _] = await Database.raw('select * from KitchenStaffs where personalId = ?', [personalId]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getTableByCode(Code) {
        let [rows, _] = await Database.raw('select * from Tables where Tables.Code = ?', [Code]);
        if (!rows.length)
            return null;

        return rows[0];
    },

    async getMenuItemByName(itemName) {
        let [rows, _] = await Database.raw('select * from MenuItems where MenuItems.Name  = ?', [itemName]);
        if (!rows.length)
            return null;
        return rows[0];
    },
    async getComboById(id) {
        let [rows, _] = await Database.raw('select * from Combos where Combos.Id = ?', parseInt(id));
        if (!rows.length)
            return null;
        return rows[0];
    },

    async getComboByName(name) {
        let [rows, _] = await Database.raw('select * from Combos where Combos.Name = ?',[name]);
        if (!rows.length)
            return null;

        return rows[0];
    },
    async getItemTypeIdByItemType(type){
        let [rows,_] = await Database.raw('select Id from itemtypes where itemtypes.ItemType=?',[type]);
        if(!rows.length)
            return null;
        return rows[0].Id;
    }
}