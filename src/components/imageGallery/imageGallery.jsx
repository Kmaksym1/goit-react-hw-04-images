import { useState } from 'react';

import { ImpageGalleryItem } from './impageGalleryItem';
import css from './image.module.css';

import { Modale } from './modal';

export const ImageGallery = ({ images }) => {
  const [isModal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({});

  const openModal = (id, bool) => {
    setModal(bool);
    setCurrentImage(images.find(el => el.id === id));
  };
  const closeModal = () => {
    setModal(false);
  };

  const getObj = id => {
    setCurrentImage(images.find(el => el.id === id));
    setModal(true);
  };

  return (
    <>
      <ul className={css.galleryList}>
        {images.map(item => {
          return (
            <ImpageGalleryItem
              picture={item}
              key={item.id}
              getId={getObj}
              isModalTrue={openModal}
            />
          );
        })}
      </ul>

      {isModal && (
        <Modale
          image={currentImage}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
    </>
  );
};
//________________________________________________________________

// export class ImageGallery2 extends Component {
//   state = {
//     isModal: false,
//     currentImage: {},
//   };

//   openModal = (id, bool) => {

//     this.setState({ isModal: bool });
//     this.setState({ isModal: id });
//   };
//   closeModal = (e) => {
//     this.setState({ isModal: false });
//   };

//   getObj = (id, images) =>
//   setcurrentImage(images.find((el) => el.id === id))
//     this.setState({
//       currentImage: this.props.images.find((el) => el.id === id),
//       isModal: true,
//     });

//   render() {
//     return (
//       <>
//         <ul className={css.galleryList}>
//           {this.props.images.map((item) => {
//             console.log(item.id);

//             return (
//               <ImpageGalleryItem
//                 picture={item}
//                 key={item.id}
//                 getId={getObj}
//                 isModalTrue={this.openModal}
//               />
//             );
//           })}
//         </ul>

//         {this.state.isModal && (
//           <Modale
//             image={this.state.currentImage}
//             closeModal={this.closeModal}
//             openModal={this.openModal}
//           />
//         )}
//       </>
//     );
//   }
// }
