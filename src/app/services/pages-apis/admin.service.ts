import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  getPatients() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_PATIENTS(),showLoading : true, showError : true});
  }
  singleUser(user_id: any) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_USER(user_id),showLoading : true, showError : true});
  }
  addUser(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.ADD_USERS(),showLoading : true, showError : true});
  }
  addPatient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.ADD_PATIENTS(),showLoading : true, showError : true});
  } 
  updatePatient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.UPDATE_PATIENTS(),showLoading : true, showError : true});
  } 

  
  singlePatient(frmData) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_PATIENT(frmData),showLoading : true, showError : true});
  } 
  singlePatientTask(p,a) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_PATIENT_TASK(p,a),showLoading : true, showError : true});
  } 
  allDisease() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.ALL_DISEASE,showLoading : false, showError : true});
  } 
  allSpecialties() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.ALL_SPECIALTY,showLoading : true, showError : true});
  } 
  searchDisease(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.SEARCH_DISEASE,showLoading : true, showError : true});
  } 
  getCustomProcess(d,s) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_PROCESS_CUSTOM(d,s),showLoading : true, showError : true});
  }
  getProcessUsers(p) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_PROCESS_USERS(p),showLoading : true, showError : true});
  }
  startPathway(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.START_PATHWAY,showLoading : true, showError : true});
  }
  createUser(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.CREATE_USER,showLoading : true, showError : true});
  }
  editUser(frmData,user_id) {
    return this.api.commonPut(frmData,{isToken :false,endPointUrl : this.endPoints.EDIT_USER(user_id),showLoading : true, showError : true});
  }
  deleteDisease(frmData) {
    return this.api.commonPost(frmData, {isToken :false,endPointUrl : this.endPoints.DELETE_DISEASE,showLoading : true, showError : true});
  }
  editDisease(frmData) {
    return this.api.commonPost(frmData, {isToken :false,endPointUrl: this.endPoints.EDIT_DISEASE,showLoading : true, showError : true});
  }
  deleteSpecialty(frmData) {
    return this.api.commonPost(frmData, {isToken :false,endPointUrl: this.endPoints.DELETE_SPECIALTY,showLoading : true, showError : true});
  }
  editSpecialty(frmData) {
    return this.api.commonPost(frmData, {isToken :false,endPointUrl: this.endPoints.EDIT_SPECIALTY,showLoading : true,showError :true});
  }
  getDashboard() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_DASHBOARD(),showLoading : false, showError : true});
  } 
  addDisease(frmData) {
    return this.api.commonPost(frmData, {isToken :false,endPointUrl: this.endPoints.ADD_DISEASE_SPECIAL,showLoading : true, showError : true});
  }
  getAllDoctors() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.ALL_DOCTORS,showLoading : false, showError : true});
  } 
}

