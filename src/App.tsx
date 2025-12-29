import { useState } from "react";
import "./App.css";
import UserForm from "./components/user-form.component";
import UsersTable from "./components/users-table.component";
import type { User } from "./models/user.model";

function App() {
  const [selectedUser, setSelectedUser] = useState<User>({ id: "", name: "", email: "", phone: "", gender: "male" });
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isEditing, setIsEditing] = useState(false);

  const addOrUpdateUser = (user: User) => setUsers({ ...users, [user.id]: user });

  return (
    <section id="main-container">
      <div>
        <h1>User Registration</h1>
      </div>
      <div id="app-content" className="flex-box-row gap-m h-90">
        <UserForm user={selectedUser} upsertUser={addOrUpdateUser} isEditing={isEditing} setIsEditing={setIsEditing} />
        <UsersTable users={users} setUsers={setUsers} setSelectedUser={setSelectedUser} setIsEditing={setIsEditing} />
      </div>
    </section>
  );
}

export default App;
