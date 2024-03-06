import type { FC } from "react";
import Image from "next/image";

export const Logo: FC = () => {
    return (
        <Image fill src={`/layout/images/logo.png`} alt="Wallaclone logo" className="relative w-8rem flex-shrink-0" />
    );
};
