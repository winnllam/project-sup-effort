import React from "react";
import styles from "./User-List.module.css";
import { Modal } from "react-bootstrap";
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
      page: 0,
      limit: 15,
      totalUsers: 0,
    };
  }

  componentDidMount() {
    userService.getAllUsers(this.state.page, this.state.limit).then((res) => {
      this.setState({ users: res.users, totalUsers: res.total });
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

  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      userService.getAllUsers(this.state.page, this.state.limit).then((res) => {
        this.setState({ users: res.users, totalUsers: res.total });
      });
    });
  };

  prevPage = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      userService.getAllUsers(this.state.page, this.state.limit).then((res) => {
        this.setState({ users: res.users, totalUsers: res.total });
      });
    });
  };

  render() {
    const {
      users,
      openModal,
      userStatus,
      userName,
      currentId,
      page,
      limit,
      totalUsers,
    } = this.state;
    return (
      <div className={styles.users}>
        <Modal
          show={openModal}
          onHide={this.closeChangeRoleModal}
          className={styles.userModal}
        >
          <Modal.Header closeButton>
            {userStatus === "basic" && (
              <Modal.Title>Promote Basic User to Admin</Modal.Title>
            )}
            {userStatus === "admin" && (
              <Modal.Title>Downgrade Admin User to Basic</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            {userStatus === "basic" && (
              <div className={styles.modalTitle}>
                Confirm Promotion of User {userName}
              </div>
            )}
            {userStatus === "admin" && (
              <div className={styles.modalTitle}>
                Confirm Downgrade of User {userName}
              </div>
            )}
            {userStatus === "basic" && (
              <div className={styles.modalText}>
                They will immediately gain access to adminstrative permissions
                on the site.
              </div>
            )}
            {userStatus === "admin" && (
              <div className={styles.modalText}>
                They will immediately lose adminstrative permissions to the
                site.
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className={styles.confirmButton}
              type={"submit"}
              onClick={this.processRoleChange}
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
        <div className={styles.page}>
          <div className={styles.title}>All Users</div>

          {users.map((user) => (
            <div className={styles.user}>
              <div className={styles.userName}>{user.username}</div>
              <b>Email:</b> {user.email} <br />
              <b>Role:</b> {user.userStatus}
              <div className={styles.promoteUser}>
                {user.userStatus === "basic" && currentId !== user._id && (
                  <button
                    className={styles.button}
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
                    className={styles.button}
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
          {page > 0 && (
            <button
              className={styles.button}
              id={styles.prevButton}
              onClick={this.prevPage}
            >
              Previous
            </button>
          )}
          {totalUsers - page * limit > limit && (
            <button
              className={styles.button}
              id={styles.nextButton}
              onClick={this.nextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default UserList;
