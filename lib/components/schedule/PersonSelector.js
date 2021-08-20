import { useState, useEffect } from "react";
import styles from "./PersonSelector.module.css";

export default function PersonSelector() {
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [shiftEditTypeSelector, showShiftEditTypeSelector] = useState(false);

  useEffect(() => {
    if (selectedPeople.length === 0) {
      showShiftEditTypeSelector(false);
    }
  }, [selectedPeople]);

  function addPerson(e) {
    e.preventDefault();

    let newNameField = document.getElementById("newNameField");

    // return if the name is already added.
    if (people.find((value) => value === newNameField.value)) return;

    //return if newNameField is empty:
    if (newNameField.value.trim() == "") return;

    setPeople([newNameField.value, ...people]);
    newNameField.value = "";
  }

  function removePerson(person) {
    // remove the person from the people list and the selected people list
    setPeople([...people].filter((name) => name !== person));
    setSelectedPeople([...selectedPeople].filter((name) => name !== person));
  }
  function togglePersonSelected(e, person) {
    if (!selectedPeople.find((p) => p === person)) {
      setSelectedPeople([person, ...selectedPeople]);
      e.target.className = styles.selected;

      //show the widget for selecting the edit type:
      showShiftEditTypeSelector(true);
    } else {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));

      e.target.className = styles.unselected;
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={addPerson}>
          <input
            type="text"
            placeholder="type a new name here..."
            id="newNameField"
          />
          <input type="submit" value="+" />
        </form>

        <form onSubmit={(e) => e.preventDefault()}>
          {people.map((p) => (
            <div key={p}>
              <input
                className={styles.unselected}
                onClick={(e) => togglePersonSelected(e, p)}
                type="text"
                value={p}
                readOnly
              />
              <input
                type="button"
                value="-"
                onClick={() => {
                  removePerson(p);
                }}
                readOnly
              />
            </div>
          ))}
        </form>
      </div>

      {shiftEditTypeSelector && (
        <div>
          {selectedPeople.map((person) => (
            <span key={person}>&nbsp;{person}&nbsp;</span>
          ))}
          <form onSubmit={() => {}}>
            <input type="button" value="Add BAD shift(s)" />
            <input type="button" value="Add GOOD shift(s)" />
            <input type="text" placeholder="set preferred hours" />
          </form>
        </div>
      )}
    </div>
  );
}
