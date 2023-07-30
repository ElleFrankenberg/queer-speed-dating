import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ChangePasswordForm from "../inputs/ChangePasswordForm";
import NotificationContext from "@/store/notificationContext";

import styles from "../../styles/layout/Header.module.css";

function Header(props) {
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAdminAccount, setDeleteAdminAccount] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const notificationCxt = useContext(NotificationContext);
  const router = useRouter();

  const logOutHandler = () => {
    signOut();
  };

  const foldOutHandler = (type) => {
    if (type === "password") {
      setDeleteAdminAccount(false);
      setChangePassword(!changePassword);
    } else {
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
        <Link href="/">
          <Image
            className={styles.heroImage}
            src="/assets/images/queer-speed-dating-icon.png"
            width={70}
            height={70}
            alt="icon"
          />
        </Link>
        <ul className={styles.navList}>
          {session && (props.home || props.participant || props.matches) && (
            <li>
              <Button link="/participants">
                <span>All Participants</span>
              </Button>
            </li>
          )}
          {session && (props.participants || props.participant) && (
            <li>
              <Button link="/participants/all-matches">
                <span>all matches</span>
              </Button>
            </li>
          )}
          {session && (
            <li>
              <Button onClick={logOutHandler}>
                <span>Logout</span>
              </Button>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Button link="/auth">
                <span>Login</span>
              </Button>
            </li>
          )}
        </ul>
      </nav>
      {session && (
        <div className={styles.user}>
          <div>
            <p>Logged in as:</p>
            <h2 className={styles.userEmail}>{session.user.email}</h2>
          </div>
          <div className={styles.actions}>
            <Button onClick={() => foldOutHandler("password")}>
              <span>change password</span>
            </Button>
            <Button onClick={() => foldOutHandler("delete")}>
              <span>delete account</span>
            </Button>
          </div>
        </div>
      )}
      {session && changePassword && (
        <ChangePasswordForm onChangePassword={changePasswordHandler} />
      )}
      {session && deleteAdminAccount && (
        <div className={styles.deleteAdmin}>
          <div>
            <p>Are you sure you want to delete your account?</p>
          </div>
          <div className={styles.buttons}>
            <div>
              <Button onClick={deleteAdminAccountHandler}>
                <span>yes</span>
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setDeleteAdminAccount(!deleteAdminAccount)}
              >
                <span>no</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
