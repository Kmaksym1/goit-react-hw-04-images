import css from "./image.module.css";
export const ImpageGalleryItem = ({ picture, getId }) => {
  const { id, webformatURL } = picture;
    const handleClick = (id) => {
        getId(id)
    };
    
  return (
    <li className={css.imagesLi} onClick={() => handleClick(id)}>
        <img src={webformatURL} alt={id} className={css.imageCard} />
    </li>
  );
};

