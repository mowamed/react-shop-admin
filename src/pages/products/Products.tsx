import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../../models/Product";
import Paginator from "../../components/Paginator";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-4 pb-4">
        <Link to="/products/create" type="button" className="btn btn-secondary">
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="product thumbnail"
                      width="50"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`/products/${product.id}/edit`}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => del(product.id)}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
      </div>
    </Wrapper>
  );
};

export default Products;
