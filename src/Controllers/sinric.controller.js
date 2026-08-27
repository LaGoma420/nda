const WebSocket = require('ws');

const APP_KEY = '0ff4061f-4684-4773-8261-2aacf0dedc51';
const APP_SECRET = '4189aecb-64ad-4c5b-a437-a138648f7f78-fea1b7cd-cfd9-4653-869a-dda7ec6ddedd';
const DEVICE_ID = '6a85f57109efd1746c448c53';

let ws;

const connectWebSocket = () => {
    ws = new WebSocket('wss://ws.sinric.pro');

    ws.on('open', () => {
        console.log('WebSocket conectado a Sinric Pro');
        // Autenticación
        const authMsg = {
            action: 'authenticate',
            deviceIds: [DEVICE_ID],
            secretKey: APP_SECRET,
            appKey: APP_KEY
        };
        ws.send(JSON.stringify(authMsg));
    });

    ws.on('message', (data) => {
        const msg = JSON.parse(data);
        console.log('Mensaje recibido:', msg);
    });

    ws.on('close', () => {
        console.log('WebSocket cerrado, reconectando...');
        setTimeout(connectWebSocket, 5000); // Reconectar en 5 segundos
    });
};

// Llamar al iniciar el servidor para establecer conexión
connectWebSocket();

const sinricCtrl = {};

// // Función para encender la bomba
// sinricCtrl.bombaOn = async (req, res) => {
//     try {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//             const command = {
//                 action: 'updateDevice',
//                 deviceId: DEVICE_ID,
//                 value: {
//                     powerState: 'On'
//                 }
//             };
//             ws.send(JSON.stringify(command));
//             res.json({ message: 'Bomba encendida' });
//         } else {
//             res.status(500).json({ error: 'WebSocket no conectado' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error controlando la bomba' });
//     }
// };
sinricCtrl.bombaOn = async (req, res) => {
    try {
        if (ws && ws.readyState === WebSocket.OPEN) {
            // Estructura oficial requerida por el protocolo de Sinric Pro
            const command = {
                header: {
                    payloadVersion: 2,
                    signatureVersion: 1
                },
                payload: {
                    action: "setPowerState", // La acción correcta para encender/apagar
                    createdAt: Math.floor(Date.now() / 1000), // Timestamp en segundos
                    deviceId: DEVICE_ID,
                    replyToken: "node-server-" + Math.floor(Math.random() * 100000), // Token aleatorio
                    value: {
                        powerState: "On" // "On" para encender, "Off" para apagar
                    }
                }
            };

            ws.send(JSON.stringify(command));
            
            // Revisa tu consola de Node.js para ver qué responde Sinric Pro a este mensaje
            res.json({ message: 'Comando de encendido enviado a Sinric Pro' });
        } else {
            res.status(500).json({ error: 'WebSocket no conectado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error controlando la bomba' });
    }
};


module.exports = sinricCtrl;