import { useState } from "react";
import PanMenuWrapper from "../../rcl/v1.0/Menu/PanMenuWrapper";
import { Button, MenuItem, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { PanMenuItem } from "../../rcl/v1.0/Menu/PanMenuWrapperComponents/PanMenuItem";
export default function PanMenuWrapperDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };
  let test = "test";
  return (
    <>
      <Button onClick={handleOpen}>Open Menu</Button>
      <PanMenuWrapper anchorEl={anchorEl} setIsOpen={setIsOpen} isOpen={isOpen}>
        <PanMenuItem icon={<StarIcon />} label={test} />
        <PanMenuItem icon={<StarIcon />} label={test} />
        <PanMenuItem icon={<StarIcon />} label={test} />
        <PanMenuItem icon={<StarIcon />} label={test} />
      </PanMenuWrapper>
    </>
  );
}
