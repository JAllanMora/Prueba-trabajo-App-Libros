import React from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import { mutate } from 'swr'


type ModalFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

}

export function ModalForm({ open, setOpen }: ModalFormProps) {
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      name: e.target?.name?.value,
      review: e.target?.review?.value,
      author: e.target?.author?.value
    };
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      await mutate('/api/books')
      setOpen(false);
    } catch (e) {
      alert("There has been an Error");
    }

  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Create a new book</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Fill the information</Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input required label={"Name"} name={"name"} placeholder="Name" />
            <Form.Input required label={"Author"} name={"author"} placeholder="Author" />
            <Form.Input required label={"Review"} name={"review"} placeholder="Review" />
            <Button
              type="submit"
              content="Save"
              labelPosition="right"
              icon="checkmark"
              positive
            />
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

