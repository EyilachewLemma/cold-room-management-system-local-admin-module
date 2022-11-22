import {useState,useRef} from 'react'
import ProductSelection from "./ProductSelection"
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../url'
import classes from './Products.module.css'
const AddProductExistingCustomer = () =>{
  const [farmers,setFarmer] =useState([])
    const searchBy = useRef()
    const navigate = useNavigate()

    const searchHandler = async () =>{
      try{
     const response = await apiClient.get(`localAdmin/farmers?search=${searchBy.current.value}`)
     if(response.status === 200){
      setFarmer(response.data)
     }
      }
      catch(err){}
    }
    const addNewCustomerProduct = () =>{
      navigate('/products/add-product/new-farmer-product')
    }
    const selectFarmerHandler = (e) =>{
      console.log('selected farmer id=',e.target.value)
    }
    return <>
    <div className="mt-4">
    {farmers?.length > 0 && (
    <Table responsive="md">
      <thead className={classes.header}>
        <tr>
          <th>NO</th>
          <th>Farmer Name</th>
          <th>Phone Number</th>
          <th>Location</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody>
      {
        farmers.map((farmer,index) =>(
          <tr className={classes.row} key={farmer.id}>
          <td className="p-3">{index+1}</td>
          <td className="p-3">{farmer.fullName}</td>
          <td className="p-3">{farmer.phoneNumber}</td>
          <td className="p-3">{farmer.location}</td>
          <td className="p-3 text-center">
          <Form.Check 
          type="radio"
          value={farmer.id}
          id={farmer.id}
          onChange={selectFarmerHandler}
        />
             </td>
        </tr>
        ))
      }     
       
      </tbody>
    </Table>
    )}
  </div>
    <div className={`${classes.grayBg} d-flex mt-3 p-2`}>
    <InputGroup className="mb-3 w-50 border rounded onPrintDnone">
    <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
      <span onClick={searchHandler}>
        <i className="fas fa-search"></i>
      </span>
    </InputGroup.Text>
    <Form.Control
      className={classes.searchInput}
      placeholder="search by farmer name"
      aria-label="productName"
      aria-describedby="basic-addon1"
      ref={searchBy}
    />
  </InputGroup>
    <div>
    </div>
    <div className='ms-5'>
    <Button variant='none' className={`${classes.viewHistoryBtn} px-5 py-1`} onClick={addNewCustomerProduct}>New Farmer</Button>
    </div>
  </div>
    <ProductSelection />
    </>
}
export default AddProductExistingCustomer