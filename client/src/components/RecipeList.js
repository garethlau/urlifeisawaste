import React from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const RecipeList = (props) => {
    console.log("P.R", props.recipes)

    const renderIngredients = (ingredients) => {
        console.log("in render ingredients", ingredients);
        return ingredients.map(ingredient => {
            console.log(ingredient);
            return (
                <ListGroupItem>{ingredient.name}</ListGroupItem>
            )
        })
    }

    const addFavourite = (recipe) => {
        let data = {
            name: recipe.title,
            ingredients: recipe.usedIngredients.map(ingredient => ingredient.name),
            time: "30",
            imageSrc: recipe.image
        }
        console.log("adding", data);
        axios.post("http://localhost:5000/api/saveFavourite", data).then((response) => {
            console.log("added", data.name);
        })
        
    }

    const renderCards = () => {
        return props.recipes.map(recipe => {
            console.log(recipe);
            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img style={{height: "300px", objectFit: "cover"}} variant="top" src={recipe.image} />
                    <Card.Body style={{color: "black"}}>
                        <Card.Title>{recipe.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush" style={{color: "black"}}>
                        {renderIngredients(recipe.usedIngredients)}
                    </ListGroup>
                    <Card.Body>
                        <Card.Link onClick={() => {addFavourite(recipe)}} href="#">Add to Favourite</Card.Link>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
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
                {renderCards()}
            </CardColumns>
        </div>

    )
    
}
export default RecipeList;