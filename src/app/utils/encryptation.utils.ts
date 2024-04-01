import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const secretKey: string = process.env.ENCRYPTER_SECRET || "";


// Función para encriptar un texto
export function encrypt(text: string): string {
    return AES.encrypt(text, secretKey).toString();
}

// Función para desencriptar un texto
export function decrypt(ciphertext: string): string {
    const bytes  = AES.decrypt(ciphertext, secretKey);
    return bytes.toString(Utf8);
}
