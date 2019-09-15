import React from 'react';

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
                        <Card.Link href="#">Full Ingredient List</Card.Link>
                        <Card.Link href="#">View More</Card.Link>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <CardColumns>
            {renderCards()}
        </CardColumns>

    )
    
}
export default RecipeList;