import "./UsersTable.css";
import Card from "../CoreComponents/Card/Card";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { UserData } from "../../types";

interface UsersTableProps {
  data: UserData[];
  onAddNewUser: () => void;
  onUserEdit: (id: string) => void;
  onUserDelete: (id: string) => void;
}

const UsersTable = ({
  data,
  onAddNewUser,
  onUserEdit,
  onUserDelete,
}: UsersTableProps) => {
  return (
    <Card className="users-card">
      <div className="users-card-header">
        <h3>Users</h3>
        <button onClick={onAddNewUser}>Add New User</button>
      </div>
      {data === null || data.length === 0 ? (
        <p>No users found! Add a new user to get started.</p>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td className="actions-cell">
                    <button onClick={() => onUserEdit(user.id)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => onUserDelete(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default UsersTable;
