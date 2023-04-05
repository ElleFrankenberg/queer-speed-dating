import { useRef, useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import FormInputMessage from "../ui/messages/FormInputMessage";
import styles from "@/styles/inputs/ParticipantRegistration.module.css";

const ParticipantForm = () => {
  const [firstNameIsInvalid, setfirstNameIsInvalid] = useState(false);
  const [lastNameIsInvalid, setlastNameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [numberIsInvalid, setNumberIsInvalid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (isInvalid) {
      const timer = setTimeout(() => {
        resetStates();
        setIsInvalid(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isInvalid]);

  const formRef = useRef();
  const honeyPotRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const numberInputRef = useRef();

  const resetStates = () => {
    setfirstNameIsInvalid(false);
    setlastNameIsInvalid(false);
    setEmailIsInvalid(false);
    setNumberIsInvalid(false);
  };

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredHoneyPotValue = honeyPotRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value.toLowerCase();
    const enteredLastName = lastNameInputRef.current.value.toLowerCase();
    const enteredEmail = emailInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;

    if (enteredHoneyPotValue) {
      return;
    }
    if (
      !enteredFirstName ||
      containsOnlyLetters(enteredFirstName) === false ||
      enteredFirstName.trim() === ""
    ) {
      setIsInvalid(true);
      setfirstNameIsInvalid(true);
      return;
    }
    if (
      !enteredLastName ||
      containsOnlyLetters(enteredLastName) === false ||
      enteredLastName.trim() === ""
    ) {
      setIsInvalid(true);
      setlastNameIsInvalid(true);
      return;
    }
    if (
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      enteredEmail.trim() === ""
    ) {
      setIsInvalid(true);
      setEmailIsInvalid(true);
      return;
    }
    if (
      !enteredNumber ||
      phoneNumberIsCorrect(enteredNumber) === false ||
      enteredNumber.trim() === ""
    ) {
      setIsInvalid(true);
      setNumberIsInvalid(true);
      return;
    }

    const participantData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      number: enteredNumber,
    };

    fetch("/api/participants", {
      method: "POST",
      body: JSON.stringify(participantData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        formRef.current.reset();
      });
  };

  return (
    <form className={styles.form} onSubmit={registrationHandler} ref={formRef}>
      <div className={styles.row}>
        <div className={styles.control}>
          <input className={styles.honeyPot} type="text" ref={honeyPotRef} />
          <Input
            id="first-name"
            type="text"
            text="First name"
            ref={firstNameInputRef}
          />
        </div>
        <div className={styles.control}>
          <Input
            id="last-name"
            type="text"
            text="Last name"
            ref={lastNameInputRef}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.control}>
          <Input id="email" type="email" text="Email" ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <Input
            id="number"
            type="text"
            text="Phone number"
            ref={numberInputRef}
          />
        </div>
      </div>
      <div className={styles.controlBtn}>
        <Button>
          <span>Register</span>
        </Button>
        {isInvalid && firstNameIsInvalid && (
          <FormInputMessage text="First name is invalid " />
        )}
        {isInvalid && lastNameIsInvalid && (
          <FormInputMessage text="Last name is invalid" />
        )}
        {isInvalid && emailIsInvalid && (
          <FormInputMessage text="Email is invalid" />
        )}
        {isInvalid && numberIsInvalid && (
          <FormInputMessage text="Number is invalid" />
        )}
      </div>
    </form>
  );
};

export default ParticipantForm;
