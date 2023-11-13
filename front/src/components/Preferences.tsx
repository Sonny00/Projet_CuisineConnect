import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState } from "react";

const PreferencesModal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState("");

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Préférences alimentaires</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Préférences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
