import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [addColor, setAddColor] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };
  const newColor = () => {
    setAddColor(true);
  };

  const saveEdit = (id) => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        console.log("successful update", res);
      })
      .catch((er) => {
        console.log(er);
      });
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        updateColors(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
    setEditing(false);
  };

  const saveAdd = (color) => {
    axiosWithAuth()
      .post("/api/colors", color)
      .then((res) => {
        console.log("successfully added color", res);
        updateColors(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
    setAddColor(false);
  };

  const deleteColor = (colorID) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${colorID}`)
      .then((res) => {
        console.log("successful deletion", res);
      })
      .catch((er) => {
        console.log(er);
      });
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        updateColors(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
        <p onClick={newColor}>➕Add🎨</p>
      </ul>
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            saveEdit(colorToEdit.id);
          }}
        >
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {addColor && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            saveAdd(colorToAdd);
          }}
        >
          <legend>Add a Color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value },
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAddColor(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
