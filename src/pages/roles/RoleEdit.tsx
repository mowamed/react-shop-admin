import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Permission } from "../../models/Permission";

const RoleEdit = (props: any) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`permissions`);
      setPermissions(response.data);

      const { data } = await axios.get(`roles/${props.match.params.id}`);
      setName(data.name);
      setSelected(data.permission.map((p: Permission) => p.id));
    })();
  }, [props.match.params.id]);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((p) => p !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`roles/${props.match.params.id}`, {
      name,
      permissions: selected.map(String),
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/roles"} />;
  }

  return (
    <Wrapper>
      <main>
        <div className="row g-5 p-4">
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3 mt-3">Update permission</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    defaultValue={name}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12 row pt-4">
                  {permissions.map((p: Permission) => {
                    return (
                      <div key={p.id} className="form-check col-3">
                        <input
                          onChange={() => check(p.id)}
                          className="form-check-input"
                          type="checkbox"
                          checked={selected.some((s) => s === p.id)}
                          value={p.id}
                          id={`flexCheckDefault${p.id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexCheckDefault${p.id}`}
                        >
                          {p.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-2 pt-4">
                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default RoleEdit;
