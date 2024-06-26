"use client";
/* eslint-disable @next/next/no-img-element */
import AdvertsList from "../components/list/advertsList";
import { Hero } from "../components/hero/hero";

const HomePage = () => {
    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden w-full">
                <Hero />

                {/* MAIN */}
                <div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
                    <div className="text-center">
                        <h2 className="text-900 font-bold mb-2">Lo más destacado</h2>
                    </div>

                    <div className="grid mt-2 pb-2 md:pb-8">
                        <AdvertsList />
                    </div>

                    <div className="text-center">
                        <h2 className="text-900 font-bold mb-2">Estilo de vida</h2>
                    </div>

                    <div className="grid mt-2 pb-2 md:pb-8">
                        <AdvertsList tag={"lifestyle"} />
                    </div>

                    <div className="text-center">
                        <h2 className="text-900 font-bold mb-2">Moda</h2>
                    </div>

                    <div className="grid mt-2 pb-2 md:pb-8">
                        <AdvertsList tag={"fashion"} />
                    </div>

                    <div className="text-center">
                        <h2 className="text-900 font-bold mb-2">Tecnología</h2>
                    </div>

                    <div className="grid mt-2 pb-2 md:pb-8">
                        <AdvertsList tag={"technology"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
