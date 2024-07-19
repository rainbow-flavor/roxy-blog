import React, { useEffect, useState } from 'react';
import Wallpaper from '@site/static/img/wallpaper.png';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/core/lib/client/exports/Link';
import clsx from "clsx";

const FeatureList = [
    {
        title: 'Support Us',
        name: 'rainbow-flavor',
        description: (
            <>
                Give me a star at here <br />
                <Link href="https://github.com/rainbow-flavor">GitHub</Link>
            </>
        ),
    },
    {
        title: 'Support Hank',
        name: 'hankbae93',
        description: (
            <>
                Give me a star at here <br />
                <Link href="https://github.com/hankbae93">GitHub</Link>
            </>
        ),
    },
    {
        title: 'Support Irostub',
        name: 'irostub',
        description: (
            <>
                Give me a star at here <br />
                <Link href="https://github.com/irostub">GitHub</Link>
            </>
        ),
    },
];

function Feature({ title, description, name }) {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const [src, setSrc] = useState('');

    const getProfileImg = async () => {
        const response = await fetch(`https://api.github.com/users/${name}`);
        const data = await response.json();
        setSrc(data.avatar_url);
    };

    useEffect(() => {
        getProfileImg();
    }, []);

    return (
        <div
            className={
            clsx(
                isDarkMode ? 'bg-gray-800' : 'bg-white',
                isDarkMode ? 'text-white' : 'text-black',
                "shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-6"
            )
            }
        >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <img
                className="w-24 h-24 rounded-full mb-4 shadow-md"
                src={src}
                alt={name}
            />
            <p className="text-center">{description}</p>
        </div>
    );
}

export function HomepageFeatures() {
    return (
        <section className="py-12 ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function NerdHomepageFeatures() {
    return (
        <div className="relative w-full h-screen">
            <img
                className="object-cover w-full h-full"
                src={Wallpaper}
                alt="Roxy 월페이퍼"
            />
        </div>
    );
}
