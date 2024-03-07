/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Image from 'next/image';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <Image src={`/layout/images/logo${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.png`} alt="Wallaclone Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">PrimeReact</span>
        </div>
    );
};

export default AppFooter;
