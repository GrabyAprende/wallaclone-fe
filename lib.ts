import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import { setCookie } from 'cookies-next';

const secretKey = "secret"; // HAY QUE PONER UN SECRETO EN EL .env
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(key)
}

export async function decrypt(input: string) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });

    return payload;
}

export async function login(formData: FormData) {

    // HACEMOS LA LLAMADA A LOGIN PARA QUE NOS DE EL TOKEN 
    const loginResponse = await fetch("http://35.169.246.52/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
        }),
    });

    const token = await loginResponse.json();

    if (!loginResponse.ok) {
        // CONTROLAR MENSAJE DE ERROR SI NO NOS LLEGA TOKEN
        console.log("NO LLEGO TOKEN")
    }

    // HAREMOS LA LOGICA PARA EL USUARIO
    console.log("LOGUEADO!, ESTE ES EL TOKEN ------->", token);

    // CONTROLAR COMO VAMOS A CONSEGUIR EL USUARIO CON EL NUEVO ENDPOINT
    // DE MOMENTO TENEMOS ESTE USUARIO FALSO
    const user = {
        id: "vic1",
        name: "Gaby",
    };

    // Creamos la cookie, con expiracion de 10 segundos (Esto habra que cambiarlo a una hora)
    const expires = new Date(Date.now() + 10 * 1000);
    // Encriptamos la session
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: false});
}

export async function logout(formData: FormData) {
    cookies().set("session", "", { expires: new Date(0)});
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = cookies().get("session")?.value;
    // Si no hay sesion nos vamos
    if (!session) return;

    // Creamos una nueva cookie y actualizamos su expire a 10 segundos más (cambiar a 1 hora)
    const parsed = await decrypt(session);
    const expires = new Date(Date.now() + 10 * 1000);
    const response = NextResponse.next();
    response.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: false,
        expires
    });
    return response;
}