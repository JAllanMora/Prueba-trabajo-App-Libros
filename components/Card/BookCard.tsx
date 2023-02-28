import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { mutate } from "swr";


type BookCardProps = {
  id: number;
  name: string;
  author: string;
  review: string;

}
export const BookCard = ({ name, review, author, id }: BookCardProps) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/books`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      await mutate('/api/books')
      alert("Book deleted successfully");
    } catch (e) {
      alert("There has been an Error");
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}
          <Icon link name="delete" onClick={handleDelete} />
        </Card.Header>
        <Card.Meta>
          <span className="date">{author}</span>
        </Card.Meta>
        <Card.Description>{review}</Card.Description>
      </Card.Content>
    </Card>
  );
};
