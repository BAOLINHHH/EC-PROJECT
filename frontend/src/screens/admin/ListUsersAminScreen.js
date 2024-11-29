import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../componets/Message';
import Loader from '../../componets/Loader';
import SidebarAdmin from './SidebarAdmin';
import { toast } from 'react-toastify';
import { useGetUsersQuery,useDeleteUserMutation} from '../../slices/usersApiSlice';

const ListUsersAminScreen = () => {
    const { data: users, refetch, isLoading, error} = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  return (
    <>
    <div className="row">
      <div className=" col-md-2">
        <SidebarAdmin />
      </div>
 
      <div className='col-md-10'>
             <h1 className="mb-4 d-flex justify-content-center">THÔNG TIN TÀI KHOẢN</h1>
 
              <table  class="table  border-[1px] border-solid">
                <thead className="table-light">
                <tr>  
                  <th className="capitalize leading-3 text-[17px]">ID</th>
                  <th className="capitalize leading-3 text-[17px]">Họ và tên</th>
                  <th className="capitalize leading-3 text-[17px]">Email </th>
                  <th className="capitalize leading-3 text-[17px]">Role</th>
                  <th className="capitalize leading-3 text-[17px]"></th>
                </tr>
              </thead>
              <tbody>
               <tr>
                <td className="align-middle">
                  1111111111111111
                </td>
                <td className="align-middle">
                    doan bao linh
                </td>
                <td className="align-middle">
                  linh@gmail.com  
                </td>
                <td className="align-middle">
                  admin  
                </td>
                
                <td className="align-middle">
                  <div className="border-solid border-[1px] rounded-[9px] bg-[#dc4f36] text-[#fff] flex justify-center w-[80px]">
                    <button>
                      avtive
                    </button>
                  </div>
                </td>
               </tr>               
              </tbody>
              </table>
        {/* <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
            <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
      
    </div>
    </>
  )
}

export default ListUsersAminScreen