import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { GetSlides } from '../../Redux/Slice/SlidesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './css/slide.css'; 

const Slide = () => {
    const dispatch = useDispatch();
    const { Slide } = useSelector((state) => state.slide);
  
    useEffect(() => {
      dispatch(GetSlides());
    }, [dispatch]);
  
 
  
  return (
    <Carousel>
    {Slide.map((slide, index) => (
      <Carousel.Item key={slide.id} >
        <img
          className="d-block w-700"
          src={`http://localhost:8000/${slide.photo}`}
          alt={`Slide ${index + 1}`}
        />
        <Carousel.Caption>
          <h3 className="slide-title">{slide.titre1}</h3> 
          
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>  
  )
}

export default Slide