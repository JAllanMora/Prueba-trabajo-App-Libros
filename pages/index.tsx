import React, { useState } from "react";
import { Grid, Container, Button, Icon } from "semantic-ui-react";
import { BookCard } from "@/components/Card/BookCard";
import { query } from "@/lib/db";
import { ModalForm } from "@/components/ModalForm/ModalForm";
import { useBooks } from "@/lib/swrHooks";

export const getServerSideProps = async () => {

  const books = await query(`
      SELECT *
      FROM books
      ORDER BY id DESC
  `);

  return {
    props: {
      booksServer: JSON.parse(JSON.stringify(books))
    }
  };
};

const Index = ({  booksServer }) => {
  const { books, isLoading, isError } = useBooks({ fallbackData: booksServer });
  const [openModal, setOpenModal] = useState(false);
  if (isLoading) return <div>Loading... <Icon loading name="spinner" /></div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <Button primary onClick={() => setOpenModal(true)}>Add a new book</Button>
      <ModalForm open={openModal} setOpen={setOpenModal} />
      {books && (
        <Container text>
          <Grid stackable columns={3}>
            {books?.map(({ id, name, review, author }) => {
              return (
                <Grid.Column key={id}>
                  <BookCard
                    {...{ id, name, review, author }}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Index;
