require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { Web3 } = require("web3");
const { HttpProvider } = require("web3-providers-http");
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nfc_system',
  password: 'tu_contraseña',
  port: 5432
});
if (!process.env.AVALANCHE_RPC) {
    throw new Error("❌ ERROR: La variable de entorno AVALANCHE_RPC no está definida.");
}
// Conexión a Avalanche
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.AVALANCHE_RPC));
const contractABI = JSON.parse(fs.readFileSync('./NFCNFT_ABI.json'));
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log("✅ Conectado a Avalanche RPC:", process.env.AVALANCHE_RPC);

// Endpoint para buscar usuario por chip
app.get('/api/user', async (req, res) => {
  const { chipId } = req.query;
  const result = await pool.query('SELECT * FROM users WHERE chip_id = $1', [chipId]);
  if (result.rows.length) {
    res.json({ success: true, user: result.rows[0] });
  } else {
    res.json({ success: false, message: 'Usuario no encontrado' });
  }
});

app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));
