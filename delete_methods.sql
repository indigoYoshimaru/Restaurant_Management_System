delimiter //
CREATE PROCEDURE deleteItem (id INT)
BEGIN
	IF EXISTS (SELECT * FROM menuitems WHERE Id = id)
		THEN DELETE FROM menuitems WHERE Id = id;
	END IF;
END //

delimiter //
CREATE PROCEDURE deleteCombo (id INT)
BEGIN
	IF EXISTS (SELECT * FROM combos WHERE Id = id)
		THEN DELETE FROM combos WHERE Id = id;
	END IF;
END //
    
delimiter //
CREATE PROCEDURE deleteCook (id INT)
BEGIN
	IF EXISTS (SELECT * FROM cooks WHERE Id = id)
		THEN DELETE FROM cooks WHERE Id = id;
	END IF;
END //

delimiter //
CREATE PROCEDURE deleteCustomer (id INT)
BEGIN
	IF EXISTS (SELECT * FROM customers WHERE Id = id)
		THEN DELETE FROM customers WHERE Id = id;
	END IF;
END //

delimiter //
CREATE PROCEDURE deleteTable (id INT)
BEGIN
	IF EXISTS (SELECT * FROM tables WHERE Id = id)
		THEN DELETE FROM tables WHERE Id = id;
	END IF;
END //

delimiter //
CREATE PROCEDURE deleteBill (id INT)
BEGIN
	IF EXISTS (SELECT * FROM bills WHERE Id = id)
		THEN DELETE FROM bills WHERE Id = id;
	END IF;
END //

delimiter //
CREATE PROCEDURE deleteBillDetail (id INT)
BEGIN
	IF EXISTS (SELECT * FROM billdetails WHERE Id = id)
		THEN DELETE FROM billdetails WHERE Id = id;
	END IF;
END //
