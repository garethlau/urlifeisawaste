import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import CardGroup from 'react-bootstrap/CardGroup';
import CardColumns from 'react-bootstrap/CardColumns';

const FavouriteRecipes = (props) => {

    const [recipes, setRecipes] = useState([]);
    const [gotData, setGotData] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getFavourites").then(res => {
            console.log(res.data.data.recipe);
            setRecipes(res.data.data.recipe);
        })
    }, []);

    const renderIngredients = (ingredients) => {
        if (ingredients.length > 3) {
            ingredients = ingredients.splice(0, 3);
        }
        console.log(ingredients);
        return ingredients.map(ingredient => {
            console.log(ingredient);
            return (
                <ListGroupItem>{ingredient}</ListGroupItem>
            )
        })
    }

    const renderRecipeList = () => {
        if (recipes != null) {

            return (Object.keys(recipes).map(recipeId => {
                console.log(recipes[recipeId]);
                let recipeData = recipes[recipeId];
                console.log(recipeData);
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img style={{height: "300px", objectFit: "cover"}} variant="top" src={recipeData.imageSrc} />
                        <Card.Body style={{color: "black"}}>
                            <Card.Title>{recipeData.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush" style={{color: "black"}}>
                            {renderIngredients(recipeData.ingredients)}
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Full Ingredient List</Card.Link>
                            <Card.Link href="#">Remove</Card.Link>
                        </Card.Body>
                    </Card>
                )
            }))
        }
    }

    return (
        <>
            <div
            style={{
                width: "100vw", 
                height: "100%", 
                backgroundColor: "#282c34",
                color: "white",
                textAlign: "center",
                paddingTop: "5%"
            }}>
                <CardColumns>
                    {renderRecipeList()}
                </CardColumns>
            </div>
        </>
    )
}

export default FavouriteRecipes;