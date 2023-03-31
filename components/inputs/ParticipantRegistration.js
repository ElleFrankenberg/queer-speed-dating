import { useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import InvalidInputMessage from "../ui/error/InvalidInputMessage";
import styles from "@/styles/inputs/ParticipantRegistration.module.css";
import inputStyles from "@/styles/ui/error/InvalidInputMessage.module.css";

const ParticipantRegistration = () => {
  const [firstNameIsInvalid, setfirstNameIsInvalid] = useState(false);
  const [lastNameIsInvalid, setlastNameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [numberIsInvalid, setNumberIsInvalid] = useState(false);

  const honeyPotRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const numberInputRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredHoneyPotValue = honeyPotRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value.toLowerCase();
    const enteredLastName = lastNameInputRef.current.value.toLowerCase();
    const enteredEmail = emailInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;

    const letterRegex = /^[A-Za-z]+$/;
    const numberRegex =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    if (enteredHoneyPotValue) {
      return;
    }
    if (
      !enteredFirstName ||
      !letterRegex.test(enteredFirstName) ||
      enteredFirstName.trim() === ""
    ) {
      setfirstNameIsInvalid(true);
      return;
    }
    if (
      !enteredLastName ||
      !letterRegex.test(enteredLastName) ||
      enteredLastName.trim() === ""
    ) {
      setlastNameIsInvalid(true);
      return;
    }
    if (
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      enteredEmail.trim() === ""
    ) {
      setEmailIsInvalid(true);
      return;
    }
    if (
      !enteredNumber ||
      !numberRegex.test(enteredNumber) ||
      enteredNumber.trim() === ""
    ) {
      setNumberIsInvalid(true);
      return;
    }

    const participantData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      number: enteredNumber,
    };

    fetch("/api/participantRegister", {
      method: "POST",
      body: JSON.stringify(participantData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <form className={styles.form} onSubmit={registrationHandler}>
      <div className={styles.row}>
        <div className={styles.control}>
          <input className={styles.honeyPot} type="text" ref={honeyPotRef} />
          <Input
            id="first-name"
            type="text"
            text="First name"
            ref={firstNameInputRef}
          />
          <InvalidInputMessage
            text="Invalid Input"
            className={
              !firstNameIsInvalid
                ? inputStyles.invalidText
                : inputStyles.invalidTextShow
            }
          />
        </div>
        <div className={styles.control}>
          <Input
            id="last-name"
            type="text"
            text="Last name"
            ref={lastNameInputRef}
          />
          <InvalidInputMessage
            text="Invalid Input"
            className={
              !lastNameIsInvalid
                ? inputStyles.invalidText
                : inputStyles.invalidTextShow
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.control}>
          <Input id="email" type="email" text="Email" ref={emailInputRef} />
          <InvalidInputMessage
            text="Email is invalid"
            className={
              !emailIsInvalid
                ? inputStyles.invalidText
                : inputStyles.invalidTextShow
            }
          />
        </div>
        <div className={styles.control}>
          <Input
            id="number"
            type="text"
            text="Phone number"
            ref={numberInputRef}
          />
          <InvalidInputMessage
            text="Number is invalid"
            className={
              !numberIsInvalid
                ? inputStyles.invalidText
                : inputStyles.invalidTextShow
            }
          />
        </div>
      </div>
      <div className={styles.controlBtn}>
        <Button>
          <span>Register</span>
        </Button>
      </div>
    </form>
  );
};

export default ParticipantRegistration;
