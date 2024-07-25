'use client';

import UserImage from "../UserImage";
import styles from "./userSelectorOption.module.css";

const UserSelectorOption = ({ 
    id,
    name,
    image,
    selectedUserIds,
    setSelectedUserIds,
 }) => {
    const isSelected = selectedUserIds.includes(id);
    const optionCls = isSelected 
        ? `${styles.option} ${styles.selected}` 
        : styles.option;

    const handleClick = () => {
        setSelectedUserIds((selectedUserIds) => {
            if (isSelected) {
                return selectedUserIds.filter((userId) => userId !== id);
            }

            return [...selectedUserIds, id];
        });
    }

    return (
        <div 
            className={optionCls}
            onClick={handleClick}
        >
            <UserImage 
                image={image} 
                name={name} 
            />
            <div>{name}</div>
        </div>
    );
}

export default UserSelectorOption;