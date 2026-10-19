import { useState } from "react";
import PanMenuWrapper from "../../rcl/v1.0/Menu/PanMenuWrapper";
import {
  Button,
  ListItemText,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import Check from "@mui/icons-material/Check";

export default function PanMenuWrapperDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const [selected, setSelected] = useState("name");
  const [checked, setChecked] = useState({ "Show toolbar": true });

  const options = ["Name", "Date modified", "Size"];
  const options2 = ["Show toolbar", "Show sidebar", "Show status bar"];

  const handleToggle = (option) => () => {
    setChecked((prev) => ({ ...prev, [option]: !prev[option] }));
  };
  let test = "test";
  return (
    <>
      <Button onClick={handleOpen}>Open Menu</Button>
      <PanMenuWrapper anchorEl={anchorEl} setIsOpen={setIsOpen} isOpen={isOpen}>
        <MenuItem>
          <ListItemIcon>{<StarIcon />}</ListItemIcon>
          <ListItemText>{test}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{<StarIcon />}</ListItemIcon>
          <ListItemText>{test}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{<StarIcon />}</ListItemIcon>
          <ListItemText>{test}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{<StarIcon />}</ListItemIcon>
          <ListItemText>{test}</ListItemText>
        </MenuItem>
        <Divider />
        {options.map((option) => (
          <MenuItem
            key={option}
            role="menuitemradio"
            selected={selected === option}
            onClick={() => setSelected(option)}
          >
            <ListItemIcon>
              {selected === option ? (
                <RadioButtonChecked fontSize="small" />
              ) : (
                <RadioButtonUnchecked fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        {options2.map((option) => (
          <MenuItem
            key={option}
            role="menuitemcheckbox"
            selected={Boolean(checked[option])}
            onClick={handleToggle(option)}
          >
            <ListItemIcon>
              {checked[option] ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText>{option}</ListItemText>
          </MenuItem>
        ))}
      </PanMenuWrapper>
    </>
  );
}
