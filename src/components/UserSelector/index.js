'use client';

import { useState, useEffect, useRef } from 'react';
import UserSelectorOption from '../UserSelectorOption';
import styles from './userSelector.module.css';

const UserSelector = ({ 
    sessionUser,
    selectedUserIds,
    setSelectedUserIds,
}) => {
    const [users, setUsers] = useState([]);
    const isMounted = useRef(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (isMounted.current) {
                return;
            }

            isMounted.current = true;

            const response = await fetch('/api/users');
            const { users } = await response.json();

            setUsers(users);
        };

        fetchUsers();
    }, []);

    return (
        <div
            className={styles.select}
            id="users" 
            name="users" 
            multiple 
            required
        >
            {
                users?.map(({
                    id,
                    name,
                    image,
                }) => (
                    sessionUser?.name !== name 
                    ? <UserSelectorOption
                            key={id}
                            id={id}
                            name={name}
                            image={image}
                            selectedUserIds={selectedUserIds}
                            setSelectedUserIds={setSelectedUserIds}
                        />
                    : null
                ))
            }
        </div>
    );
}

export default UserSelector;