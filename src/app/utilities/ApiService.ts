export class ApiUrls {
  public static readonly BASE_URL = import.meta.env.VITE_APP_API_URL;
  public static readonly LOGIN = "Admin/LogIn";
  public static readonly REGISTER = "Admin/SignUp";
  public static readonly GET_TASK_LIST = "AppTask/GetAppTasks";
  public static readonly GET_PROJECT_LIST = "AppProject/GetAppProjects";

  public static readonly CREATE_PROJECT = "AppProject/CreateAsy";
  public static readonly UPDATE_PROJECT = "AppProject/UpdateAsy";
  public static readonly DELETE_PROJECT = "AppProject/DeleteAsy";
  public static readonly GET_ADMIN_LIST = "Admin/GetAdminList";
  public static readonly GET_EMPLOYEE_LIST = "Employee/GetEmployeeList";
  public static readonly CREATE_PERSONNEL = "Employee/CreateAsy";
  public static readonly DELETE_PERSONNEL = "Employee/DeleteAsy";
  public static readonly EDIT_PERSONNEL = "Employee/EditAsy";
}
