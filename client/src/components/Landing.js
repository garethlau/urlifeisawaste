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
                <h1>Food</h1>
                <p>
                    Have a handful of ingredients but not sure what to make? Don't worry, save time and try
                    something new by uploading an image and getting recipes!
                </p>
                <p>
                    <Link to="/upld">
                        <Button variant="primary">Start</Button>
                    </Link>
                </p>
            </Jumbotron>
        </div>
    )
}

export default Landing;