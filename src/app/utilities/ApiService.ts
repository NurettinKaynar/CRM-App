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
  public static readonly CREATE_PERSONNEL = "Employee/RegisterEmployee";
  public static readonly DELETE_PERSONNEL = "Employee/DeleteAsy";
  public static readonly EDIT_PERSONNEL = "Employee/UpdateAsy";
  public static readonly GET_TOTAL_ACTIVE_PROJECT_LIST =
    "AppProject/GetTotalActiveAppProjectsCount";
  public static readonly GET_ALL_PROJECT = "AppProject/GetAllAsy";
  public static readonly GET_PROJECT_BY_ID = "AppProject/GetAppProjectsDetail";
  public static readonly GET_PRODUCT_LIST = "ProductOffer/GetProductOfferList";
  public static readonly GET_PRODUCT_BY_ID =
    "ProductOffer/GetProductOffersDetail";
  public static readonly DELETE_PRODUCT_BY_ID = "ProductOffer/DeleteAsy";
  public static readonly UPDATE_PRODUCT = "ProductOffer/UpdateAsy";
  public static readonly CREATE_PRODUCT = "ProductOffer/CreateAsy";
  public static readonly GET_TASK_BY_ID = "AppTask/GetAppTasksDetail";
  public static readonly CREATE_TASK = "AppTask/CreateAsy";
  public static readonly UPDATE_TASK = "AppTask/UpdateAsy";
  public static readonly DELETE_TASK = "AppTask/DeleteAsy";
  public static readonly GET_PERSONNEL_BY_ID = "Employee/GetByIdAsy";
  public static readonly UPLOAD_IMAGE = "Image/ImageUpload";
  public static readonly GET_COMPLETED_TASKS_BY_MONTHLY =
    "AppProject/GetComplatedTaskByMontly";
  public static readonly GET_IN_PROGRESS_TASKS_BY_MONTHLY =
    "AppProject/GetNotComplatedTaskByMontly";
  public static readonly GET_PROJECT_BY_DATE = "AppProject/GetProjectByDate";
  public static readonly GET_LASTED_FILES = "AppFile/GetLastedFiles";
  public static readonly DELETE_FILE_BY_ID = "AppFile/DeleteAsy";
  public static readonly UPLOAD_FILE_BY_ID = "AppFile/FileUpload";
}
