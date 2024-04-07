import DataTable from "@/components/common/DataTable"
import { getUsers } from "@/utils/axios-instance";
import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import { usersColumn } from "./usersColumn";


const AdminDashBoard = () => {
  const [users , setUsers] = useState([]);

  const fetchUsers = async () =>{
    const {success , data , error} = await getUsers();
    if (!success) {
      toast.error(`Error : ${error}`)
      return
    }
    setUsers(data)
  }

  useEffect(() =>{
    fetchUsers()
  },[])
  return (
    <div className="p-6">
      <DataTable data={users} columns={usersColumn}/>
    </div>
  )
}

export default AdminDashBoard
