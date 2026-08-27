
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
