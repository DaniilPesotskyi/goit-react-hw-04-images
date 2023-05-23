import css from './Button.module.css';

function Button({onLoadMore}) {
    return (
        <button type="button" className={css.button} onClick={() => onLoadMore()}>
            Load More
        </button>
    );
}

export default Button;
