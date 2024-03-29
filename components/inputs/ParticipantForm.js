import { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import FormInputMessage from "../ui/messages/FormInputMessage";
import styles from "@/styles/inputs/ParticipantForm.module.css";
import NotificationContext from "@/store/notificationContext";

const ParticipantForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [firstNameIsInvalid, setfirstNameIsInvalid] = useState(false);
  const [lastNameIsInvalid, setlastNameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [numberIsInvalid, setNumberIsInvalid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const formRef = useRef();
  const honeyPotRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const numberInputRef = useRef();

  const notificationCxt = useContext(NotificationContext);

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

  useEffect(() => {
    if (!notificationCxt.notification) {
      setShowForm(true);
    }
  }, [notificationCxt.notification]);

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

    setShowForm(false);

    notificationCxt.showNotification({
      message: "Sending registration",
      status: "pending",
    });

    fetch("/api/participants", {
      method: "POST",
      body: JSON.stringify(participantData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        notificationCxt.showNotification({
          message: "You are registered!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCxt.showNotification({
          message: error.message || "Sorry... Something went wrong",
          status: "error",
        });
      });
    formRef.current.reset();
  };

  return (
    <>
      {showForm && !notificationCxt.notification && (
        <section className={styles.formContainer}>
          <div className={styles.clamp}></div>
          <div className={styles.intro}>
            <div className={styles.avatarImageContainer}>
              <Image
                src="/assets/images/characters_left.png"
                width={100}
                height={100}
                alt="characters"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.welcomeTextContainer}>
              <h1>Welcome</h1>
              <h2>Register to find your match!</h2>
            </div>
            <div className={styles.avatarImageContainer}>
              <Image
                src="/assets/images/characters_right.png"
                width={100}
                height={100}
                alt="characters"
                className={styles.avatarImage}
              />
            </div>
          </div>
          <form
            className={styles.form}
            onSubmit={registrationHandler}
            ref={formRef}
          >
            <div className={styles.row}>
              <div className={styles.control}>
                <input
                  className={styles.honeyPot}
                  type="text"
                  ref={honeyPotRef}
                />
                <TextInput
                  id="first-name"
                  type="text"
                  text="First name"
                  ref={firstNameInputRef}
                />
              </div>
              <div className={styles.control}>
                <TextInput
                  id="last-name"
                  type="text"
                  text="Last name"
                  ref={lastNameInputRef}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.control}>
                <TextInput
                  id="email"
                  type="email"
                  text="Email"
                  ref={emailInputRef}
                />
              </div>
              <div className={styles.control}>
                <TextInput
                  id="number"
                  type="text"
                  text="Phone number"
                  ref={numberInputRef}
                />
              </div>
            </div>
            <div className={styles.controlBtn}>
              <Button color="green">
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
          <div className={styles.corner}></div>
        </section>
      )}
    </>
  );
};

export default ParticipantForm;
