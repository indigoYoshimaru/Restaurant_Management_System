import client from './client'



var setUpTableScreen = {
    data: mainData,
    methods: {
        setup: async function (id) {
            let result = await client.setUpTable(id);

            mainData.currentInfo = await client.getCurrentTableInfo();
            alert(result);
            console.log(mainData.currentInfo);

        }
    },
    data() {
        console.log(mainData.tables);
        return {
            tableData: mainData.tables
        }

    }
}
client.getTables().then(function (result) {
    console.log("Success!", result);
    mainData.tables = result;
    var Ctor = Vue.extend(setUpTableScreen);
    new Ctor().$mount('#setup-table-screen')
    return result;
}).catch(function (error) {
    console.log("Failed!", error);
});
