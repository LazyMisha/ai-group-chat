import { components } from 'react-select';
import UserImage from "../UserImage";
import styles from "./selectorOption.module.css";

const { Option } = components;

const SelectorOption = (props) => {
    const { data, label } = props;
    const { name, image } = data;

    return (
        <div className={styles.option}>
                <Option {...props} >
                    <div className={styles['option-data']}>
                        <UserImage 
                            image={image}
                            name={name}
                            size={40}
                        />
                        <span>{label || name}</span>
                    </div>
                </Option>
        </div>
    );
}

export default SelectorOption;