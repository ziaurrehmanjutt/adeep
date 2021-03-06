import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private api: ApiService, private endPoints: EndpointsService) {}

  getAllProcess() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_CASES,
      showLoading: true,
      showError: true,
    });
  }
  getAllUsers() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_USERS,
      showLoading: true,
      showError: true,
    });
  }
  getDraftCases() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_DRAFT_CASES,
      showLoading: true,
      showError: true,
    });
  }
  getAllUnassignedCases() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_UNASSIGNED_CASES,
      showLoading: true,
      showError: true,
    });
  }
  getStartCases() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_CASES_START,
      showLoading: true,
      showError: true,
    });
  }
  getSingleCase(caseId) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_SINGLE_CASE + '/' + caseId,
      showLoading: true,
      showError: true,
    });
  }
  getCurrentTask(caseId) {
    // tslint:disable-next-line: max-line-length
    return this.api.commonGet({
      isToken: false,
      endPointUrl:
        this.endPoints.GET_SINGLE_CASE +
        '/' +
        caseId +
        '/' +
        this.endPoints.GET_CURRENT_TASK,
      showLoading: true,
      showError: true,
    });
  }
  getCurrentTasks(caseId) {
    // tslint:disable-next-line: max-line-length
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_CURRENT_TASKS(caseId),
      showLoading: true,
      showError: true,
    });
  }
  getCaseVariables(caseId) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_VARIABLES(caseId),
      showLoading: true,
      showError: true,
    });
  }
  executeQuery(frmData, projectId, variable_name) {
    return this.api.commonPost(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.EXECUTE_QUERY(projectId, variable_name),
      showLoading: true,
      showError: true,
    });
  }
  getAllParticipants() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ALL_PARTICIPANTS,
      showLoading: true,
      showError: true,
    });
  }
  getSteps(project_id, caseId) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_STEPS(project_id, caseId),
      showLoading: true,
      showError: true,
    });
  }
  getDynaForm(project_id: string, formId: string) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_DYNA_FORM(project_id, formId),
      showLoading: true,
      showError: true,
    });
  }
  getCustomQueryData(frmData) {
    return this.api.commonPost(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.CUSTOM_QUERY_DATA,
      showLoading: true,
      showError: true,
    });
  }
  updateVariable(frmData, app, index, name) {
    return this.api.commonPut(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.UPDATE_VARIABLE(app, index, name),
      showLoading: true,
      showError: true,
    });
  }
  updateVariables(frmData, app) {
    return this.api.commonPut(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.UPDATE_VARIABLES(app),
      showLoading: true,
      showError: true,
    });
  }
  caseRoute(frmData, app) {
    return this.api.commonPutE(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.CASE_ROUTED(app),
      showLoading: true,
      showError: false,
    });
  }
  startCase(frmData) {
    return this.api.commonPost(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.START_CASE,
      showLoading: true,
      showError: true,
    });
  }
  caseNotes(app) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.CASE_NOTES(app),
      showLoading: false,
      showError: false,
    });
  }
  caseFeeds(app, task) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_FEEDS(app, task),
      showLoading: true,
      showError: false,
    });
  }
  caseGuide(app, task) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_GUIDE(app, task),
      showLoading: true,
      showError: false,
    });
  }
  caseNotesAdd(app, frmData) {
    return this.api.commonPost(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.CASE_NOTES_ADD(app),
      showLoading: true,
      showError: false,
    });
  }
  caseAssignee(app, task) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_ASSIGNEE(app, task),
      showLoading: true,
      showError: false,
    });
  }
  reAssignCase(app, frmData) {
    return this.api.commonPut(frmData, {
      isToken: false,
      endPointUrl: this.endPoints.RE_ASSIGN_CASE(app),
      showLoading: true,
      showError: false,
    });
  }
  getPathDetail(app, pro, task, s, l) {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.GET_PATH_DETAIL(app, pro, task, s, l),
      showLoading: false,
      showError: false,
    });
  }
  getCalender() {
    return this.api.commonGet({
      isToken: false,
      endPointUrl: this.endPoints.CASE_SCHEDULE,
      showLoading: false,
      showError: true,
    });
  }
  getCalenderSingle(form) {
    return this.api.commonPost(form, {
      isToken: false,
      endPointUrl: this.endPoints.CASE_SCHEDULE_SINGLE,
      showLoading: false,
      showError: true,
    });
  }
  scheduleUpdate(form) {
    return this.api.commonPost(form, {
      isToken: false,
      endPointUrl: this.endPoints.UPDATE_SCHEDULE,
      showLoading: false,
      showError: true,
    });
  }
  skipSchedule(form) {
    return this.api.commonPost(form, {
      isToken: false,
      endPointUrl: this.endPoints.SKIP_SCHEDULE,
      showLoading: false,
      showError: true,
    });
  }
}
