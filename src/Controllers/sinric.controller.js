// const WebSocket = require('ws');

// const APP_KEY = '0ff4061f-4684-4773-8261-2aacf0dedc51';
// const APP_SECRET = '4189aecb-64ad-4c5b-a437-a138648f7f78-fea1b7cd-cfd9-4653-869a-dda7ec6ddedd';
// const DEVICE_ID = '6a85f57109efd1746c448c53';

// let ws;

// const connectWebSocket = () => {
//     ws = new WebSocket('wss://ws.sinric.pro');

//     // ws.on('open', () => {
//     //     console.log('WebSocket conectado a Sinric Pro');
//     //     // Autenticación
//     //     const authMsg = {
//     //         action: 'authenticate',
//     //         // deviceIds: [DEVICE_ID],
//     //         secretKey: APP_SECRET,
//     //         appKey: APP_KEY
//     //     };
//     //     ws.send(JSON.stringify(authMsg));
//     // });

//     // ws.on('message', (data) => {
//     //     const msg = JSON.parse(data);
//     //     console.log('Mensaje recibido:', msg);
//     // });

//     // ws.on('close', () => {
//     //     console.log('WebSocket cerrado, reconectando...');
//     //     setTimeout(connectWebSocket, 5000); // Reconectar en 5 segundos
//     // });


//     ws.on('open', () => {
//         console.log('WebSocket conectado');
//         // Autenticación
//         ws.send(JSON.stringify({
//             action: 'authenticate',
//             appKey: APP_KEY,
//             secretKey: APP_SECRET
//         }));
//         // Tras autenticar, puedes enviar comandos
//     });

//     ws.on('message', (data) => {
//         const msg = JSON.parse(data);
//         console.log('Respuesta:', msg);
//         // Aquí puedes verificar si la autenticación fue exitosa y si recibes confirmaciones
//     });

//     // Función para enviar comando de encendido
//     const encenderBomba = () => {
//         if (ws.readyState === WebSocket.OPEN) {
//             const command = {
//                 header: {
//                     payloadVersion: 2,
//                     signatureVersion: 1
//                 },
//                 payload: {
//                     action: "setPowerState",
//                     createdAt: Math.floor(Date.now() / 1000),
//                     deviceId: DEVICE_ID,
//                     replyToken: "node-server-" + Math.floor(Math.random() * 100000),
//                     value: {
//                         powerState: "On"
//                     }
//                 }
//             };
//             ws.send(JSON.stringify(command));
//             console.log('Enviado comando de encendido');
//         } else {
//             console.log('WebSocket no está abierto');
//         }
//     };
// };

// // Llamar al iniciar el servidor para establecer conexión
// connectWebSocket();

// const sinricCtrl = {};

// // // Función para encender la bomba
// // sinricCtrl.bombaOn = async (req, res) => {
// //     try {
// //         if (ws && ws.readyState === WebSocket.OPEN) {
// //             const command = {
// //                 action: 'updateDevice',
// //                 deviceId: DEVICE_ID,
// //                 value: {
// //                     powerState: 'On'
// //                 }
// //             };
// //             ws.send(JSON.stringify(command));
// //             res.json({ message: 'Bomba encendida' });
// //         } else {
// //             res.status(500).json({ error: 'WebSocket no conectado' });
// //         }
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Error controlando la bomba' });
// //     }
// // };


// // sinricCtrl.bombaOn = async (req, res) => {
// //     try {
// //         if (ws && ws.readyState === WebSocket.OPEN) {
// //             // Estructura oficial requerida por el protocolo de Sinric Pro
// //             const command = {
// //                 header: {
// //                     payloadVersion: 2,
// //                     signatureVersion: 1
// //                 },
// //                 payload: {
// //                     action: "setPowerState", // La acción correcta para encender/apagar
// //                     createdAt: Math.floor(Date.now() / 1000), // Timestamp en segundos
// //                     deviceId: DEVICE_ID,
// //                     replyToken: "node-server-" + Math.floor(Math.random() * 100000), // Token aleatorio
// //                     value: {
// //                         powerState: "On" // "On" para encender, "Off" para apagar
// //                     }
// //                 }
// //             };

// //             ws.send(JSON.stringify(command));

// //             // Revisa tu consola de Node.js para ver qué responde Sinric Pro a este mensaje
// //             res.json({ message: 'Comando de encendido enviado a Sinric Pro' });
// //         } else {
// //             res.status(500).json({ error: 'WebSocket no conectado' });
// //         }
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Error controlando la bomba' });
// //     }
// // };

