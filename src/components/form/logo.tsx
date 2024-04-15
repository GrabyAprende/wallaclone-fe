import type { FC } from "react";
import Image from "next/image";

export const Logo: FC = () => {
    return (
        <div className="relative">
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={`/layout/images/logo.png`} alt="Wallaclone logo" className="relative w-8rem flex-shrink-0" />
        </div>
    );
};
