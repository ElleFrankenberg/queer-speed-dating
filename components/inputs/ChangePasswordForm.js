import { useRef, useState, useEffect, useContext } from "react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import FormInputMessage from "../ui/messages/FormInputMessage";

import styles from "@/styles/inputs/ChangePasswordForm.module.css";

const ChangePasswordForm = (props) => {
  const [oldPasswordIsInvalid, setOldPasswordIsInvalid] = useState(false);
  const [newPasswordIsInvalid, setNewPasswordIsInvalid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const honeyPotRef = useRef();
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

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

  const resetStates = () => {
    setOldPasswordIsInvalid(false);
    setNewPasswordIsInvalid(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredHoneyPotValue = honeyPotRef.current.value;
    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    if (enteredHoneyPotValue) {
      return;
    }

    if (
      !enteredOldPassword ||
      enteredOldPassword.trim() === "" ||
      enteredOldPassword.length < 7
    ) {
      setIsInvalid(true);
      setOldPasswordIsInvalid(true);
      return;
    }
    if (
      !enteredNewPassword ||
      enteredNewPassword.trim() === "" ||
      enteredNewPassword.length < 7
    ) {
      setIsInvalid(true);
      setNewPasswordIsInvalid(true);
      return;
    }

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };
  return (
    <form className={styles.changePasswordForm} onSubmit={onSubmitHandler}>
      <div className={styles.action}>
        <input className={styles.honeyPot} type="text" ref={honeyPotRef} />
        <TextInput
          id="old-password"
          type="text"
          text="Old password"
          ref={oldPasswordInputRef}
        />
        {isInvalid && oldPasswordIsInvalid && (
          <div className={styles.invalidMessage}>
            <FormInputMessage text="Password is invalid" />
          </div>
        )}
      </div>
      <div className={styles.action}>
        <TextInput
          id="new-password"
          type="text"
          text="New password"
          ref={newPasswordInputRef}
        />
        {isInvalid && newPasswordIsInvalid && (
          <div className={styles.invalidMessage}>
            <FormInputMessage text="Password is invalid" />
          </div>
        )}
      </div>
      <div className={styles.action}>
        <Button color="green">
          <span>send</span>
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
