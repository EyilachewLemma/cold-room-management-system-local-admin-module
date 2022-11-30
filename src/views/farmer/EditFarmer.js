import {useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SaveButton from '../../components/Button';
import CancelButton from '../../components/CancelButton';
import validateFarmer from './validatFarmer';
import apiClient from '../../url/index';
import { buttonAction } from '../../store/slices/ButtonSpinerSlice';
import { farmerAction } from '../../store/slices/FarmerSlice';
import { useDispatch } from 'react-redux';
import classes from './Farmers.module.css'


const EditFarmer = (props) => {
    const [farmer,setFarmer] = useState({fName:'',lName:'',region:'',zone:'',woreda:'',kebele:'',phoneNumber:''})
    const [errors,setErrors] = useState({fName:'',lName:'',region:'',zone:'',woreda:'',kebele:'',phoneNumber:''})
    const dispatch = useDispatch()
    const {id,fName,lName,phoneNumber,email,role} = props.farmer
    console.log('employees to be edited=',props.employee)
 useEffect(()=>{
  
  setFarmer({fName,lName,phoneNumber,email,role})
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[id])
 
    const changeHandler = (e) =>{
       const {name,value} = e.target
       setFarmer(previousValues=>{
        return {...previousValues,[name]:value}
       })
       if(e.target.value){
        setErrors(prevErrors=>{
            return {...prevErrors,[name]:""}
        })
       }
    }
    const editHandler = async() =>{
      const err =validateFarmer(farmer)
      setErrors(err)
      if(Object.values(err)?.length === 0){
      dispatch(buttonAction.setBtnSpiner(true))
      try{
      const response = await apiClient.put(`admin/employees/${id}`,farmer)
      if(response.status === 200){
         dispatch(farmerAction.editEmployee(response.data))
         handleClose()
      }
    }
    catch(er){}
    finally{
      dispatch(buttonAction.setBtnSpiner(false))
    }

      console.log('employee save is clicked')
    }
  }
  const handleClose = () => {
    props.onClose()
    setFarmer({})
      setErrors({})
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='px-3'>
        <Form.Group className="mb-3" controlId="fName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text"
          name="fName"
          onChange={changeHandler}
          value={farmer.fName || ''}
          className={errors.fName?classes.errorBorder:''}
           />
           <span className={classes.errorText}>{errors.fName}</span> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
           type="text"
           name="lName"
          onChange={changeHandler}
          value={farmer.lName || ''}
          className={errors.lName?classes.errorBorder:''}
            />
            <span className={classes.errorText}>{errors.lName}</span> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNo">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
         type="number"
         name="phoneNumber"
          onChange={changeHandler}
          value={farmer.phoneNumber || ''}
          className={errors.phoneNumber?classes.errorBorder:''}
          />
          <span className={classes.errorText}>{errors.phoneNumber}</span> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailAddress">
      <Form.Label>Email Address</Form.Label>
      <Form.Control
       type="email"
       name="email"
       onChange={changeHandler}
       value={farmer.email || ''}
       className={errors.email?classes.errorBorder:''}
        />
        <span className={classes.errorText}>{errors.email}</span> 
    </Form.Group>
      </Form>
  
        </Modal.Body>
        <Modal.Footer>
     <CancelButton title="Close" onClose={handleClose} />
      <SaveButton title="Save Change" onSave={editHandler}/>)
      
       
        </Modal.Footer>
      </Modal>
    </>
  );
}

 export default EditFarmer 