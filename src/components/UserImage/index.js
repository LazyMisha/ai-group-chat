import Image from 'next/image';
import styles from './userImage.module.css';

const UserImage = ({ image, name }) => {
    return (
        <div className={styles['user-image-container']}>
            <Image
                className={styles['user-image']}
                src={image}
                alt={name}
                width={32}
                height={32} 
            />
        </div>
    );
}

export default UserImage;