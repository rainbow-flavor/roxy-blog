import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import usePathname from '../hooks/use-pathname';
import Wallpaper from '@site/static/img/wallpaper.png';
import Wallpaper2 from '@site/static/img/loading.webp';
import { useMainContext } from '../context/main-context';

const PageTransition = ({ children }) => {
    const { isStrict } = useMainContext();
    const { folderUrl } = usePathname();

    return (
        <>
            <AnimatePresence>
                <div key={folderUrl}>
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{
                            opacity: 0,
                            transition: {
                                delay: 1,
                                duration: 0.6,
                                ease: 'easeInOut',
                            },
                        }}
                        className="h-screen w-screen fixed bg-black top-0 pointer-events-none z-[201]"
                    >
                        <motion.img
                            className="object-cover w-full h-full"
                            initial={{
                                filter: 'grayscale(100%)',
                            }}
                            animate={{
                                filter: 'grayscale(0%)',
                                transition: {
                                    delay: 0.6,
                                    duration: 0.5,
                                    ease: 'easeInOut',
                                },
                            }}
                            src={isStrict ? Wallpaper2 : Wallpaper}
                            alt="roxy"
                        />
                    </motion.div>
                </div>
                {children}
            </AnimatePresence>
        </>
    );
};

export default PageTransition;
