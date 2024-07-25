'use client';

import UserSelectorOption from '../UserSelectorOption';
import styles from './userSelector.module.css';

const UserSelector = ({
    users, 
    sessionUser,
    selectedUserIds,
    setSelectedUserIds,
}) => {
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