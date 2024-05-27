import React, { useState, useEffect, useRef } from "react";
import categoryService from "../services/categoryService";
import { useGetContent } from "../hooks/useGetContent";
import contentService from "../services/contentService";

function AddContentForm() {
  const { topic } = useGetContent();
  const [category, setCategory] = useState([]);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const modalRef = useRef(null);

  const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  const handleTopicSelectChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    setIsValid(validateUrl(newUrl));
  };

  const handleSelectChange = async (event) => {
    try {
      const query = { name: event.target.value };
      const response = await categoryService.list(query);
      if (Boolean(response)) {
        setType(query.name);
        setCategory(response);
        setShowAdditionalContent(true);
      } else {
        setShowAdditionalContent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateUrl = (url) => {
    if (category.name === "video") {
      return youtubeRegex.test(url);
    } else if (category.name === "image") {
      return imageRegex.test(url);
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      console.log("Valid URL:", url);
    }
    try {
      const formData = {
        title,
        type,
        topic: selectedTopic,
        category: category.name,
        url,
      };

      const response = await contentService.add(formData);
      alert(`Content ${response.title} created successfully!`);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setCategory([]);
    setShowAdditionalContent(false);
    setUrl("");
    setIsValid(true);
    setSelectedTopic("");
    setTitle("");
    setType("");
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", resetForm);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", resetForm);
      }
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Content
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <label htmlFor="typeLabel">Type:</label>
                <select
                  className="form-select"
                  onChange={handleSelectChange}
                  defaultValue=""
                >
                  <option value="">Open this select menu</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                </select>
              </div>
              {showAdditionalContent && (
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="2"
                    value={category.name || ""}
                    placeholder="Category"
                    disabled
                  />
                  {(category.name === "video" || category.name === "image") && (
                    <div>
                      <label>
                        {category.name === "video" ? "YouTube" : "Image"} URL:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="3"
                        value={url}
                        onChange={handleChange}
                        placeholder={`${
                          category.name === "video" ? "YouTube" : "Image"
                        } URL`}
                      />
                      {!isValid && (
                        <small className="text-danger">
                          Please enter a valid{" "}
                          {category.name === "video" ? "YouTube" : "Image"} URL.
                        </small>
                      )}
                    </div>
                  )}
                  <div>
                    <label htmlFor="topicSelect">Topics:</label>
                    <select
                      id="topicSelect"
                      className="form-select"
                      value={selectedTopic}
                      onChange={handleTopicSelectChange}
                    >
                      <option value="">Select a Topic</option>
                      {topic &&
                        topic.length > 0 &&
                        topic.map((t) => (
                          <option key={t._id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddContentForm;
