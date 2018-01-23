/* Variables */
let clientStatus = {
    serverError: ["Error 500 ( Server Error )", [
        // URL
    ], [
            // Etiqueta elegida en el html
        ]],
    methodNotFound: ["Error 405 ( Method Not Found )", [], []],
    pageNotFound: ["Error 404 ( Page Not Found ) "],
    forbidden: ["Error 403 ( Forbidden ) "],
    ok: ["Status 200 ( OK ) "]
};
let urls = [/*Tus rutas*/];
let routeVars = [/*Las variables personalizadas de tus rutas*/];
let client = new XMLHttpRequest();

/* Funciones */
function replaceVars(url, vars) {
    for (let mustacheVar of routeVars) {
        (url.includes(mustacheVar) && mustacheVar === 'cambiame') ? url = url.replace(mustacheVar, 'cambiame') : url = url.replace(mustacheVar, 'cambiame');
    }
    return url;
}
function getStatus(client, url) {
    client.open("POST", url, false);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(null);
    if (client.status === 500) {
        clientStatus.serverError[1].push(url);
        clientStatus.serverError[2].push(client.responseText.substring(client.responseText.lastIndexOf("<h1>") + 1, client.responseText.lastIndexOf("</h1>")));
    }
    if (client.status === 405) {
        clientStatus.methodNotFound[1].push(url);
        clientStatus.methodNotFound[2].push(client.responseText.substring(client.responseText.lastIndexOf("<h1>") + 1, client.responseText.lastIndexOf("</h1>")));
    }
    if (client.status === 404) clientStatus.pageNotFound.push(url);
    if (client.status === 403) clientStatus.forbidden.push(url);
    if (client.status === 200) clientStatus.ok.push(url);
}
function getUrls(clientStatus) {
    for (const key in clientStatus) {
        if (clientStatus.hasOwnProperty(key)) {
            const element = clientStatus[key];
            console.log(element);
        }
    }
}

/* Ejecución */
urls.forEach(element => {
    let url = /*Base url*/ + replaceVars(element, routeVars);;
    getStatus(client, url);
});
getUrls(clientStatus);
