import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { GetSlides } from '../../Redux/Slice/SlidesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './css/slide.css'; 
import { getImageUrl } from '../..';

const Slide = () => {
    const dispatch = useDispatch();
    const { Slide } = useSelector((state) => state.slide);
  
    useEffect(() => {
      dispatch(GetSlides());
    }, [dispatch]);
  
    const truncateText = (htmlText, maxLength) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const textContent = doc.body.textContent || "";
      return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
    };
  
  
  return (
    <Carousel>
    {Slide && Slide.map((slide, index) => (
      <Carousel.Item key={index} >
        <img
          className="d-block w-700"
          src={getImageUrl(slide.photo)}
          alt={`Slide ${index + 1}`}
        />
        <Carousel.Caption>
          <h3 className="slide-title">           {truncateText(slide.titre1)}
          </h3> 
          
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>  
  )
}

export default Slide