// sinricCtrl.bombaOn = async (req, res) => {
//     try {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//             const command = {
//                 header: {
//                     payloadVersion: 2,
//                     signatureVersion: 1
//                 },
//                 payload: {
//                     action: "setPowerState",
//                     createdAt: Math.floor(Date.now() / 1000),
//                     deviceId: DEVICE_ID,
//                     replyToken: "node-server-" + Math.floor(Math.random() * 100000),
//                     value: {
//                         powerState: "On"
//                     }
//                 }
//             };

//             console.log('Enviando comando:', command);
//             ws.send(JSON.stringify(command));
//             res.json({ message: 'Comando de encendido enviado a Sinric Pro' });
//         } else {
//             console.log('WebSocket no está abierto');
//             res.status(500).json({ error: 'WebSocket no conectado' });
//         }
//     } catch (err) {
//         console.error('Error al enviar comando:', err);
//         res.status(500).json({ error: 'Error controlando la bomba' });
//     }
// };

// module.exports = sinricCtrl;


// const https = require('https');

// const sinricCtrl = {}

// // const API_KEY = '0ff4061f-4684-4773-8261-2aacf0dedc51';
// const API_KEY = '0635886c-ef9b-428a-b5fd-ae4a7603dbea';
// const DEVICE_ID = '6a85f57109efd1746c448c53';


// // Función para enviar comando a SinricPro
// function sendPowerState(state) {
//     const data = JSON.stringify({ state: state ? 'On' : 'Off' });

//     const options = {
//         hostname: 'api.sinric.pro',
//         port: 443,
//         path: `/api/v1/devices/${DEVICE_ID}/power`,
//         method: 'GET',
//         headers: {
//             'Authorization': API_KEY,
//             'Content-Type': 'application/json',
//             'Content-Length': data.length,
//         },
//     };

//     const req = https.request(options, (res) => {
//         let responseData = '';
//         res.on('data', (chunk) => {
//             responseData += chunk;
//         });
//         res.on('end', () => {
//             console.log('Respuesta SinricPro:', responseData);
//         });
//     });

//     req.on('error', (error) => {
//         console.error('Error en la petición:', error);
//     });

//     req.write(data);
//     req.end();
// }


// sinricCtrl.bombaOn = async (req, res) => {
//     try {
//         sendPowerState(true);
//         res.json({ mensaje: 'Bomba encendida' });
//     } catch (err) { console.log(err) }
// }
// sinricCtrl.bombaOff = async (req, res) => {
//     try {
//         sendPowerState(false);
//         res.json({ mensaje: 'Bomba Apagada' });
//     } catch (err) { console.log(err) }
// }

// module.exports = sinricCtrl

const https = require('https');

const sinricCtrl = {};

const API_KEY = '0635886c-ef9b-428a-b5fd-ae4a7603dbea';
const DEVICE_ID = '6a85f57109efd1746c448c53';

// Función para enviar comando a SinricPro
function sendPowerState(state) {
    // Formato de payload requerido por la API HTTP POST de Sinric Pro
    const data = JSON.stringify({ 
        type: 'request', 
        action: 'setPowerState',
        value: JSON.stringify({ state: state ? 'On' : 'Off' })
        // value: {
        //     state: state ? 'On' : 'Off'
        // }
    });

    const options = {
        hostname: 'api.sinric.pro',
        port: 443,
        path: `/api/v1/devices/${DEVICE_ID}/action`, // Endpoint correcto para acciones
        method: 'POST', // Cambiado de GET a POST
        headers: {
            'x-sinric-api-key': API_KEY, // Encabezado de autenticación oficial
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        },
    };

    const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        res.on('end', () => {
            console.log('Respuesta SinricPro:', responseData);
        });
    });

    req.on('error', (error) => {
        console.error('Error en la petición:', error);
    });

    req.write(data);
    req.end();
}

sinricCtrl.bombaOn = async (req, res) => {
    try {
        sendPowerState(true);
        res.json({ mensaje: 'Bomba encendida' });
    } catch (err) { 
        console.log(err);
        res.status(500).json({ error: 'Error interno' });
    }
}

sinricCtrl.bombaOff = async (req, res) => {
    try {
        sendPowerState(false);
        res.json({ mensaje: 'Bomba Apagada' });
    } catch (err) { 
        console.log(err);
        res.status(500).json({ error: 'Error interno' });
    }
}

module.exports = sinricCtrl;
