import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import PanDialog from "./PanDialog";
import PanDialogActions from "./PanDialogActions";

const filter = createFilterOptions();

const actionFn = () => console.log("Doing it!!!");

export default function PanFilteredMenu({ data }) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const options = Object.entries(data).map(([key, value]) => ({
    key,
    en: value.en,
  }));

  const handleClose = () => {
    setValue({
      key: dialogValue.key,
      en: dialogValue.en,
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    key: '',
    en: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <>
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                en: newValue,
                key: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              en: newValue.inputValue,
              key: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.title;
          }
          return `${option.en || ''} (${option.key})`;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        sx={{ width: 300 }}
        //freeSolo
        renderInput={(params) => <TextField {...params} label="Language" />}
      />
      <PanDialog
        titleLabel="Add Language"
        isOpen={!!open}
        closeFn={() => handleClose()}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Add your custom language
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.en}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  en: event.target.value,
                })
              }
              label="Language Name"
              type="text"
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.key}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  key: event.target.value,
                })
              }
              label="Language Code"
              type="text"
              variant="outlined"
            />
          </DialogContent>
          <PanDialogActions
            actionFn={handleClose}
            actionLabel="Add"
            closeFn={() => toggleOpen(false)}
            closeLabel="Cancel"
            closeOnAction={false}
          />
        </form>
      </PanDialog>
    </>
  );
}

