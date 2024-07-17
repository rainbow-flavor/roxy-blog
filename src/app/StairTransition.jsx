import React from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import usePathname from '../hooks/use-pathname';
import Wallpaper from '@site/static/img/wallpaper.png';
import Wallpaper2 from '@site/static/img/loading.webp';
import { useMainContext } from '../context/main-context';

const stairAnimation = {
    initial: {
        top: '0%',
    },
    animate: {
        top: '100%',
    },
    exit: {
        top: ['100%'],
    },
};

const reverseIndex = (index) => {
    const totalSteps = 6;
    return totalSteps - index - 1;
};

const Stairs = () => {
    const { isStrict } = useMainContext();

    const s = {
        a: 'from-blue-500 to-green-400',
        b: 'from-blue-900 to-gray-800',
    };

    return (
        <>
            {[...Array(6)].map((_, index) => {
                return (
                    <motion.div
                        key={index}
                        variants={stairAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.5,
                            ease: 'easeIn',
                            delay: reverseIndex(index) * 0.1,
                        }}
                        className={`mx-2 shadow-md h-full w-full bg-gradient-to-tr ${
                            s[isStrict ? 'b' : 'a']
                        } overflow-hidden relative`}
                    >
                        <motion.img
                            className="h-screen w-screen absolute  object-cover mix-blend-lighten z-10"
                            src={isStrict ? Wallpaper2 : Wallpaper}
                            alt="roxy"
                        />
                    </motion.div>
                );
            })}
        </>
    );
};

const StairTransition = () => {
    const { folderUrl } = usePathname();

    return (
        <AnimatePresence>
            <div key={folderUrl}>
                <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-[202] flex">
                    <Stairs />
                </div>
            </div>
        </AnimatePresence>
    );
};

export default StairTransition;
