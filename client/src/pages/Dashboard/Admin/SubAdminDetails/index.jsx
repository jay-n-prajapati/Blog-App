import DataTable from "@/components/common/DataTable"
import { getSubAdmin} from "@/utils/axios-instance";
import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import { subAdminColumn } from "./SubAdminColumns";



const SubAdminDetails = () => {
  const [subAdmins , setSubAdmins] = useState([]);

  const fetchUsers = async () =>{
    const {success , data , error} = await getSubAdmin();
    if (!success) {
      toast.error(`Error : ${error}`)
      return
    }
    setSubAdmins(data)
  }

  useEffect(() =>{
    fetchUsers()
  },[])
  return (
    <div>
      <DataTable data={subAdmins} columns={subAdminColumn}/>
    </div>
  )
}

export default SubAdminDetails