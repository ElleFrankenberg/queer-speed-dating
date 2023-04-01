import { useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import FormInputMessage from "../ui/messages/FormInputMessage";
import styles from "@/styles/inputs/ParticipantRegistration.module.css";
import inputStyles from "@/styles/ui/messages/FormInputMessage.module.css";

const ParticipantForm = () => {
  const [firstNameIsInvalid, setfirstNameIsInvalid] = useState(false);
  const [lastNameIsInvalid, setlastNameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [numberIsInvalid, setNumberIsInvalid] = useState(false);
  const [registrationIsSent, setRegistrationIsSent] = useState(false);

  const formRef = useRef();
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

    if (enteredHoneyPotValue) {
      return;
    }
    if (
      !enteredFirstName ||
      containsOnlyLetters(enteredFirstName) === false ||
      enteredFirstName.trim() === ""
    ) {
      setfirstNameIsInvalid(true);
      return;
    }
    if (
      !enteredLastName ||
      containsOnlyLetters(enteredLastName) === false ||
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
      phoneNumberIsCorrect(enteredNumber) === false ||
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
      .then((data) => {
        console.log(data);
        setRegistrationIsSent(true);
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
          <FormInputMessage
            text="Invalid Input"
            className={
              !firstNameIsInvalid
                ? `${inputStyles.hide} ${inputStyles.marginTop}`
                : `${inputStyles.show} ${inputStyles.marginTop}`
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
          <FormInputMessage
            text="Invalid Input"
            className={
              !lastNameIsInvalid
                ? `${inputStyles.hide} ${inputStyles.marginTop}`
                : `${inputStyles.show} ${inputStyles.marginTop}`
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.control}>
          <Input id="email" type="email" text="Email" ref={emailInputRef} />
          <FormInputMessage
            text="Email is invalid"
            className={
              !emailIsInvalid
                ? `${inputStyles.hide} ${inputStyles.marginTop}`
                : `${inputStyles.show} ${inputStyles.marginTop}`
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
          <FormInputMessage
            text="Number is invalid"
            className={
              !numberIsInvalid
                ? `${inputStyles.hide} ${inputStyles.marginTop}`
                : `${inputStyles.show} ${inputStyles.marginTop}`
            }
          />
        </div>
      </div>
      <div className={styles.controlBtn}>
        <Button>
          <span>Register</span>
        </Button>
        <FormInputMessage
          text="YEEEY! You are registered!"
          className={
            !registrationIsSent
              ? `${inputStyles.hide} ${inputStyles.marginLeft}`
              : `${inputStyles.show} ${inputStyles.marginLeft}`
          }
        />
      </div>
    </form>
  );
};

export default ParticipantForm;
