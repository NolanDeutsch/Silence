import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as chatApi from "../../../../../api/chat";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/slices/user";
import Button from "../../../../common/Button";

const NewPost = ({ open, groupId, onClose, onSuccess }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);
  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await chatApi.addPost(text, [], user.id, user.name, groupId);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Write a something" as="textarea" rows={3} onChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!text} onClick={handleSubmit} loading={loading}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPost;