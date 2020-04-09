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
const Database = use('Database');
Route.on('/').render('welcome')


async function getItems(){
	let response = await Database.raw("select * from menuitems");
}

async function getItemsById(id){
    let response = await Database.raw("select * from menuitems where Id = ${id}")
}

async function getItemsByMenuId(id){
    let response = await Database.raw("select * from menu where Id = ${id}")
}

async function getItemsByComboId(id){
    let response = await Database.raw("select * from combo where Id = ${id}")
}

async function getMenus(){
	let response = await Database.raw("select Id, MealId, CombosID from menu");
}

async function getCombos(){
    let response = await Database.raw("select * from combo");
}

async function getCooks(){
	let response = await Database.raw("select * from cooks");
}

async function getCookById(id){
    let response = await Database.raw("select * from cooks where Id = ${id}")
}




Route.get('/test-raw', async() => {
    let[rows, _] = await Database.raw('select * from menuitems');
    return rows;
})
