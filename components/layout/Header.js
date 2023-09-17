import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import { useSession, signOut } from "next-auth/react";
import { useState, useContext, useRef } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ChangePasswordForm from "../inputs/ChangePasswordForm";
import NotificationContext from "@/store/notificationContext";

import styles from "../../styles/layout/Header.module.css";

function Header(props) {
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAdminAccount, setDeleteAdminAccount] = useState(false);
  const [foldOutIsOpen, setFoldOutIsOpen] = useState(false);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  const adminFoldoutRef = useRef();
  const changePasswordFoldoutRef = useRef();
  const deleteAdminAccountFoldoutRef = useRef();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const notificationCxt = useContext(NotificationContext);
  const router = useRouter();

  const logOutHandler = () => {
    signOut();
  };

  const foldOutHandler = (type) => {
    if (type === "details") {
      setChangePassword(false);
      setDeleteAdminAccount(false);
      setFoldOutIsOpen(!foldOutIsOpen);
      setHamburgerIsOpen(!hamburgerIsOpen);
    }
    if (type === "password") {
      setDeleteAdminAccount(false);
      setChangePassword(!changePassword);
    }
    if (type === "delete") {
      setChangePassword(false);
      setDeleteAdminAccount(!deleteAdminAccount);
    }
  };

  const changePasswordHandler = (passwordData) => {
    fetch("/api/admin/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
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
          message: "Your password has been changed",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCxt.showNotification({
          message: error.message || "Sorry... Something went wrong",
          status: "error",
        });
      });
    setChangePassword(!changePassword);
  };

  const deleteAdminAccountHandler = () => {
    fetch("/api/admin/delete-admin", {
      method: "DELETE",
      body: JSON.stringify("delete"),
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
          message: "Your account has been deleted",
          status: "success",
        });
        signOut();
        router.push("/");
      })
      .catch((error) => {
        notificationCxt.showNotification({
          message: error.message || "Sorry... Something went wrong",
          status: "error",
        });
      });
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/images/logo.png"
            width={70}
            height={70}
            alt="logotype"
          />
          <h1 className={styles.title}>ueer speed dating</h1>
        </Link>
        <ul className={styles.navList}>
          {session &&
            (props.page === "/" ||
              props.page === "/participants/[participantId]") && (
              <>
                <li>
                  <Button link="/participants" color="green">
                    <span>Participants</span>
                  </Button>
                </li>
                <li>
                  <Button link="/participants/matching" color="green">
                    <span>Matching</span>
                  </Button>
                </li>
              </>
            )}
          {session && props.page === "/participants" && (
            <>
              <li>
                <Button link="/participants/matching" color="green">
                  <span>Matching</span>
                </Button>
              </li>
            </>
          )}
          {session && props.page === "/participants/matching" && (
            <>
              <li>
                <Button link="/participants" color="green">
                  <span>All Participants</span>
                </Button>
              </li>
            </>
          )}
          {session && (
            <li>
              <Button onClick={logOutHandler} color="green">
                <span>Logout</span>
              </Button>
            </li>
          )}
          {props.page === "/auth" ||
            (!session && !loading && (
              <li>
                <Button link="/auth" color="pink">
                  <span>Admin Login</span>
                </Button>
              </li>
            ))}
          {session && (
            <li
              className={styles.toggleContainer}
              onClick={() => foldOutHandler("details")}
            >
              <Button color="pink">
                <span>Admin Details</span>
              </Button>
            </li>
          )}
        </ul>
      </nav>
      {session && (
        <CSSTransition
          in={foldOutIsOpen}
          nodeRef={adminFoldoutRef}
          timeout={700}
          classNames="foldout"
          unmountOnExit
        >
          <div className={styles.admin} ref={adminFoldoutRef}>
            <div className={styles.adminDetails}>
              <p>Logged in as:</p>
              <p className={styles.userEmail}>{session.user.email}</p>
            </div>
            <ul className={styles.actionList}>
              <li>
                <Button
                  onClick={() => foldOutHandler("password")}
                  color="green"
                >
                  <span>change password</span>
                </Button>
              </li>
              <li>
                <Button onClick={() => foldOutHandler("delete")} color="green">
                  <span>delete account</span>
                </Button>
              </li>
            </ul>
          </div>
        </CSSTransition>
      )}
      {session && (
        <CSSTransition
          in={changePassword}
          nodeRef={changePasswordFoldoutRef}
          timeout={700}
          classNames="foldout"
          unmountOnExit
        >
          <div
            ref={changePasswordFoldoutRef}
            className={styles.changePasswordFormContainer}
          >
            <ChangePasswordForm onChangePassword={changePasswordHandler} />
          </div>
        </CSSTransition>
      )}
      {session && (
        <CSSTransition
          in={deleteAdminAccount}
          nodeRef={deleteAdminAccountFoldoutRef}
          timeout={700}
          classNames="foldout"
          unmountOnExit
        >
          <div
            className={styles.deleteAdmin}
            ref={deleteAdminAccountFoldoutRef}
          >
            <div className={styles.deleteMessage}>
              <p>Are you sure you want to delete your account?</p>
            </div>
            <ul className={styles.deleteActionList}>
              <li>
                <Button onClick={deleteAdminAccountHandler} color="green">
                  <span>yes</span>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setDeleteAdminAccount(!deleteAdminAccount)}
                  color="green"
                >
                  <span>no</span>
                </Button>
              </li>
            </ul>
          </div>
        </CSSTransition>
      )}
      <div className={styles.rainbow}>
        <div className={`${styles.stripe} ${styles.pink}`}></div>
        <div className={`${styles.stripe} ${styles.cerise}`}></div>
        <div className={`${styles.stripe} ${styles.green}`}></div>
        <div className={`${styles.stripe} ${styles.blue}`}></div>
      </div>
    </header>
  );
}

export default Header;
