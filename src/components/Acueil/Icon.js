import React, { useEffect, useState } from "react";
import { GetIcon } from "../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import "./css/icon.css";
import { getImageUrl } from "../..";

const Icon = () => {
  const dispatch = useDispatch();
  const { Icon } = useSelector((state) => state.icon);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    dispatch(GetIcon());
  }, [dispatch]);

  const handleOpenDialog = (icon) => {
    setSelectedIcon(icon);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  return (
    <div className="Icon">
      <div className="grid-container">
        {Icon &&
          Icon.map((icon, index) => (
            <div key={index} className="grid-item">
              <div className="subgrid-item">
                <img
                  src={getImageUrl(icon.image)}
                  alt={`icon ${index + 1}`}
                  className="ImgIcon"
                />
                <h3 className="IconTitle">{truncateText(icon.Titre)}</h3>
                <p className="IconDescrip">{truncateText(icon.Texte, 170)}</p>
              </div>
              <h3 onClick={() => handleOpenDialog(icon)} className="Affichersuit">
                Afficher la suite... &#8594;
              </h3>
            </div>
          ))}
        <Dialog open={openDialog} onClose={handleCloseDialog}

        >
          <div style={{ textAlign: "center" }}>
            <img
              src={
                selectedIcon && getImageUrl(selectedIcon.image)}
              alt={selectedIcon && selectedIcon.Titre}
              style={{ width: "60px", textAlign: "center",marginTop:"20px" }}
            />
          </div>
          <DialogTitle
            style={{ textAlign: "left", fontSize: "30px", fontWeight: "400" }}
          >
            {selectedIcon && truncateText(selectedIcon.Titre)}
          </DialogTitle>
          <DialogTitle
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "400",
              color: "gray",
            }}
          >
            {selectedIcon && (
              <div dangerouslySetInnerHTML={{ __html: selectedIcon.Texte }} />
            )}
          </DialogTitle>
        </Dialog>
      </div>
    </div>
  );
};

export default Icon;
