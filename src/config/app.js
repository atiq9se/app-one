(async function(){
    const app = await require('./express')();

    app.listen(5000, ()=>console.log("Server is Running in port 5000"))
})();