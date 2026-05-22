import "./UserManagement.css";
import UsersTable from "../../components/UsersTable/UsersTable";
import type { UserData } from "../../types";
import AddUserModal from "../../components/Modals/AddUserModal/AddUserModal";
import { useState } from "react";
import EditUserModal from "../../components/Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../../components/Modals/DeleteUserModal/DeleteUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      role: "user",
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Wilson",
      role: "moderator",
    },
    {
      id: "4",
      firstName: "Sarah",
      lastName: "Jones",
      role: "user",
    },
    {
      id: "5",
      firstName: "Tom",
      lastName: "Brown",
      role: "user",
    },
    {
      id: "6",
      firstName: "Emily",
      lastName: "Armstrong",
      role: "moderator",
    },
  ]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleAddNewUser = (newUser: UserData) => {
    setUsers([...users, newUser]);
    setIsAddUserModalOpen(false);
  };

  const handleUserEdit = (id: string) => {
    const user = users.find((u) => u.id === id);

    if (user) {
      setSelectedUser(user);
      setIsEditUserModalOpen(true);
    }
  };

  const handleUserUpdate = (updatedUser: UserData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
  };

  const handleUserDelete = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setSelectedUser(user);
      setIsDeleteUserModalOpen(true);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setIsDeleteUserModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <UsersTable
        data={users}
        onAddNewUser={() => setIsAddUserModalOpen(true)}
        onUserEdit={handleUserEdit}
        onUserDelete={handleUserDelete}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddNewUser}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        user={selectedUser}
        onClose={() => setIsEditUserModalOpen(false)}
        onSave={handleUserUpdate}
      />

      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        user={selectedUser}
        onClose={() => {
          setIsDeleteUserModalOpen(false);
          setSelectedUser(null);
        }}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default UserManagement;
