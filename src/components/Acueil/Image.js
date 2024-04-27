import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSlides } from '../../Redux/Slice/SlidesSlice';

const Image = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetSlides());
    }, [dispatch]);

    const { Slide } = useSelector((state) => state.slide); // Assuming Slide is the correct slice name and it's an array

    return (
        <div>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {Slide.map((slide, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.id}>
                            <img className="d-block w-100" src={`http://localhost:8000/${slide.photo}`} alt={`Slide ${index + 1}`} />
                            {/* <div className="carousel-caption">
                                <h5>{slide.caption}</h5>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Image;
