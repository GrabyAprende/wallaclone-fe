'use client';
import { useState, createContext, useEffect } from 'react';
import { ChildContainerProps } from '@/types';
import { useRouter } from 'next/navigation';
import { UserDetails } from '@/types/general.types';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { decrypt, encrypt } from '@/app/utils/encryptation.utils';

// Esta es la interfaz de las propiedades que vamos a compartir
interface SessionContextProps {
    isLogged: boolean;
    userDetails: UserDetails | undefined;
    token: string;
    handleNewToken: (token: string) => void
    logout: () => void;
}

// Creamos el contexto  (no le des muchas vueltas)
export const SessionContext = createContext({} as SessionContextProps);


// Creamos el provider, que recibira un hijo (Todos los componentes que compartiran este provider)
// En este caso estará en el Layout principal para que todos los componentes 
export const SessionProvider = ({ children }: ChildContainerProps) => {
    const router = useRouter();

    // Aqui van los estados que vamos a compartir
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [token, setToken] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    // La primera vez que se cargue, miraremos si hay cookie de token y si hay
    // Actualizaremos el estado token del hook al valor de la cookie
    useEffect(() => {
        if (hasCookie("token")) {
            const encryptedToken = getCookie("token") as string;
            const token = decrypt(encryptedToken);
            setToken(token)
        } 
    }, []);

    // Cada vez que cambie el token (o el router, pero eso no cambiará)
    useEffect(() => {
        const handleUser = async () => {
            try {
                // Intentamos obtener respuesta del endpoint
                const userResponse = await fetch('https://coderstrikeback.es/api/adverts-user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
    
                // Si hay respuesta
                if (userResponse.ok) {
                    // Obtenemos el user details y actualizamos los estados correspondientes
                    const userDetails: UserDetails = await userResponse.json();
                    setUserDetails(userDetails);
                    setIsLogged(true);
                } else {
                    // Si hay algun fallo, no seteamos nada y deslogueamos
                    setIsLogged(false);
                    console.error("error en userUser no hay respuesta de usuario")
                }
            } catch(err) {
                setIsLogged(false);
                console.error("error en useUser obteniendo usuario")
            }
        }

        if(!!token) {
            handleUser();
        }
    }, [token, router])


    const handleNewToken = (token: string) => {
        const encryptedToken = encrypt(token);

        setCookie('token', encryptedToken, { // Creamos la cookie con el token encriptado
            httpOnly: false, 
            maxAge: 60 * 60 * 1, 
            path: '/', // Disponible en todo el sitio
        });

        setToken(token);
    }

    const logout = () => {
        setToken("");
        deleteCookie("token");
        setIsLogged(false);
        router.push("/login")
    }
    
    const value: SessionContextProps = { isLogged, userDetails, token, handleNewToken, logout };

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
