import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Landing = (props) => {

    const redirect = () => {
        console.log('redirect');
    }

    return (
        <div>
            <Jumbotron>
                <h1>Eliminate Food Waste.</h1>
                <p>
                    We can help you eliminate food waste in one simple step. Upload a photo of the ingredients inside your fridge and we'll find you the recipes. It's that simple.
                </p>
                <p>
                    <Link to="/upld">
                        <Button style={{marginRight: "10px"}} variant="primary">Upload Photo</Button>
                    </Link>
                    <Link to="/fav">
                    <Button variant="success">Favourite Recipes</Button> 
                    </Link>
                </p>
            </Jumbotron>
        </div>
    )
}

export default Landing;