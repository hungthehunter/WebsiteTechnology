
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
function Test() {
    const [users, setUsers] = useState([]);

const {id}=useParams();

    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error loading users:', error.message);
      }
    };

const deleteUser=async (id)=>{
    await axios.delete(`http://localhost:8080/users/${id}`);
    loadUsers();
}


    return (
        <div className='container' style={{marginTop:200}}>
            <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
    users.map((user, index) => (
        <tr key={index}>
            <th scope='row' key={index}>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <Link className='btn btn-primary mx-2'
                to={`/websiteDoAn/ViewUser/${user.id}`}
                >View</Link>
                <Link className='btn btn-outline-primary mx-2'
                to={`/websiteDoAn/EditUser/${user.id}`}
                
                
                >Edit</Link>
                <button className='btn btn-danger mx-2'
                
                onClick={()=>deleteUser(user.id)}
                >Delete</button>
            </td>
        </tr>
    ))
}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Test;
