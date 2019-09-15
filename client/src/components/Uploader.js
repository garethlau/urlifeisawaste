import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import RecipeList from './RecipeList';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const Uploader = (props) => {

    const [fileAdded, setFileAdded] = useState(false);
    const [base64Data, setBase64Data] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [gotRecipes, setGotRecipes] = useState(false);

    const onDrop = useCallback(droppedFiles => {
        // ondrop
        console.log("AF", droppedFiles);
        if (droppedFiles.length > 1) {  // check for multiple images
            console.log("1 only pls");
        }
        else {


            let reader = new FileReader();
            // convert image to base64
            reader.readAsDataURL(droppedFiles[0]);
            reader.onloadend = () => {
                let data = reader.result;
                console.log(data);

                setBase64Data(data);
                setFileAdded(true);
                document.getElementById('img').setAttribute('src', data);
            }
        }
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const uploadFile = () => {
        
        console.log("Base64Data is", base64Data);
        axios.post("http://localhost:5000/getFruits", {
            base64Data: base64Data
        }).then(response => {
            // we have the recipes here
            console.log("respones from uploadFIle is", response.data.data);
            setRecipes(response.data.data);
            setGotRecipes(true);
        })

    };

    const removeFile = () => {
        console.log("remove file");
        setBase64Data(null);
        setFileAdded(false);
    }

    return (
        <div>
            {
                gotRecipes 
                ? <div> <RecipeList recipes={recipes}/> </div>
                : 
                <div> 
                    <div style={{
                        width: "100vw", 
                        height: "100vh", 
                        backgroundColor: "#282c34",
                        color: "white",
                        textAlign: "center",
                    }}>
                    {
                        fileAdded ? 
                            <Container>
                                <Image style={{width: "100%"}} id="img" src="" rounded/>
                            </Container>
                            :
                            <div>
                                <div style={{padding: "30px"}}>
                                    <div style={{
                                        outline: "dashed 1px white",
                                        padding: "20% 0px 20% 0px",
                                        margin: "0% auto 0% auto",
                                        width: "80%"
                                    }} {...getRootProps()}>
                                        <input {...getInputProps()}/> 
                                        {
                                            isDragActive ? <p>Drop image here</p> : <p>Drag and drop image here</p>
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        fileAdded ?
                            <div style={{}}>
                                <div style={{
                                    width: "max-content",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "10px"
                                }}> 
                                    <ButtonToolbar>
                                        <div style={{marginRight: "25px"}}>
                                            <Button size="lg" variant="success" onClick={() => uploadFile()}>&#10004;</Button>
                                        </div>
                                        <Button size="lg" variant="danger" onClick={() => removeFile()}>&#10060;</Button>
                                    </ButtonToolbar>
                            </div>
                            </div>
                            :
                            <p></p>
                    }    
                    </div>
                </div>
            }
        </div>
    )
}

export default Uploader;