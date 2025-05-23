import { useEffect } from "react";

const Users = () => {
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");

        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, []);
  return <div>Users</div>;
};

export default Users;
