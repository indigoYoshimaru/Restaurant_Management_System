const Route = use('Route')
const Database = use('Database'); // use database

var query_service = require('./../../database/query_service');
var update_service = require('./../../database/update_service');

//=================================STAFF=============================//

Route.get('/staff/info', async ({ request, session }) => {
    let id = session.get("staffId", null);
    console.log(id);
    if (!id) {
        return {
            debug: {
                staffId: session.get('staffId')
            },
            error: "Not set up yet"
        }
    }
    try {
        let staff = await query_service.getStaffById(id);
        let cbillDetail = await query_service.getCurrentBillDetailByStaffId(id);
        let nbillDetail = await query_service.getNearestInQueueBillDetailByStaffId(id);
        if (staff) {
            return {
                result:
                {
                    staff: staff,
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
                cookId: session.get('staffId')
            },
            error: exc
        }
    }

    return {
        debug: {
            cookId: session.get('staffId')
        },
        error: "unknown error"
    }
})


Route.post('/staff/setup', async ({ request, session }) => {
    let query = request.all();
    let staffId = query.staffId;
    let staff = await query_service.getStaffById(staffId);
    if (!staff) {
        return {
            error: "No staff found."
        }
    }

    session.put('staffId', parseInt(staffId));
    return {
        result: "Staff set up",
        debug: {
            staffId: session.get('staffId')
        }

    }
})


Route.post('/staff/start', async ({ request, session }) => {
    let staffId = session.get("staffId", null);
    let query = request.all();
    if (!staffId) {
        return {
            error: "No staff found"
        }
    }
    console.log("StaffId: ", staffId)
    let detail = await query_service.getNextBillDetailByStaffId(staffId);
    if (!detail) {
        return {
            error: "No bill detail found."
        }
    }

    let minutes = query.time; // the predicted cooking time in minute
    console.log(minutes);

    let lbTime = new Date();//get 'now' time as the lowerbound
    let ubTime = new Date(lbTime);
    ubTime.setHours(ubTime.getHours() + 1);// get the upperbound of the predicted time
    //maximum cooking hour will be 1(hour)
    // return epoch if doesn't have new Date() for ubTime and predictedFinishTime


    let predictedFinishTime = new Date(lbTime);
    console.log("predicted Finish Time: ", predictedFinishTime.getMinutes());
    let finishMin = predictedFinishTime.getMinutes() + parseInt(minutes); // the calculation of the predicted time 
    console.log("Finish min: ", finishMin);

    predictedFinishTime.setMinutes(finishMin);// transform the minute input to realtime


    console.log("predicted Finish Time: ", predictedFinishTime.toString());
    console.log("Lower:", lbTime.toString());
    console.log("Upper: ", ubTime.toString());
    if (predictedFinishTime > lbTime && predictedFinishTime < ubTime) { // if the predictedTime in the valid range
        await update_service.setBillDetailTime(detail.Id, lbTime, predictedFinishTime); //set lbTime as beginTime in db
        return {
            result: `The order is predicted to finish at: ` + JSON.stringify(predictedFinishTime.toTimeString())
        }
    }

    return {
        error: "False time set"
    }
})


Route.post('/staff/finish', async ({ request, session }) => {
    let id = session.get('staffId', null);
    if (!id) {
        return {
            error: "Not set up yet"
        }
    }
    let staff = await query_service.getStaffById(id);

    let billDetail = await query_service.getCurrentBillDetailByStaffId(id);
    if (!billDetail) {
        return {
            error: "No meal to finish"
        }
    }
    var currentTime = new Date();
    await update_service.setBillDetailFinishState(billDetail, currentTime);
    return {
        result: "Meal finished at" + JSON.stringify(currentTime.toTimeString())
    }
})

