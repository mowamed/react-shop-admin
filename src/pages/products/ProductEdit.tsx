import React, { SyntheticEvent, useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products/${props.match.params.id}`);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
  }, [props.match.params.id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`products/${props.match.params.id}`, {
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
            <h4 className="mb-3 mt-3">Edit product</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
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
                    defaultValue={description}
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
                      defaultValue={image}
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
                    value={price}
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
                    Save
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

export default ProductEdit;
