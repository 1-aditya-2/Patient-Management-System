import { useEffect, useState } from 'react';
import { getCurrentUser } from '../auth';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setUsers([currentUser]);
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Dashboard</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}
