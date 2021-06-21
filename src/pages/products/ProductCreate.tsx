import React, { SyntheticEvent, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post(`products`, {
      title,
      description,
      image,
      price,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/products"} />;
  }

  return (
    <Wrapper>
      <main>
        <div className="row g-5 p-4">
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3 mt-3">Create new product</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Image
                  </label>
                  <div className="input-group mb-3">
                    <input
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                      type="text"
                      className="form-control"
                      required
                    />
                    <ImageUpload uploaded={setImage} />
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Price
                  </label>
                  <input
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-2 pt-4">
                  <button
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default ProductCreate;
