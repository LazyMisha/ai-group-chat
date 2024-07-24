'use client';

import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import styles from './kebabMenu.module.css';

const KebabMenu = ({
    closeMenu,
}) => {
    const kebabMenuRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (kebabMenuRef.current && !kebabMenuRef.current.contains(e.target)) {
                closeMenu();
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [closeMenu]);

    return (
        <div 
            ref={kebabMenuRef} 
            className={styles['kebab-menu']}
        >
            <button 
                className={styles['kebab-menu-item']} 
                onClick={() => signOut({ 
                    callbackUrl: '/', 
                    redirect: true 
                })}
            >
                Sign Out
            </button>
        </div>
    );
}

export default KebabMenu;