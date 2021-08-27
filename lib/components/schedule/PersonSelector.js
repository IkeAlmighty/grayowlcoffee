import { useState, useEffect } from "react";
import styles from "./PersonSelector.module.css";

export default function PersonSelector() {
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [shiftEditTypeSelector, showShiftEditTypeSelector] = useState(false);
  const [badShiftEditor, showBadShiftEditor] = useState(false);
  const [goodShiftEitor, showGoodShiftEditor] = useState(false);

  const [roles, setRoles] = useState(["B", "C", "O"]);
  const [selectedRoles, setSelectedRoles] = useState([]);

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
    //add the person if it is not already in the selected list
    if (!selectedPeople.find((p) => p === person)) {
      setSelectedPeople([person, ...selectedPeople]);
      e.target.className = styles.selected; //update visually

      //show the widget for selecting the edit type:
      showShiftEditTypeSelector(true);
    } else {
      // if the person is selected, deselect it
      setSelectedPeople(selectedPeople.filter((p) => p !== person));

      e.target.className = styles.unselected; // update visual to show unselected
    }
  }

  function toggleRoleSelected(e, role) {
    //add the if role it is not already in the selected list
    if (!selectedRoles.find((r) => r === role)) {
      setSelectedRoles([role, ...selectedRoles]);
      e.target.className = styles.selected; //update visually
    } else {
      // if the role is selected, deselect it
      setSelectedRoles(selectedRoles.filter((r) => r !== role));

      e.target.className = styles.unselected; // update visual to show unselected
    }
  }

  function toggleDateSelected(e, date) {
    // this function both animates selecting a date and also
    // updates the availability  (locally) of each person as dates
    // are selected, so that all availabilities can be sent to the
    // backend and saved.
    // toggle animate:

    e.target.className =
      e.target.className == styles.unselected
        ? styles.selected
        : styles.unselected;
  }

  function getNextMonthDates() {
    // get the current month
    let thisMonth = new Date().getMonth();
    let year = new Date().getFullYear();

    const getNextMonthIndex = (m) => (m > 11 ? 0 : m + 1);

    // set the next month based on the current month:
    let nextMonth = getNextMonthIndex(thisMonth);
    if (nextMonth === 0) year = year + 1;

    // get the length of the next month:
    let start = new Date(year, nextMonth, 1);
    let nextNextMonth = getNextMonthIndex(nextMonth);
    let end = new Date(nextNextMonth === 0 ? year + 1 : year, nextNextMonth, 0);

    let lengthOfMonth = end.getDate() - start.getDate() + 1;

    // iterate through the dates of the next month, and return them in an array:
    let allDates = [];
    for (let i = 1; i <= lengthOfMonth; i++) {
      allDates.push(new Date(year, nextMonth, i));
    }
    return allDates;
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
          <form
            onSubmit={(e) => {
              e.preventDefault;
            }}
          >
            <input
              type="button"
              value="Add BAD shift(s)"
              onClick={() => showBadShiftEditor(true)}
            />
            <input
              type="button"
              value="Add GOOD shift(s)"
              onClick={() => showGoodShiftEditor(true)}
            />
            <input type="text" placeholder="set preferred hours" />
          </form>
        </div>
      )}

      {badShiftEditor && (
        <div>
          <form>
            {roles.map((role) => (
              <input
                type="text"
                key={role}
                className={styles.unselected}
                value={role}
                onClick={(e) => {
                  toggleRoleSelected(e, role);
                }}
                readOnly
              />
            ))}
          </form>
          <form className={styles.calendarForm}>
            {getNextMonthDates().map((date) => (
              <input
                key={date.getDate()}
                type="text"
                className={`${styles.unselected} ${styles.calendarDate}`}
                onClick={(e) => {
                  toggleDateSelected(e, date);
                }}
                value={date.toDateString()}
                readOnly
              />
            ))}
          </form>
        </div>
      )}
    </div>
  );
}
