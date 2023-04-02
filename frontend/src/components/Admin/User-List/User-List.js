import React from "react";
import styles from "./User-List.module.css";
import { Modal, Button } from "react-bootstrap";
import * as userService from "../../../services/api/Users.js";

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      openModal: false,
      userStatus: "",
      userId: null,
      currentId: null,
    };
  }

  componentDidMount() {
    userService.getAllUsers().then((res) => {
      this.setState({ users: res.users });
    });

    userService.getMe().then((res) => {
      this.setState({ currentId: res.userId });
    });
  }

  openChangeRoleModal = () => this.setState({ openModal: true });

  closeChangeRoleModal = () => this.setState({ openModal: false });

  processRoleChange = () => {
    const action = this.state.userStatus === "basic" ? "upgrade" : "downgrade";
    userService.changeRole(this.state.userId, action).then((res) => {
      const index = this.state.users.findIndex(function (user) {
        return user._id === res._id;
      });
      const newList = this.state.users;
      newList[index].userStatus = res.userStatus;
      this.setState({ users: newList });
    });
    this.closeChangeRoleModal();
  };

  render() {
    const { users, openModal, userStatus, userName, currentId } = this.state;
    return (
      <div className={styles.users}>
        <Modal
          show={openModal}
          onHide={this.closeChangeRoleModal}
          class={styles.userModal}
        >
          <Modal.Header closeButton>
            {userStatus === "basic" && (
              <Modal.Title>Promote Basic User to Admin</Modal.Title>
            )}
            {userStatus === "admin" && (
              <Modal.Title>Downgrade Admin User to Basic</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {userStatus === "basic" && (
              <div class={styles.modalTitle}>
                Confirm Promotion of User {userName}
              </div>
            )}
            {userStatus === "admin" && (
              <div class={styles.modalTitle}>
                Confirm Downgrade of User {userName}
              </div>
            )}
            {userStatus === "basic" && (
              <div class={styles.modalText}>
                They will immediately gain access to adminstrative permissions
                on the site
              </div>
            )}
            {userStatus === "admin" && (
              <div class={styles.modalText}>
                They will immediately lose adminstrative permissions to the site
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type={"submit"} onClick={this.processRoleChange}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <div class={styles.page}>
          <div class={styles.title}>All Users</div>

          {users.map((user) => (
            <div class={styles.user}>
              <div class={styles.userName}>{user.username}</div>
              <b>Email:</b> {user.email} <br />
              <b>Role:</b> {user.userStatus}
              <div class={styles.promoteUser}>
                {user.userStatus === "basic" && currentId !== user._id && (
                  <button
                    class={styles.button}
                    onClick={() => {
                      this.setState(
                        {
                          userName: user.userName,
                          userStatus: user.userStatus,
                          userId: user._id,
                        },
                        function () {
                          this.openChangeRoleModal();
                        }
                      );
                    }}
                  >
                    Promote to Admin
                  </button>
                )}
                {user.userStatus === "admin" && currentId !== user._id && (
                  <button
                    class={styles.button}
                    onClick={() => {
                      this.setState(
                        {
                          userName: user.userName,
                          userStatus: user.userStatus,
                          userId: user._id,
                        },
                        function () {
                          this.openChangeRoleModal();
                        }
                      );
                    }}
                  >
                    Downgrade to Basic
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserList;
