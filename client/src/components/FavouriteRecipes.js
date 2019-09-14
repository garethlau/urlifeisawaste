import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const FavouriteRecipes = (props) => {

    const [recipes, setRecipes] = useState([]);
    const [gotData, setGotData] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getFavourites").then(res => {
            console.log(res.data.data.recipe);
            setRecipes(res.data.data.recipe);
        })
    })

    const renderyy = () => {
    }

    const renderRecipeList = () => {
        if (recipes != null) {
            recipes.map(recipe => {
                return (
                    <Card className="bg-dark text-white">
                        <Card.Img src="holder.js/100px270" alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            <Card.Text>Last updated 3 mins ago</Card.Text>
                        </Card.ImgOverlay>
                  </Card>
                )
            })
        }
        else {
            return (
                <div>
                    hi
                </div>
            )
        }
        
    }

    return (
        <>
            <div
            style={{
                width: "100vw", 
                height: "100vh", 
                backgroundColor: "#282c34",
                color: "white",
                textAlign: "center",
                paddingTop: "5%"
            }}>
                {renderRecipeList()}
            </div>
        </>
    )
}

export default FavouriteRecipes;