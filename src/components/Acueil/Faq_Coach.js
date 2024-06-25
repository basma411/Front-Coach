import React, { useEffect } from 'react';
import image from '../../images/big_image_2.jpg';
import Footer from '../coach/Footer';
import Newsletter from '../coach/Newsletter';
import { getFaq } from '../../Redux/Slice/FaqSlice';
import { useDispatch, useSelector } from 'react-redux';

const Faq_Coach = () => {
    const { Faqs } = useSelector((state) => state.faq);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getFaq());
    }, [dispatch]);

    return (
        <>
            <div
                className="ImagePlatforme"
                style={{
                    position: "relative",
                    textAlign: "center",
                    height: "300px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                <h2 style={{ fontSize: '60px', fontWeight: '300' }}>FAQ</h2>
            </div>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                {Faqs && 
                    Faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            style={{
                                marginBottom: '20px',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{faq.question}</h3>
                            <p>{faq.rreponse}</p>
                        </div>
                    ))
            }
            </div>
            <Newsletter />
            <Footer />
        </>
    );
};

export default Faq_Coach;
