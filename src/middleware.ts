import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/app/utils/encryptation.utils';
import { UserDetails } from './types/general.types';
import { getCookie } from 'cookies-next';

// Funcion para verificar si el usuario está verificado (le mandamos la cookie)
// Retornará true si está verificado y false si no
const verifyUserAuthentication = async (tokenCookie: string | undefined) => {

  // Si existe la cookie (que puede que no) seguimos sino retornamos false
  if (tokenCookie) {

    // Desencriptamos el token
    const token = decrypt(tokenCookie);

    try {
        // Intentamos obtener el usuario
        const userResponse = await fetch(
            'https://coderstrikeback.es/api/adverts-user',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
  
        // Si hay respuesta
        if (userResponse.ok) {
          // Significa que hay usuario, con lo cual retornamos true
          const userDetails: UserDetails = await userResponse.json();
          if (userDetails) return true;
        } else {
          // Si hay algun fallo, retornamos false
          return false;
        }
    } catch (err) {
      // Cualquier tipo de error es que el usuario no existe así que false
      return false;
    }

  } else {
    return false;
  }
};


// Este middleware se ejecutara siempre cuando cambiemos de ruta
// Antes de que se cargue el componente de esa ruta
export async function middleware(request: NextRequest) {
    // Primero obtenemos la url
    const url = request.nextUrl.clone();
    const { pathname } = url;
  
    // Estas rutas son las rutas protegidas
    // Añadiremos todas las rutas que requieran autorización
    const protectedRoutes = ['/newadvert'];
  
    // Verificamos si la ruta actual es una de las rutas protegidas
    const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route));

    // Obtenemos (o no) el token de las cookies
    let tokenCookie = request.cookies.get("token")?.value || getCookie("token");

    // Esperamos a ver si el usuario está autenticado
    const isLogged = await verifyUserAuthentication(tokenCookie);

    // Si la ruta requiere autenticación y el usuario no está logueado, redirige a `/register`
    // Sino, redirigirá a la ruta protegida (porque sí está logeado)
    if (requiresAuth && !isLogged) {
      url.pathname = '/register';
      return NextResponse.redirect(url);
    }

    // Si la ruta es login pero está logeado,
    // lo redirigimos a la página principal
    const loginRoute = '/login';
    if (pathname.startsWith(loginRoute) && isLogged ) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  
    return NextResponse.next();
  }