








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0sweGs5dnpBem45aGhwRWFxUXZxdnRzVExMZmEzcmJaUjdKRjBCM1NXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejNBMWJWTEozOVRwV0dRblFJSE5mZUVMN2V3NW5mRWdTL0kwR1pCdGFYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSlRvcVAzOXEwcmxhYkVnNW5Hc0JacGR2SWtzNkdONmZld1NiVTRrSGxjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDaVZveWhnbnprTHp3NTZIcml6ZUxUemFweTFLcml4d28rcHlzV1lQZ1J3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRQaHpLRzlPQzVkNzZLN085c0JYUXIrMGVpcytvdnM1aVF0RGt5NzNMVXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklubzJrdGY5NXN2SHhaWHRMcTRBQkc1ZXIwMUJPc3hEb09oaitpd3JZMFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1iMnkrTkczcDVaTEJxN3B5amhHUmo4N0MrVUpVSUtuZkVCUlNwZXZGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHJhNDZGVVFUUndRODlWTXZPa05GZGRmZDFkdGJrSFhWeWRMY0ZBQzhRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNkaHp5cHZkQk9BeEx1WnZ4cjJycFBCaE5UMCs0MWVHYnphUVlsNFNDY3dkNUJINVpybUFVLy9JN3d2eU9XTEtuUDVSMmxwKy93UmY4NW9jYS9hWGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6Im5kSy9yeDdkVVQ4bEJPUlVjNHpVRnlVckIvalRjZFRML3VaY2dyT3lrcUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY0MDg0OUUxQUE1Q0VFNjdFNjUzNjQ4MTA2MjNDNzYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDYzNTk3MDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxREZDNzIxNzk3RjgzNkM0MjgxNzdERENEN0E4RUJGMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2MzU5NzA1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTA3ODE3OTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTc2MURGQUY5ODQxQ0JCNkY0RDA5NzhEMTRFMTAwOTUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjM1OTcwOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZkE1NHBxUldRdUdMU2RZMjZxN1lfZyIsInBob25lSWQiOiJjZjU3MDg5NC1hY2FiLTQ5MDUtOTFkNC1iNDhiYzhkYjM2NTMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTBHQ2pJL2JRcEZnY1FqODVYczZzdkU4dk1BPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZkT3RQVlFaQ1lJNFBBUkIyd2VvQ08vbE41RT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI0MUgzSEQ5TCIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjY4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLfwnZC18J2RjOKYhiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSi9rdEpBRUVJaXIzY0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidDJ5SHJqNUJHRk44RUc4NVhLS2JvbERySkExUHQvSGRPSCtrK09WZ3dDVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMG5WbUxkaWR4NUw5aUt5eFFPU3VTVjRaam9qZS9jOENiTW00UWM2RlEyTHM5VkxjNFBHWU5xWENnT2FIcENWSFF3SU9VQ2phbjlsZmQ4T1p3YjdvRGc9PSIsImRldmljZVNpZ25hdHVyZSI6InFZakszdGYySGJka2VnUUgwUVB4NW1JamhONkZ6ZVlJZWplK244UUNlQjR4cWU0dTIyRm1naFhXQ3pud1U1b2IrSkhuVFNZUDY4YUlBMDZEcTdDUGlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzEwNzgxNzk1OjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJkc2g2NCtRUmhUZkJCdk9WeWltNkpRNnlRTlQ3ZngzVGgvcFBqbFlNQWwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDYzNTk3MDIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUU1In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐸ℕ𝐵𝙊𝑌☆",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || '=https://files.catbox.moe/ugqf62.js',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    CHATBOT1 : process.env.CHATBOT1 || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
