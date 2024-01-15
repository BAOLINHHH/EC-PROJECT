// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import React from "react";
import { useNavigate} from 'react-router-dom';
// import Pagination from '@mui/material/Pagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Paginate = ({page,pages, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate();
  // const queryParams = new URLSearchParams('?pageNumber=${pageNumber}');
  //  const currentPage = Number(queryParams.get("pageNumber")) || 1;
  // const [setPage] =useState(1);
  const handleChange= (event, value) =>{
    console.log('value',value,isAdmin)
    const currentPage = value
    console.log('isAdmin',isAdmin)
    if(!isAdmin){
    navigate(`/all-product?pageNumber=${currentPage}`)
    }else{
      navigate(`/admin/productlist?pageNumber=${currentPage}`)
    }
    
  }
  return (
  <Stack spacing={2}>
    <Pagination count={pages} page={page} 
    onChange={handleChange}
    />
  </Stack>
  );
  
};

export default Paginate;
