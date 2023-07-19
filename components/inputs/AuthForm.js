import { useState, useRef, useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import styles from "../../styles/auth/AuthForm.module.css";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import FormInputMessage from "../ui/messages/FormInputMessage";
import NotificationContext from "@/store/notificationContext";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const honeyPotRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const notificationCxt = useContext(NotificationContext);

  const router = useRouter();

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
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
  };

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredHoneyPotValue = honeyPotRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredHoneyPotValue) {
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
    if (!enteredPassword || enteredPassword.trim() === "") {
      setIsInvalid(true);
      setPasswordIsInvalid(true);
      return;
    }

    if (isLogin) {
      //log in a user
      setShowForm(false);

      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log(result);
      if (result.error) {
        notificationCxt.showNotification({
          message: result.error || "Sorry... Something went wrong",
          status: "error",
        });
      } else {
        router.push("/participants");
      }
    } else {
      //sign in a user
      setShowForm(false);

      notificationCxt.showNotification({
        message: "Sending admin registration",
        status: "pending",
      });

      try {
        const result = await createUser(enteredEmail, enteredPassword);

        notificationCxt.showNotification({
          message: "A new admin is registered!",
          status: "success",
        });
      } catch (error) {
        notificationCxt.showNotification({
          message: error.message || "Sorry... Something went wrong",
          status: "error",
        });
      }
    }
  }

  return (
    <>
      {showForm && !notificationCxt.notification && (
        <section className={styles.authContainer}>
          <form onSubmit={submitHandler} className={styles.form}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <div className={styles.control}>
              <input
                className={styles.honeyPot}
                type="text"
                ref={honeyPotRef}
              />
              <TextInput
                id="email"
                type="email"
                text="Email"
                ref={emailInputRef}
              />
            </div>
            <div className={styles.control}>
              <TextInput
                type="password"
                id="password"
                text="Password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className={styles.actions}>
              <Button>{isLogin ? "Login" : "Create Account"}</Button>
              <Button
                type="button"
                className={styles.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </div>
            <div>
              {isInvalid && emailIsInvalid && (
                <FormInputMessage text="Email is invalid" />
              )}
              {isInvalid && passwordIsInvalid && (
                <FormInputMessage text="Password is invalid" />
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default AuthForm;
