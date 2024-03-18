'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import QACard from '../../globalComponent/qaCard';
import '../../globalStyle.css';



const Page = () => {
    const [Faq, setFaq] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/faq');
                const data = await response.json();
                console.log(data);
                setFaq(data.Faqs || []); 
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
      
     <div className="containerStyle">
       <div className="row">
       <div className="col-md-6">
         <Typography variant="h4" component="h1" gutterBottom>
                Q&A List
            </Typography>
         </div>
         <div className="col-md-6">
         <Button variant="contained" href={'/faq/addFaq'}>
                Add Q&A
            </Button>
         </div>
       </div>
            <div className="row">

            {Faq.map((qa, index) => (
                    <div className="col-md-4">
                    <QACard key={index} question={qa.question} answer={qa.answer} />

                    </div>
            ))}
                            </div>

     </div>
      

    );
};

export default Page;
