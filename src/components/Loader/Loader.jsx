import React from 'react';
import css from './Loader.module.css';

const Loader = ({isOpen}) => {
    if (isOpen) {
        return (
            <div className={css.LoaderOverlay}>
                <div className={css.Loader}>LOAD</div>
            </div>
        );
    }
}

export default Loader;
